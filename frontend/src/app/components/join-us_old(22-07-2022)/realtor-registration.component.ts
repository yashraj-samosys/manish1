import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CommonService } from "src/app/services/common.service";
import { ApiUrlService } from "src/app/services/apiUrl.service";
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidationsService } from 'src/app/services/validations.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { CropperSettings } from "ngx-img-cropper";
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-realtor-registration',
  templateUrl: './realtor-registration.component.html',
  styleUrls: ['./realtor-registration.component.css']
})
export class JoinUsComponent implements OnInit {
  str;
  str1;
  newstr;
  newstr1;
  len;
  len1;
  maxl;
  Count;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  requestData: any;
  regisrtationForm: any;
  submitted = false;
  latitude: any = '';
  longitude: any = '';
  geoError = '';
  fsaResult: any = [];
  imgData: any;
  param: any;
  id;
  finalemail: any = "";
  accountNumber;
  currentDate = new Date();
  showHidePass = true;
  agentData: any;
  updateData: [];
  @ViewChild('addressSearch', { static: false }) addressSearch: any;
  @ViewChild('addressSearch1', { static: false }) addressSearch1: any;
  settings = {
    singleSelection: false,
    text: "Select FSA",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  constructor(private ref: ChangeDetectorRef,
    public router: Router,
    public common: CommonService,
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private validation: ValidationsService,
    private modalService: NgbModal,
    private imageCropper: ImageCropperModule,
    private route: ActivatedRoute,
    private apiURL: ApiUrlService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
  ) {
    this.id = this.route.snapshot.paramMap.get('agentId')
  }
  async ngOnInit() {

    console.log(this.id, 'id..............')
    //   console.log(this.route.snapshot.paramMap.get('id'),'.......................')
    //   this.id = this.route.snapshot.params["id"]
    this.createForm();
    this.getActiveFSA();
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select FSA",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    let params = window.location.href.split('join-us/');
    if (params[1] != undefined) {

      this.agentData = await this.http.get('getAgentById/' + params[1]);
      console.log(this.agentData['data'], 'agentdatatatatatatatatat')

      // this.imgData = this.agentData["data"][0].profile_img;
      this.updateData = this.agentData['data'];
      console.log(this.updateData.length, 'length')
      // this.croppedImage = this.imgData;
      this.croppedImage = this.agentData["data"][0].profile_img;
      this.finalemail = this.agentData["data"][0].email;
      this.selectedItems = this.agentData.data[0].FSAData.map((e) => {
        return ({ id: e.id, itemName: e.fsa_code + " - " + e.nieghborhood })
      })
      this.regisrtationForm.patchValue({
        email: this.agentData['data'][0].email,
        phone: this.agentData['data'][0].mobile,
        name: this.agentData['data'][0].first_name + ' ' + this.agentData['data'][0].last_name,
        estate_brokeraege: this.agentData['data'][0].brokerageName,
        brokerage_phone: this.agentData['data'][0].brokerPhoneNo,
        website: this.agentData['data'][0].website,
        shortBio: this.agentData['data'][0].shortBio,
        longBio: this.agentData['data'][0].bio,
        password: this.agentData['data'][0].password,
        facebook: this.agentData['data'][0].facebook == 'null' ? '' : this.agentData['data'][0].facebook,
        whatsapp: this.agentData['data'][0].whatsapp == 'null' ? '' : this.agentData['data'][0].whatsapp,
        messenger: this.agentData['data'][0].messenger == 'null' ? '' : this.agentData['data'][0].messenger,
        wechat: this.agentData['data'][0].wechat == 'null' ? '' : this.agentData['data'][0].wechat,
        office_address: this.agentData['data'][0].address == "undefined" ? "" : this.agentData['data'][0].address,
        fsa: this.selectedItems,
        text_no: this.agentData['data'][0].textNo,
        brokeraege_street_address: this.agentData['data'][0].BrokerageStreetAddress,
        brokeraege_city: this.agentData['data'][0].BrokerageCity,
        brokeraege_province: this.agentData['data'][0].BrokerageProvince,
        brokeraege_postal_code: this.agentData['data'][0].BrokeragePostalCode,
        // dataImg : this.agentData['data'][0].profile_img,
      });
      // console.log(this.selectedItems,'sel')
      // console.log("this.selectedItems", this.selectedItems);
      // console.log("this.fsaData", this.agentData);

      this.dataImg = this.agentData['data'][0].profile_img
      // console.log(this.id,"dasdfasgga")
    }

    // if (this.id == null || this.id == undefined || this.id == '') {
    //   let result = await this.http.get(this.apiURL.url.getLastId);
    //   console.log(result,'getLastIDD')
    //   this.accountNumber = this.generateAccountNumber(result["data"][0].lastId);
    //   this.regisrtationForm.patchValue({ account_no: this.accountNumber });
    // }
    let result = await this.http.get(this.apiURL.url.getLastId);
    console.log(result, 'getLastIDD')
    this.accountNumber = this.generateAccountNumber(result["data"][0].lastId);
    this.regisrtationForm.patchValue({ account_no: this.accountNumber });

  }

  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);
    this.getAddress(this.addressSearch1.nativeElement);
  }
  geoCoder: any;
  getAddress(element: any) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('place', place)
          if (place.geometry === undefined || place.geometry === null) return;
          let address = place['formatted_address'].split(',');
          this.regisrtationForm.patchValue({
            brokeraege_city: address[0],
            brokeraege_province: address[1]
          })
        });
      });
    });
  }

  generateAccountNumber(n) {
    let string = "" + n;
    let pad = "000000";
    n =
      this.currentDate.getFullYear() +
      pad.substring(0, pad.length - string.length) +
      string;
    return n;
  }


  createForm() {
    this.regisrtationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
      name: ['', this.validation.removeSpace],
      // image: ['', Validators.required],
      estate_brokeraege: ['', Validators.required],
      phone: ['', this.validation.required],
      brokerage_phone: ['', this.validation.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      office_address: ['', Validators.required],
      office_address_lat: [''],
      office_address_lng: [''],
      fsa: ['', Validators.required],
      facebook: [''],
      whatsapp: [''],
      messenger: [''],
      wechat: [''],
      shortBio: ['', Validators.required],
      longBio: ['', Validators.required],
      website: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      account_no: [''],
      shown_On_Map: ['Yes'],
      text_no: ['', Validators.required],
      brokeraege_street_address: ['', Validators.required],
      brokeraege_city: ['', Validators.required],
      brokeraege_province: ['', Validators.required],
      brokeraege_postal_code: ['', Validators.required],
    });

  }
  get f() { return this.regisrtationForm.controls; }

  fsaData: any = [];
  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    // console.log(this.fsaData,'fsaDTATA')
    this.ref.detectChanges();
  }
  imageSrc: any = "";
  image = null;
  // readURL(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     this.image = file;
  //     const reader = new FileReader();
  //     reader.onload = e => this.imageSrc = reader.result;
  //     reader.readAsDataURL(file);
  //   }
  // }
  findInvalidControls() {
    const invalid = [];
    const controls = this.regisrtationForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        // console.log(name,'name')
        console.log(invalid, 'invalid')
      }
    }
    return invalid;
  }


  // onkeyup($event) {
  //   let str2 = $event.target.value
  //   this.Count = str2.replace(/ /g, '');
  //   let Count2 = this.Count.length
  //   console.log(Count2, "lenght")
  //   if (Count2 > 19) {
  //     console.log(this.maxl, "lakshya")
  //     this.maxl = 20;
  //   }
  //   else {
  //     this.maxl = false
  //   }
  // }



  async submitRequest() {



    // this.findInvalidControls();
    console.log(this.regisrtationForm.value, 'test')

    let res = [];
    this.str = this.regisrtationForm.value.shortBio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str?.map((s) => {
      let trimStr = s.trim();
      if (trimStr.length > 0) {
        res.push(trimStr);
      }
    });
    this.len = res.length;
    if (this.len > 20) {
      console.log(this.len, 'leng')
      this.toastr.warning("Short Bio should be less than 20 words", "", { timeOut: 2000 });
      return;
    }
    this.str1 = this.regisrtationForm.value.longbio;
    let res1 = [];
    this.str1 = this.regisrtationForm.value.longbio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str1?.map((s) => {
      let trimStr1 = s.trim();
      if (trimStr1.length > 0) {
        res1.push(trimStr1);
      }
    });
    this.len1 = res1.length;
    if (this.len1 < 21 && this.len1 != 0) {
      this.toastr.warning("Long Bio should be more than 20 words", "", { timeOut: 2000 });
      return;
    }


    // this.findInvalidControls();
    // console.log(this.id, 'idididi');
    // console.log(this.imgData, 'this.imgData')
    // console.log(this.regisrtationForm.value, 'value')
    this.submitted = true;
    // console.log(this.imgData, 'this.imgData')
    if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0 || !this.dataImg) {
      console.log('invalisdd')
      return;
    }
    const formData: any = new FormData();
    formData.append("first_name", this.regisrtationForm.value.name.split(' ')[0]);
    formData.append("last_name", this.regisrtationForm.value.name?.split(' ')[1]);

    // console.log(this.regisrtationForm.value.email, this.finalemail, 'mail')
    // console.log(this.imgData, "this.imgDataaaaaaaaaaaaaaaaa")

    if (this.regisrtationForm.value.email != this.finalemail) {

      formData.append("email", this.regisrtationForm.value.email);
    } else {
      formData.append("email", this.finalemail);
    }
    // console.log(this.imgData, "image data fgdasbfs")
    // return;
    // formData.append("email", this.regisrtationForm.value.email);c
    formData.append("password", this.regisrtationForm.value.password);
    formData.append("profile_img", this.dataImg);
    formData.append("address", this.common.mainAddress.address);
    formData.append("latitude", this.common.mainAddress.latitude);
    formData.append("longitude", this.common.mainAddress.longitude);
    formData.append("mobile", this.regisrtationForm.value.phone);
    formData.append("estate_brokeraege", this.regisrtationForm.value.estate_brokeraege);
    formData.append("brokerage_phone", this.regisrtationForm.value.brokerage_phone);
    formData.append("facebook", this.regisrtationForm.value.facebook);
    formData.append("whatsapp", this.regisrtationForm.value.whatsapp);
    formData.append("messenger", this.regisrtationForm.value.messenger);
    formData.append("wechat", this.regisrtationForm.value.wechat);
    formData.append("shortBio", this.regisrtationForm.value.shortBio);
    formData.append("longBio", this.regisrtationForm.value.longBio);
    formData.append("website", this.regisrtationForm.value.website);
    formData.append("account_number", this.regisrtationForm.value.account_no);
    formData.append("shownOnMap", this.regisrtationForm.value.shown_On_Map);
    formData.append("textNo", this.regisrtationForm.value.text_no);
    formData.append("BrokerageStreetAddress", this.regisrtationForm.value.brokeraege_street_address);
    formData.append("BrokerageCity", this.regisrtationForm.value.brokeraege_city);
    formData.append("BrokerageProvince", this.regisrtationForm.value.brokeraege_province);
    formData.append("BrokeragePostalCode", this.regisrtationForm.value.brokeraege_postal_code);
    let arr = [];
    for (let i = 0; i < this.regisrtationForm.value.fsa.length; i++) {
      arr.push(this.regisrtationForm.value.fsa[i].id);
    }
    formData.append("fsa_id", arr);

    if (
      this.regisrtationForm.value.fsa.length > 20
    ) {
     return this.toastr.warning('You can select only 20 FSA.')
    } else {
      let result: any = await this.http.Post('JoinUs/' + this.id, formData);
      if (result['status'] == true) {
        this.toastr.success(result["msg"], "", { timeOut: 10000 });
        if (this.id == null) {
          Swal.fire(
            'Signup Successfully',
            'Verification link has been sent to your email!',
            'success'
          )
        }

        if (this.id != null) {
          Swal.fire(
            'Update Information Successfully',
            'Verification link has been sent to your email!',
            'success'
          )
        }
        this.router.navigate(['/login']);
      } else {
        this.toastr.warning(result["msg"], "", { timeOut: 2000 });
      }

    }



  }

  // *******************************************
  fileChangeEvent(event: any): void {
    console.log(event, 'egetn')
    this.imageChangedEvent = event;
    if (event.target.files[0].type === '' || event.target.files[0].type === null || event.target.files[0].type === undefined || event.target.files[0].type === 'image/svg+xml') {
      this.toastr.warning("Please Select jpg or jpeg or png extension image!", " ", {
        timeOut: 2000,
      })
      return
    }
  }
  dataImg: any = null;
  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(this.croppedImage, 'imagecropped-==-=-')
    await fetch(this.croppedImage)
      .then(res => res.blob()).then((ress) => this.dataImg = ress)

    console.log(this.dataImg, 'aaaaaaaaaaaaaaaa')

  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  open(modal: any) {
    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => { },
        (reason) => { }
      );
  }
  // **********************************************

  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

  }
}