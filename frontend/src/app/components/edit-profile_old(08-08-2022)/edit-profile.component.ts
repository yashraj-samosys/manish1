import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { ChangeDetectorRef } from '@angular/core'
import { ValidationsService } from 'src/app/services/validations.service';
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/services/auth.service';
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  submitted = false;
  imageData: any = [];
  form;
  token;
  showHideConPass = true;
  showVerifyPhoneBtn: boolean;
str;
str1;
len;
len1;
newstr;
newstr1;
Count;
maxl;
profileStatus;

  regisrtationForm: any;
  croppedImage: any = '';
  imageChangedEvent: any = '';
  dataImg: any = null;
  userId: any;
  userType: any;
  result: any;
  data: any;
  imgData: any;
  id: any;
  fsaData: any;
  fsaResult: any = [];
  resultData: any;
  selectedFsa: any;
  showHidePass = true;
  fname;
  lname;
  newPassword;
  newEmail;
  validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
  @ViewChild('addressSearch', { static: false }) addressSearch: any;
  @ViewChild('addressSearch1', { static: false }) addressSearch1: any;
  @ViewChild('modalUpdate', { static: false }) modalUpdate: any;


  settings = {
    singleSelection: false,
    text: "Select FSA",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };
  dropdownList: any = [];
  dropdownSettings: any = {};
  selectedItems: any = [];
  is_default_agent;


  constructor(
    private ref: ChangeDetectorRef,
    public router: Router,
    public auth: AuthService,
    public common: CommonService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private validation: ValidationsService,
    public modalService: NgbModal,
    public validations: ValidationsService,
    private imageCropper: ImageCropperModule,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.userType = localStorage.getItem('type')
    this.is_default_agent = localStorage.getItem('is_default_agent');
    this.getActiveFSA();
    if (this.userId) this.getProfileData();
    this.editProfileForm();
    this.createform();
    this.showVerifyPhoneBtn = false;

  }

  // fsaData: any = [];
  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    this.ref.detectChanges();
  }

  createform() {
    this.form = this.formBuilder.group({
      password: ['', this.validations.password],
      confirmPass: ['', this.validations.password]
    }, { validator: this.MustMatch('password', 'confirmPass') });
  }


  async getProfileData() {
    this.result = await this.http.get(this.apiUrl.url.getUserById + this.userId);
    // console.log(this.result, 'resultewdsfsdaf')
    this.data = this.result['data'][0];
    this.profileStatus = this.data?.profile_status;
    this.imgData = this.data?.profile_img;
    this.croppedImage = this.imgData;
    this.id = this.data?.id;
    this.fname = this.data?.first_name;
    this.lname = this.data?.last_name;
    this.newPassword = this.data?.password;
    this.newEmail = this.data?.email;
    this.regisrtationForm.patchValue({
      name: this.data?.first_name + " " + this.data?.last_name,
      phone: this.data?.mobile.replaceAll('-', ''),
      estate_brokeraege: this.data?.brokerageName,
      email: this.data?.email,
      brokerage_phone: this.data?.brokerPhoneNo,
      // mobile: this.data?.email,
      password: this.data?.password,
      website: this.data?.website,
      shortBio: this.data?.shortBio,
      longBio: this.data?.bio,
      facebook: this.data?.facebook  == 'null' ? '' : this.data?.facebook ,
      whatsapp: this.data?.whatsapp == 'null' ? '': this.data?.whatsapp,
      messenger: this.data?.messenger == 'null' ? '' : this.data?.messenger,
      wechat: this.data?.wechat == 'null' ? '' : this.data?.wechat,
      office_address: this.data?.address == "undefined" ? "" : this.data?.address ,
      fsa: this.data?.agentFsa,
      account_no: this.data?.account_number,
      shown_On_Map: ['Yes'],
      text_no: this.data?.textNo,
      brokeraege_street_address: this.data?.BrokerageStreetAddress,
      brokeraege_city: this.data?.BrokerageCity,
      brokeraege_province: this.data?.BrokerageProvince,
      brokeraege_postal_code: this.data?.BrokeragePostalCode,

    })
    this.selectedItems = this.data?.agentFsa;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (event.target.files[0].type === '' || event.target.files[0].type === null || event.target.files[0].type === undefined || event.target.files[0].type === 'image/svg+xml') {
      this.toastr.warning("Please Select  jpg or jpeg or png extension image!", " ", {
        timeOut: 2000,
      })
      return
    }
  }

  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
    await fetch(this.croppedImage)
      .then(res => res.blob()).then((ress) => this.imgData = ress);

  }

  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

  }

  ValidateSingleInput(oInput: any) {
    if (oInput.type == "file") {
      var sFileName = oInput.value;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < this.validFileExtensions.length; j++) {
          var sCurExtension = this.validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + this.validFileExtensions.join(", "));
          oInput.value = "";
          return false;
        }
      }
    }
    return true;
  }
  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch?.nativeElement);
    this.common.getAddress(this.addressSearch1?.nativeElement);
    this.getAddress(this.addressSearch1?.nativeElement)
  }
  geoCoder:any;

  getAddress(element:any) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) return;
          let address = place['formatted_address'].split(',');
          this.regisrtationForm.patchValue({
            brokeraege_city : address[0],
            brokeraege_province : address[1]
          })          
        });
      });
    });
  }
  editProfileForm() {
    this.regisrtationForm = this.formBuilder.group({
      name: ['', this.validation.required],
      phone: ['', this.validation.required],
      password: [''],

      email: ['', this.userType == 4 ? '' : this.validation.required],
      estate_brokeraege: ['', this.userType == 4 ? '' : this.validation.required],
      brokerage_phone: ['', this.userType == 4 ? '' : this.validation.required],
      // mobile: ['', this.userType == 4 ? '': this.validation.required],
      website: ['', this.userType == 4 ? '' : this.validation.required],
      shortBio: ['', this.userType == 4 ? '' : this.validation.required],
      longBio: ['', this.userType == 4 ? '' : this.validation.required],
      facebook: [''],
      whatsapp: [''],
      messenger: [''],
      wechat: [''],
      office_address: ['', this.userType == 4 ? '' : this.validation.required],
      fsa: [[], this.userType == 4 ? '' : this.validation.required],
      account_no: [''],
      shown_On_Map: ['Yes'],
      text_no: ['', this.userType == 4 ? '' : this.validation.required],
      brokeraege_street_address: ['', this.userType == 4 ? '' : this.validation.required],
      brokeraege_city: ['', this.userType == 4 ? '' : this.validation.required],
      brokeraege_province: ['', this.userType == 4 ? '' : this.validation.required],
      brokeraege_postal_code: ['', this.userType == 4 ? '' : this.validation.required],
    })
  }


  onItemSelect(item: any) {
    this.regisrtationForm.value.fsa = this.selectedItems;
  }
  OnItemDeSelect(item: any) {
    console.log(item,"============",this.selectedItems)
    this.regisrtationForm.value.fsa = this.selectedItems;
    // this.regisrtationForm.value.fsa =item;

  }
  onSelectAll(items: any) {
    this.regisrtationForm.value.fsa = items;
  }
  onDeSelectAll(items: any) {
    this.regisrtationForm.value.fsa = items;
    this.selectedItems = items;
  }


  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  get f() { return this.regisrtationForm.controls; }
  open(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => { },
      (reason) => { }
    )
  }


  openPassword(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => { 
        console.log('tst',result)
      },
      (reason) => { }
    )
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) return;
      if (control.value !== matchingControl.value) matchingControl.setErrors({ mustMatch: true });
      else matchingControl.setErrors(null);
    }
  }


  reateform() {
    this.form = this.formBuilder.group({
      password: ['', this.validations.password],
      confirmPass: ['', this.validations.password]
    }, { validator: this.MustMatch('password', 'confirmPass') });
  }

  // showHidePassword() {
  //   if (this.showHidePass) this.showHidePass = false;
  //   else this.showHidePass = true;
  // }

  showHideConform() {
    if (this.showHideConPass) this.showHideConPass = false;
    else this.showHideConPass = true;
  }


  async submitRequest() {
    console.log(this.regisrtationForm.value.fsa,'----------------');
    
    this.submitted = true;
    if(this.userType == 2 || this.userType == 3){
      let res = [];
      this.str = this.regisrtationForm.value.shortBio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
     this.str.map((s) => {
        let trimStr = s.trim();
        if (trimStr.length > 0) {
          res.push(trimStr);
        }
      });
      this.len = res.length;
    if (this.len > 20) {
      this.toastr.warning("Short Bio should be less than 20 words", "", { timeOut: 2000 });
      return;
     }
     if(this.regisrtationForm.value.fsa.length > 20){
      return this.toastr.warning('You can select only 20 FSA.')
     }
    //  return;
     this.str1 = this.regisrtationForm.value.longBio;
     let res1 = [];
     this.str1 = this.regisrtationForm.value.longBio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str1.map((s) => {
       let trimStr1 = s.trim();
       if (trimStr1.length > 0) {
         res1.push(trimStr1);
       }
     });
 this.len1 = res1.length;
     if (this.len1 < 21 && this.len1 != 0 ) {
       this.toastr.warning("Long Bio should be more than 20 words", "", { timeOut: 2000 });
       return;
      }
    }

    // console.log(this.regisrtationForm.value, 'value');
    // console.log(this.regisrtationForm.value.name.split(' ')[0], this.fname,'fname')
    // console.log(this.regisrtationForm.value.name.split(' ')[1], this.lname,'lname')
    if (this.regisrtationForm.invalid) {
      return;
    }
    const formData = new FormData;
    if (this.userType == 2 || this.userType == 3) {
      if(!this.regisrtationForm.value?.fsa?.length){
        this.toastr.warning("Please Select FSA", "", { timeOut: 2000 });
        return;
      }


      formData.append('first_name', this.regisrtationForm.value.name.split(' ')[0]);
      formData.append('last_name', this.regisrtationForm.value.name.split(' ')[1]);
      formData.append('userType', this.userType);
      if (this.showVerifyPhoneBtn == false) {
        if ((this.regisrtationForm.value.name.split(' ')[0] != this.fname || this.regisrtationForm.value.name.split(' ')[1] != this.lname) || (this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
          this.submitted = false;
          this.openPassword(this.modalUpdate);
          return;
        }
      }

      if (this.regisrtationForm.value.password > 0) {
        formData.append('password', this.regisrtationForm.value.password);
      }
      formData.append('profile_img', this.imgData);
      formData.append('email', this.regisrtationForm.value.email);
      formData.append('brokerageName', this.regisrtationForm.value.estate_brokeraege);
      formData.append("mobile", this.regisrtationForm.value.phone);
      formData.append("brokerPhoneNo", this.regisrtationForm.value.brokerage_phone);
      formData.append("facebook", this.regisrtationForm.value.facebook);
      formData.append("whatsapp", this.regisrtationForm.value.whatsapp);
      formData.append("messenger", this.regisrtationForm.value.messenger);
      formData.append("wechat", this.regisrtationForm.value.wechat);
      formData.append("address", this.regisrtationForm.value.office_address);
      formData.append("shortBio", this.regisrtationForm.value.shortBio);
      formData.append("bio", this.regisrtationForm.value.longBio);
      formData.append("website", this.regisrtationForm.value.website);
      formData.append("shownOnMap", this.regisrtationForm.value.shown_On_Map);
      formData.append("textNo", this.regisrtationForm.value.text_no);
      formData.append("BrokerageStreetAddress", this.regisrtationForm.value.brokeraege_street_address);
      formData.append("BrokerageCity", this.regisrtationForm.value.brokeraege_city);
      formData.append("BrokerageProvince", this.regisrtationForm.value.brokeraege_province);
      formData.append("BrokeragePostalCode", this.regisrtationForm.value.brokeraege_postal_code);
      formData.append('is_default_agent',this.is_default_agent);
      formData.append('agenttype', this.data?.agent_type);
      formData.append('account_number', this.regisrtationForm.value.account_no);

      // account_no: this.data?.account_number,
      // shown_On_Map: ['Yes'],
      // text_no: this.data?.textNo,
      // brokeraege_street_address:this.data?.BrokerageStreetAddress ,
      // brokeraege_city: this.data?.BrokerageCity ,
      // brokeraege_province: this.data?.BrokerageProvince,
      // brokeraege_postal_code: this.data?.BrokeragePostalCode,

      let arr: any = [];
      for (let i = 0; i < this.regisrtationForm.value.fsa.length; i++) {
        arr.push(this.regisrtationForm.value.fsa[i].id);
      }
      formData.append("fsa_id", arr);
    } else {
      formData.append('first_name', this.regisrtationForm.value.name.split(' ')[0]);
      formData.append('last_name', this.regisrtationForm.value.name.split(' ')[1]);
      formData.append("mobile", this.regisrtationForm.value.phone);
      formData.append('email', this.regisrtationForm.value.email);
      formData.append('userType', this.userType)
      if (this.showVerifyPhoneBtn == false) {
        if ((this.regisrtationForm.value.name.split(' ')[0] != this.fname || this.regisrtationForm.value.name.split(' ')[1] != this.lname) || (this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
          this.submitted = false;
          this.openPassword(this.modalUpdate);
          return;
        }
      }
      if (this.regisrtationForm.value.password > 0) {
        formData.append('password', this.regisrtationForm.value.password);
      }

      formData.append('profile_img', this.imgData);

    }
    this.resultData = await this.http.Post(this.apiUrl.url.editProfile + this.id, formData);
    if (this.resultData["status"] == true) {
      this.toastr.success(this.resultData['msg'], '', { timeOut: 2000 });
      this.imageData = await this.http.get(this.apiUrl.url.getUserById + this.userId);
      // console.log(this.imageData,'imageData')
      this.apiUrl.editProfile = this.imageData.data[0].profile_img
      this.apiUrl.nameProfile = this.imageData.data[0].first_name + " " + this.imageData.data[0]?.last_name;
      // console.log(this.apiUrl.nameProfile,'nameProfiel')

      // this.x = localStorage.getItem("profile_status");
      localStorage.setItem('profile_status', '1');

      // if(this.regisrtationForm.value.password > 0){
      if ((this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.toastr.error(this.resultData['msg'], '', { timeOut: 2000 });
    }
  }

  async updatePass() {

    this.submitted = true;

    if (this.form.invalid) return false;

    this.submitted = false;
    this.form.value.id = this.userId;
    this.form.value.email = this.regisrtationForm.value.email;

    // this.submitted = true;
    let result = await this.http.post(this.apiUrl.url.verifyPassword, this.form.value);
    // return;
    this.showVerifyPhoneBtn = result["status"]
    if (result["status"] == true) {
      this.toastr.success(result['msg'], '', { timeOut: 2000 });
      this.modalService.dismissAll();
      if (this.regisrtationForm.value.password != this.newPassword) {
        Swal.fire({
          text: "You have successfully changed your password and Please login again.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(async (result) => {
          this.auth.login = false;
          this.auth.logout();
          this.router.navigate(['/login']);
          this.submitRequest();
          // }
        })
      }else if (this.regisrtationForm.value.email != this.newEmail) {
        Swal.fire({
          text: "You have successfully changed your Email and Please login again.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(async (result) => {
          this.auth.login = false;
          this.auth.logout();
          this.router.navigate(['/login']);
          this.submitRequest();
          // }
        })
      } 
      else {
        this.submitRequest();
        this.router.navigate(['/']);
      }
    } else {
      this.toastr.error(result['msg'], '', { timeOut: 2000 });
    }
  }


}
