import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { validationscnfg } from '../validations/validation';

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
  myValidation = validationscnfg;
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
  showHidePass1 = true;
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

  FSA_ARR2 = [{ fsa1: '' }, { fsa2: '' }, { fsa3: '' }, { fsa4: '' }, { fsa5: '' }, { fsa6: '' }, { fsa7: '' }, { fsa8: '' }, { fsa9: '' }, { fsa11: '' }, { fsa10: '' }, { fsa12: '' }, { fsa13: '' }, { fsa14: '' }, { fsa15: '' }, { fsa16: '' }, { fsa17: '' }, { fsa18: '' }, { fsa19: '' }, { fsa20: '' }, { fsa21: '' }, { fsa22: '' }, { fsa23: '' }, { fsa24: '' }, { fsa25: '' }, { fsa26: '' }, { fsa27: '' }, { fsa28: '' }, { fsa29: '' }, { fsa30: '' }, { fsa31: '' }, { fsa32: '' }, { fsa33: '' }, { fsa34: '' }, { fsa35: '' }, { fsa36: '' }, { fsa37: '' }, { fsa38: '' }, { fsa39: '' }, { fsa40: '' }];
  fsa_id = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n11", "n10", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"];

  FSA_ARR = ["fsa1", "fsa2", "fsa3", "fsa4", "fsa5", "fsa6", "fsa7", "fsa8", "fsa9", "fsa11", "fsa10", "fsa12", "fsa13", "fsa14", "fsa15", "fsa16", "fsa17", "fsa18", "fsa19", "fsa20", "fsa21", "fsa22", "fsa23", "fsa24", "fsa25", "fsa26", "fsa27", "fsa28", "fsa29", "fsa30", "fsa31", "fsa32", "fsa33", "fsa34", "fsa35", "fsa36", "fsa37", "fsa38", "fsa39", "fsa40"]
  search = "";
  getfsaCode;
  showConfirm;
  getFSAIdAndData;
  isEnabled: boolean;

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.userType = localStorage.getItem('type')
    this.is_default_agent = localStorage.getItem('is_default_agent');
    this.getActiveFSA();
    if (this.userId) this.getProfileData();
    this.editProfileForm();
    this.createform();
    this.getActiveFSAIdAndData();
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
      name: this.data?.first_name + ((this.data?.last_name == 'undefined' || this.data?.last_name == 'null' || this.data?.last_name == null || this.data?.last_name == '' || this.data?.last_name == ' ') ? '' : ' ' + this.data?.last_name),
      phone: this.data?.mobile?.replaceAll('-', ''),
      estate_brokeraege: this.data?.brokerageName != ('undefined' || null) ? this.data?.brokerageName : '',
      email: this.data?.email,
      brokerage_phone: this.data?.brokerPhoneNo,
      // mobile: this.data?.email,
      password: this.data?.password,
      website: this.data?.website,
      shortBio: this.data?.shortBio,
      longBio: this.data?.bio != 'null' ? this.data?.bio : '',
      facebook: this.data?.facebook == 'null' ? '' : this.data?.facebook,
      whatsapp: this.data?.whatsapp == 'null' ? '' : this.data?.whatsapp,
      messenger: this.data?.messenger == 'null' ? '' : this.data?.messenger,
      wechat: this.data?.wechat == 'null' ? '' : this.data?.wechat,
      office_address: this.data?.address == "undefined" ? "" : this.data?.address,
      fsa: this.data?.agentFsa,
      account_no: this.data?.account_number,
      shown_On_Map: ['Yes'],
      text_no: this.data?.textNo != ('undefined' || null) ? this.data?.textNo : '',
      brokeraege_street_address: this.data?.BrokerageStreetAddress == 'undefined' ? '' : this.data?.BrokerageStreetAddress,
      brokeraege_city: this.data?.BrokerageCity,
      brokeraege_province: this.data?.BrokerageProvince,
      brokeraege_postal_code: this.data?.BrokeragePostalCode,

      fsa1: this.data?.FSAData[0] == undefined ? '' : this.data?.FSAData[0].fsa_code,
      fsa2: this.data?.FSAData[1] == undefined ? '' : this.data?.FSAData[1].fsa_code,
      fsa3: this.data?.FSAData[2] == undefined ? '' : this.data?.FSAData[2].fsa_code,
      fsa4: this.data?.FSAData[3] == undefined ? '' : this.data?.FSAData[3].fsa_code,
      fsa5: this.data?.FSAData[4] == undefined ? '' : this.data?.FSAData[4].fsa_code,
      fsa6: this.data?.FSAData[5] == undefined ? '' : this.data?.FSAData[5].fsa_code,
      fsa7: this.data?.FSAData[6] == undefined ? '' : this.data?.FSAData[6].fsa_code,
      fsa8: this.data?.FSAData[7] == undefined ? '' : this.data?.FSAData[7].fsa_code,
      fsa9: this.data?.FSAData[8] == undefined ? '' : this.data?.FSAData[8].fsa_code,
      fsa10: this.data?.FSAData[9] == undefined ? '' : this.data?.FSAData[9].fsa_code,
      fsa11: this.data?.FSAData[10] == undefined ? '' : this.data?.FSAData[10].fsa_code,
      fsa12: this.data?.FSAData[11] == undefined ? '' : this.data?.FSAData[11].fsa_code,
      fsa13: this.data?.FSAData[12] == undefined ? '' : this.data?.FSAData[12].fsa_code,
      fsa14: this.data?.FSAData[13] == undefined ? '' : this.data?.FSAData[13].fsa_code,
      fsa15: this.data?.FSAData[14] == undefined ? '' : this.data?.FSAData[14].fsa_code,
      fsa16: this.data?.FSAData[15] == undefined ? '' : this.data?.FSAData[15].fsa_code,
      fsa17: this.data?.FSAData[16] == undefined ? '' : this.data?.FSAData[16].fsa_code,
      fsa18: this.data?.FSAData[17] == undefined ? '' : this.data?.FSAData[17].fsa_code,
      fsa19: this.data?.FSAData[18] == undefined ? '' : this.data?.FSAData[18].fsa_code,
      fsa20: this.data?.FSAData[19] == undefined ? '' : this.data?.FSAData[19].fsa_code,
      fsa21: this.data?.FSAData[20] == undefined ? '' : this.data?.FSAData[20].fsa_code,
      fsa22: this.data?.FSAData[21] == undefined ? '' : this.data?.FSAData[21].fsa_code,
      fsa23: this.data?.FSAData[22] == undefined ? '' : this.data?.FSAData[22].fsa_code,
      fsa24: this.data?.FSAData[23] == undefined ? '' : this.data?.FSAData[23].fsa_code,
      fsa25: this.data?.FSAData[24] == undefined ? '' : this.data?.FSAData[24].fsa_code,
      fsa26: this.data?.FSAData[25] == undefined ? '' : this.data?.FSAData[25].fsa_code,
      fsa27: this.data?.FSAData[26] == undefined ? '' : this.data?.FSAData[26].fsa_code,
      fsa28: this.data?.FSAData[27] == undefined ? '' : this.data?.FSAData[27].fsa_code,
      fsa29: this.data?.FSAData[28] == undefined ? '' : this.data?.FSAData[28].fsa_code,
      fsa30: this.data?.FSAData[29] == undefined ? '' : this.data?.FSAData[29].fsa_code,
      fsa31: this.data?.FSAData[30] == undefined ? '' : this.data?.FSAData[30].fsa_code,
      fsa32: this.data?.FSAData[31] == undefined ? '' : this.data?.FSAData[31].fsa_code,
      fsa33: this.data?.FSAData[32] == undefined ? '' : this.data?.FSAData[32].fsa_code,
      fsa34: this.data?.FSAData[33] == undefined ? '' : this.data?.FSAData[33].fsa_code,
      fsa35: this.data?.FSAData[34] == undefined ? '' : this.data?.FSAData[34].fsa_code,
      fsa36: this.data?.FSAData[35] == undefined ? '' : this.data?.FSAData[35].fsa_code,
      fsa37: this.data?.FSAData[36] == undefined ? '' : this.data?.FSAData[36].fsa_code,
      fsa38: this.data?.FSAData[37] == undefined ? '' : this.data?.FSAData[37].fsa_code,
      fsa39: this.data?.FSAData[38] == undefined ? '' : this.data?.FSAData[38].fsa_code,
      fsa40: this.data?.FSAData[39] == undefined ? '' : this.data?.FSAData[39].fsa_code,

    })
    if (this.data?.FSAData[0]) (document.getElementById('n1') as HTMLInputElement).value = this.data.FSAData[0].address;
    if (this.data?.FSAData[1]) (document.getElementById('n2') as HTMLInputElement).value = this.data.FSAData[1].address;
    if (this.data?.FSAData[2]) (document.getElementById('n3') as HTMLInputElement).value = this.data.FSAData[2].address;
    if (this.data?.FSAData[3]) (document.getElementById('n4') as HTMLInputElement).value = this.data.FSAData[3].address;
    if (this.data?.FSAData[4]) (document.getElementById('n5') as HTMLInputElement).value = this.data.FSAData[4].address;
    if (this.data?.FSAData[5]) (document.getElementById('n6') as HTMLInputElement).value = this.data.FSAData[5].address;
    if (this.data?.FSAData[6]) (document.getElementById('n7') as HTMLInputElement).value = this.data.FSAData[6].address;
    if (this.data?.FSAData[7]) (document.getElementById('n8') as HTMLInputElement).value = this.data.FSAData[7].address;
    if (this.data?.FSAData[8]) (document.getElementById('n9') as HTMLInputElement).value = this.data.FSAData[8].address;
    if (this.data?.FSAData[9]) (document.getElementById('n10') as HTMLInputElement).value = this.data.FSAData[9].address;
    if (this.data?.FSAData[10]) (document.getElementById('n11') as HTMLInputElement).value = this.data.FSAData[10].address;
    if (this.data?.FSAData[11]) (document.getElementById('n12') as HTMLInputElement).value = this.data.FSAData[11].address;
    if (this.data?.FSAData[12]) (document.getElementById('n13') as HTMLInputElement).value = this.data.FSAData[12].address;
    if (this.data?.FSAData[13]) (document.getElementById('n14') as HTMLInputElement).value = this.data.FSAData[13].address;
    if (this.data?.FSAData[14]) (document.getElementById('n15') as HTMLInputElement).value = this.data.FSAData[14].address;
    if (this.data?.FSAData[15]) (document.getElementById('n16') as HTMLInputElement).value = this.data.FSAData[15].address;
    if (this.data?.FSAData[16]) (document.getElementById('n17') as HTMLInputElement).value = this.data.FSAData[16].address;
    if (this.data?.FSAData[17]) (document.getElementById('n18') as HTMLInputElement).value = this.data.FSAData[17].address;
    if (this.data?.FSAData[18]) (document.getElementById('n19') as HTMLInputElement).value = this.data.FSAData[18].address;
    if (this.data?.FSAData[19]) (document.getElementById('n20') as HTMLInputElement).value = this.data.FSAData[19].address;
    if (this.data?.FSAData[20]) (document.getElementById('n21') as HTMLInputElement).value = this.data.FSAData[20].address;
    if (this.data?.FSAData[21]) (document.getElementById('n22') as HTMLInputElement).value = this.data.FSAData[21].address;
    if (this.data?.FSAData[22]) (document.getElementById('n23') as HTMLInputElement).value = this.data.FSAData[22].address;
    if (this.data?.FSAData[23]) (document.getElementById('n24') as HTMLInputElement).value = this.data.FSAData[23].address;
    if (this.data?.FSAData[24]) (document.getElementById('n25') as HTMLInputElement).value = this.data.FSAData[24].address;
    if (this.data?.FSAData[25]) (document.getElementById('n26') as HTMLInputElement).value = this.data.FSAData[25].address;
    if (this.data?.FSAData[26]) (document.getElementById('n27') as HTMLInputElement).value = this.data.FSAData[26].address;
    if (this.data?.FSAData[27]) (document.getElementById('n28') as HTMLInputElement).value = this.data.FSAData[27].address;
    if (this.data?.FSAData[28]) (document.getElementById('n29') as HTMLInputElement).value = this.data.FSAData[28].address;
    if (this.data?.FSAData[29]) (document.getElementById('n30') as HTMLInputElement).value = this.data.FSAData[29].address;
    if (this.data?.FSAData[30]) (document.getElementById('n31') as HTMLInputElement).value = this.data.FSAData[30].address;
    if (this.data?.FSAData[31]) (document.getElementById('n32') as HTMLInputElement).value = this.data.FSAData[31].address;
    if (this.data?.FSAData[32]) (document.getElementById('n33') as HTMLInputElement).value = this.data.FSAData[32].address;
    if (this.data?.FSAData[33]) (document.getElementById('n34') as HTMLInputElement).value = this.data.FSAData[33].address;
    if (this.data?.FSAData[34]) (document.getElementById('n35') as HTMLInputElement).value = this.data.FSAData[34].address;
    if (this.data?.FSAData[35]) (document.getElementById('n36') as HTMLInputElement).value = this.data.FSAData[35].address;
    if (this.data?.FSAData[36]) (document.getElementById('n37') as HTMLInputElement).value = this.data.FSAData[36].address;
    if (this.data?.FSAData[37]) (document.getElementById('n38') as HTMLInputElement).value = this.data.FSAData[37].address;
    if (this.data?.FSAData[38]) (document.getElementById('n39') as HTMLInputElement).value = this.data.FSAData[38].address;
    if (this.data?.FSAData[39]) (document.getElementById('n40') as HTMLInputElement).value = this.data.FSAData[39].address;
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
  geoCoder: any;

  getAddress(element: any) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
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

  editProfileForm() {
    this.regisrtationForm = this.formBuilder.group({
      name: ['', this.validation.fullname],
      phone: ['', this.validation.mobile],
      password: ['', this.validation.password],
      email: ['', this.userType == 4 ? '' : this.validation.email],
      estate_brokeraege: ['', this.userType == 4 ? '' : this.validation.fullname],
      brokerage_phone: ['', this.userType == 4 ? '' : this.validation.mobile],
      website: ['', this.userType == 4 ? '' : this.validation.website],
      shortBio: ['', this.userType == 4 ? '' : this.validation.shortbio],
      longBio: ['',this.validation.longbio],
      facebook: [''],
      whatsapp: [''],
      messenger: [''],
      wechat: [''],
      fsa1: ['', this.userType == 4 ? '' : this.validation.fsacode],
      fsa2: ['',this.validation.fsacodeforall], fsa3: ['',this.validation.fsacodeforall], fsa4: ['',this.validation.fsacodeforall], fsa5: ['',this.validation.fsacodeforall], fsa6: ['',this.validation.fsacodeforall], fsa7: ['',this.validation.fsacodeforall], fsa8: ['',this.validation.fsacodeforall], fsa9: ['',this.validation.fsacodeforall], fsa11: ['',this.validation.fsacodeforall],
      fsa10: ['',this.validation.fsacodeforall], fsa12: ['',this.validation.fsacodeforall], fsa13: ['',this.validation.fsacodeforall], fsa14: ['',this.validation.fsacodeforall], fsa15: ['',this.validation.fsacodeforall], fsa16: ['',this.validation.fsacodeforall], fsa17: ['',this.validation.fsacodeforall], fsa18: ['',this.validation.fsacodeforall],
      fsa19: ['',this.validation.fsacodeforall], fsa20: ['',this.validation.fsacodeforall], fsa21: ['',this.validation.fsacodeforall], fsa22: ['',this.validation.fsacodeforall], fsa23: ['',this.validation.fsacodeforall], fsa24: ['',this.validation.fsacodeforall], fsa25: ['',this.validation.fsacodeforall], fsa26: ['',this.validation.fsacodeforall],
      fsa27: ['',this.validation.fsacodeforall], fsa28: ['',this.validation.fsacodeforall], fsa29: ['',this.validation.fsacodeforall], fsa30: ['',this.validation.fsacodeforall], fsa31: ['',this.validation.fsacodeforall], fsa32: ['',this.validation.fsacodeforall], fsa33: ['',this.validation.fsacodeforall], fsa34: ['',this.validation.fsacodeforall],
      fsa35: ['',this.validation.fsacodeforall], fsa36: ['',this.validation.fsacodeforall], fsa37: ['',this.validation.fsacodeforall], fsa38: ['',this.validation.fsacodeforall], fsa39: ['',this.validation.fsacodeforall], fsa40: ['',this.validation.fsacodeforall],
      account_no: [''],
      shown_On_Map: ['Yes'],
      text_no: ['', this.userType == 4 ? '' : this.validation.textno],
      brokeraege_street_address: ['', this.userType == 4 ? '' : this.validation.address],
      brokeraege_city: ['', this.userType == 4 ? '' : this.validation.city_country],
      brokeraege_province: ['', this.userType == 4 ? '' : this.validation.city_country],
      brokeraege_postal_code: ['', this.userType == 4 ? '' : this.validation.postal],
      accept1: ['', this.userType == 4 ? '' : this.validation.required],
      accept2: ['', this.userType == 4 ? '' : this.validation.required]
      // cpassword: ['', this.validation.required],
      // mobile: ['', this.userType == 4 ? '': this.validation.required],
      // office_address: ['', this.userType == 4 ? '' : this.validation.required],
    })
  }


  onItemSelect(item: any) {
    this.regisrtationForm.value.fsa = this.selectedItems;
  }
  OnItemDeSelect(item: any) {
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



  async submitRequest() {
    this.submitted = true;
    if (this.userType == 2 || this.userType == 3) {
      // let res = [];
      // this.str = this.regisrtationForm.value.shortBio?.replace(/[\t\n\r\.\?\!]/gm, "").split("");
      // this.str?.map((s) => {
      //   let trimStr = s?.trim();
      //   if (trimStr?.length > 0) {
      //     res.push(trimStr);
      //   }
      // });
      // this.len = res.length;
      // if (this.len > 20) {
      //   this.toastr.warning("Short Bio should be less than 20 words", "", { timeOut: 2000 });
      //   return;
      // }
      this.str = this.regisrtationForm.value.shortBio;
      this.newstr = this.str?.replace(/ /g, "")
      this.len = this.newstr?.length
      if (this.len > 20) {
        this.isEnabled = true;
        this.toastr.warning("Short Bio should be less than 20 characters", "", { timeOut: 2000 });
        return;
      }
      this.str1 = this.regisrtationForm.value.longBio;
      let charLen = this.str1?.length;

      let res1 = [];
      this.str1 = this.regisrtationForm.value.longBio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
      this.str1?.map((s) => {
        let trimStr1 = s?.trim();
        if (trimStr1?.length > 0) {
          res1.push(trimStr1);
        }
      });
      this.len1 = res1?.length;

      if(charLen > 0){
        if ( this.len1 < 21){
          this.toastr.warning("Long Bio should be more than 20 words", "", { timeOut: 2000 });
        return;
      }
        else if (this.len1 >200) {
          this.toastr.warning("Long Bio should not be more than 200 words", "", { timeOut: 2000 });
        return
        }
        
      }
    }

    
    if (this.regisrtationForm.invalid) {
      return;
    }

    const formData = new FormData;
    if (this.userType == 2 || this.userType == 3) {

      formData.append('first_name', this.regisrtationForm.value.name.split(' ')[0]);
      formData.append('last_name', this.regisrtationForm.value.name.split(' ')[1]);
      formData.append('userType', this.userType);
      if (this.showVerifyPhoneBtn == false) {
        if ((this.regisrtationForm.value.name.split(' ')[0] != this.fname) || (this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
          this.submitted = false;
          this.openPassword(this.modalUpdate);
          return;
        }
      }

      if (this.regisrtationForm.value.password.length > 0) {
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
      formData.append("address", this.common.mainAddress.address ? this.common.mainAddress.address : this.regisrtationForm.value.brokeraege_street_address);
      formData.append("shortBio", this.regisrtationForm.value.shortBio);
      formData.append("bio", this.regisrtationForm.value.longBio);
      formData.append("website", this.regisrtationForm.value.website);
      formData.append("shownOnMap", this.regisrtationForm.value.shown_On_Map);
      formData.append("textNo", this.regisrtationForm.value.text_no);
      formData.append("BrokerageStreetAddress", this.common.mainAddress.address ? this.common.mainAddress.address : this.regisrtationForm.value.brokeraege_street_address);
      formData.append("BrokerageCity", this.regisrtationForm.value.brokeraege_city);
      formData.append("BrokerageProvince", this.regisrtationForm.value.brokeraege_province);
      formData.append("latitude", this.common.mainAddress.latitude);
      formData.append("longitude", this.common.mainAddress.longitude);
      formData.append("BrokeragePostalCode", this.regisrtationForm.value.brokeraege_postal_code);
      formData.append('is_default_agent', this.is_default_agent);
      formData.append('agenttype', this.data?.agent_type);
      formData.append('account_number', this.regisrtationForm.value.account_no);

     await this.getActiveFSAIdAndData();

      let arr: any = [];
      if (this.regisrtationForm.value.fsa1) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa1.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa2) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa2.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa3) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa3.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa4) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa4.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa5) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa5.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa6) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa6.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa7) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa7.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa8) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa8.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa9) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa9.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa10) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa10.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa11) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa11.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa12) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa12.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa13) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa13.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa14) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa14.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa15) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa15.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa16) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa16.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa17) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa17.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa18) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa18.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa19) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa19.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa20) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa20.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa21) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa21.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa22) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa22.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa23) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa23.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa24) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa24.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa25) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa25.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa26) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa26.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa27) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa27.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa28) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa28.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa29) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa29.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa30) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa30.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa31) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa31.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa32) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa32.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa33) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa33.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa34) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa34.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa35) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa35.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa36) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa36.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa37) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa37.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa38) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa38.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa39) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa39.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
      if (this.regisrtationForm.value.fsa40) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa40.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }

      formData.append("fsa_id", arr);
      
    } else {
      formData.append('first_name', this.regisrtationForm.value.name.split(' ')[0]);
      formData.append('last_name', this.regisrtationForm.value.name.split(' ')[1]);
      formData.append("mobile", this.regisrtationForm.value.phone);
      formData.append('email', this.regisrtationForm.value.email);
      formData.append('userType', this.userType)

      if (this.showVerifyPhoneBtn == false) {
        // if ((this.regisrtationForm.value.name.split(' ')[0] != this.fname || this.regisrtationForm.value.name.split(' ')[1] != this.lname) || (this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
        if ((this.regisrtationForm.value.name.split(' ')[0] != this.fname) || (this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
          this.submitted = false;
          this.openPassword(this.modalUpdate);
          return;
        }
      }
      if (this.regisrtationForm.value.password.length > 0) {
        formData.append('password', this.regisrtationForm.value.password);
      }
      formData.append('profile_img', this.imgData);

    }

//  var result;
// result = await this.http.post(this.apiUrl.url.getFsaCodeAndNeighborhood, { fsa_code:this.regisrtationForm.value.fsa1,fsaArr:this.regisrtationForm.value.fsa1,isLoaderShow: false });
  // console.log(result.status,result,checkFSA)

  this.resultData = await this.http.Post(this.apiUrl.url.editProfile + this.id, formData);
    if (this.resultData["status"] == true) {
      this.toastr.success(this.resultData['msg'], '', { timeOut: 2000 });
      this.imageData = await this.http.get(this.apiUrl.url.getUserById + this.userId);
      this.apiUrl.editProfile = this.imageData.data[0].profile_img
      this.apiUrl.nameProfile = `${this.imageData.data[0].first_name}${this.imageData.data[0]?.last_name != undefined && this.imageData.data[0]?.last_name != 'undefined' && this.imageData.data[0]?.last_name != null && this.imageData.data[0]?.last_name != 'null' ? ' ' + this.imageData.data[0]?.last_name : ''}`;

      // this.x = localStorage.getItem("profile_status");
      localStorage.setItem('profile_status', '1');

      // if(this.regisrtationForm.value.password > 0){
      if ((this.regisrtationForm.value.password != this.newPassword) || (this.regisrtationForm.value.email != this.newEmail)) {
        // this.router.navigate(['/login']);
        if (this.resultData['user_type'] == 3) this.router.navigate(['/login/realtor']);
        if (this.resultData['user_type'] == 2) this.router.navigate(['/login/client']);
        if (this.resultData['user_type'] == 4) this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      if(this.resultData["status"] == false) this.toastr.error(this.resultData['msg'], '', { timeOut: 2000 });
      else{ this.toastr.warning(this.resultData['msg'], '', { timeOut: 2000 }); }
      
    }
  
  }

  async updatePass() {
    console.log(this.regisrtationForm.value, 'this.regisrtationForm.value', this.form.value)

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
      console.log(this.regisrtationForm.value.password, 'chckccuu', this.newPassword)
      if (this.regisrtationForm.value.password != this.newPassword) {
        Swal.fire({
          text: "You have successfully changed your password and Please login again.",
          icon: 'warning',

          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then(async (result) => {
          this.submitRequest();
          this.auth.login = false;
          this.auth.logout();
          this.router.navigate(['/login']);
          // }
        })
      } else if (this.regisrtationForm.value.email != this.newEmail) {
        Swal.fire({
          text: "You have successfully changed your Email and Please login again.",
          icon: 'warning',
        
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
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


  fsaCodeArr = [];
  async getFsaCodeAndNeighborhood(fsaValue: any, inputId, message: string, action: string) {
    let arr = []
    let duplicates = []
    this.FSA_ARR.forEach(el => {
      if (this.regisrtationForm.value[`${el}`].toUpperCase()) {
        arr.push(this.regisrtationForm.value[`${el}`].toUpperCase());
        duplicates = Array.from(new Set(arr.filter((eg, i, ar) => i !== ar.indexOf(eg))))
      }
    });
    this.search = fsaValue;
    let result = await this.http.post(this.apiUrl.url.getFsaCodeAndNeighborhood, { fsa_code: this.search, fsaArr: duplicates, isLoaderShow: false });

    if (result['status']) {
      this.getfsaCode = result["data"][0];
      let value = (document.getElementById(inputId) as HTMLInputElement).value = this.getfsaCode.nieghborhood;
    } else {
      let value = (document.getElementById(inputId) as HTMLInputElement).value = '';
      let fsaCodeLength = fsaValue.length;
      if (result['alreadyEntered'] == 1) { message = 'This FSA Already Entered'; }
      if (fsaCodeLength == 3) {
        this._snackBar.open(message, action, { duration: 5000 });
      this.toastr.warning(message, '', { timeOut: 2000 });
        for (let i = 0; i <= this.fsa_id.length; i++) {
          if (this.fsa_id[i] == inputId) {
            this.regisrtationForm.patchValue(
              this.FSA_ARR2[i]
            )
          }
        }
      }
    }
    inputId = "";
  }

  async getActiveFSAIdAndData() {
    let data: any = await this.http.post('getActiveFSAIdAndData/', {})
    this.getFSAIdAndData = data['data'];
    console.log(this.getFSAIdAndData,'this.getFSAIdAndData===========')
  }





  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true


  }

  // Sourabh Start

  showHidePassword2() {
    if (this.showHidePass1) this.showHidePass1 = false;
    else this.showHidePass1 = true

  }
  // Sourabh End


  showHideConform() {
    if (this.showHideConPass) this.showHideConPass = false;
    else this.showHideConPass = true;


  }



  changePass() {
    if (this.id != null) {
      if (this.regisrtationForm.value.password != this.data?.password) {
        this.showConfirm = true;
      }
    } else {
      this.regisrtationForm.get('cpassword').clearValidators();
      this.regisrtationForm.updateValueAndValidity();
    }
  }

  onchange() {
    if (!this.regisrtationForm.value.accept1) this.f.accept1.reset();
    if (!this.regisrtationForm.value.accept2) this.f.accept2.reset();
  }


}
