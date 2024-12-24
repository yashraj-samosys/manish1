import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CommonService } from "src/app/services/common.service";
import { ApiUrlService } from "src/app/services/apiUrl.service";
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidationsService } from 'src/app/services/validations.service';
import { ModalDismissReasons,NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/services/auth.service";
// import { CropperSettings } from "ngx-img-cropper";
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validationscnfg } from 'src/app/components/validations/validation';


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
  getfsaCode;
  getFSAIdAndData;
  btn_nature = false;
  showHidePass1 = true;
  showConfirm;

  searchControl: FormControl = new FormControl();
  search = "";

  requestData: any;
  regisrtationForm: FormGroup;
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
  showMyImg: any = null;

  FSA_ARR2 = [{ fsa1: '' }, { fsa2: '' }, { fsa3: '' }, { fsa4: '' }, { fsa5: '' }, { fsa6: '' }, { fsa7: '' }, { fsa8: '' }, { fsa9: '' }, { fsa11: '' }, { fsa10: '' }, { fsa12: '' }, { fsa13: '' }, { fsa14: '' }, { fsa15: '' }, { fsa16: '' }, { fsa17: '' }, { fsa18: '' }, { fsa19: '' }, { fsa20: '' }, { fsa21: '' }, { fsa22: '' }, { fsa23: '' }, { fsa24: '' }, { fsa25: '' }, { fsa26: '' }, { fsa27: '' }, { fsa28: '' }, { fsa29: '' }, { fsa30: '' }, { fsa31: '' }, { fsa32: '' }, { fsa33: '' }, { fsa34: '' }, { fsa35: '' }, { fsa36: '' }, { fsa37: '' }, { fsa38: '' }, { fsa39: '' }, { fsa40: '' }];
  fsa_id = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n11", "n10", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"];
  FSA_ARR = ["fsa1", "fsa2", "fsa3", "fsa4", "fsa5", "fsa6", "fsa7", "fsa8", "fsa9", "fsa11", "fsa10", "fsa12", "fsa13", "fsa14", "fsa15", "fsa16", "fsa17", "fsa18", "fsa19", "fsa20", "fsa21", "fsa22", "fsa23", "fsa24", "fsa25", "fsa26", "fsa27", "fsa28", "fsa29", "fsa30", "fsa31", "fsa32", "fsa33", "fsa34", "fsa35", "fsa36", "fsa37", "fsa38", "fsa39", "fsa40"]
  
  
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
  validations_cnfg = validationscnfg;
  isEnabled: boolean;

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
    private _snackBar: MatSnackBar,
    private auth: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get('agentId')
  }
  async ngOnInit() {
    // this.id = this.route.snapshot.params["id"]
    this.createForm();
    this.getActiveFSA();
    this.getActiveFSAIdAndData();
    this.searchControl = new FormControl();
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select FSA",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    if (window.location.href.split('verification/')[1] != undefined) {
      var params = window.location.href.split('verification/');
    } else { var params = window.location.href.split('join-us/'); }
    if (params[1] != undefined) {
      this.agentData = await this.http.get('getAgentById/' + params[1]);

      this.btn_nature = this.agentData['data'][0]?.status;
      this.updateData = this.agentData['data'];
      this.croppedImage = this.agentData["data"][0]?.profile_img;
      this.finalemail = this.agentData["data"][0]?.email;
      this.selectedItems = this.agentData.data[0]?.FSAData.map((e) => {
        return ({ id: e.id, itemName: e.fsa_code + " - " + e.nieghborhood })
      })
      this.regisrtationForm.patchValue({
        email: this.agentData['data'][0]?.email,
        phone: this.agentData['data'][0]?.mobile,
        // name: this.agentData['data'].length != 0 ? (this.agentData['data'][0]?.first_name + '' + (this.agentData['data'][0]?.last_name != null && this.agentData['data'][0]?.last_name != 'undefined' && this.agentData['data'][0]?.last_name != undefined && this.agentData['data'][0]?.last_name != '' && this.agentData['data'][0]?.last_name != 'null' ? ' '+this.agentData['data'][0]?.last_name : '')) : '',
        name: this.agentData['data'].length != 0 ? (this.agentData['data'][0]?.first_name + (this.agentData['data'][0]?.last_name != null && this.agentData['data'][0]?.last_name != 'undefined' && this.agentData['data'][0]?.last_name != undefined && this.agentData['data'][0]?.last_name != '' && this.agentData['data'][0]?.last_name != 'null' ? ' '+this.agentData['data'][0]?.last_name : '')) : '',
        estate_brokeraege: this.agentData['data'][0]?.brokerageName,
        brokerage_phone: this.agentData['data'][0]?.brokerPhoneNo,
        website: this.agentData['data'][0]?.website,
        shortBio: this.agentData['data'][0]?.shortBio,
        longBio: (this.agentData['data'][0]?.bio == 'null' || this.agentData['data'][0]?.bio == null) ? '' : this.agentData['data'][0]?.bio,
        password: this.agentData['data'][0]?.password,
        cpassword: this.agentData['data'][0]?.password,
        facebook: this.agentData['data'][0]?.facebook == 'null' ? '' : this.agentData['data'][0]?.facebook,
        whatsapp: this.agentData['data'][0]?.whatsapp == 'null' ? '' : this.agentData['data'][0]?.whatsapp,
        messenger: this.agentData['data'][0]?.messenger == 'null' ? '' : this.agentData['data'][0]?.messenger,
        wechat: this.agentData['data'][0]?.wechat == 'null' ? '' : this.agentData['data'][0]?.wechat,
        office_address: this.agentData['data'][0]?.address == "undefined" ? "" : this.agentData['data'][0]?.address,
        fsa1: this.agentData['data'][0]?.FSAData[0] == undefined ? '' : this.agentData['data'][0].FSAData[0].fsa_code,
        fsa2: this.agentData['data'][0]?.FSAData[1] == undefined ? '' : this.agentData['data'][0].FSAData[1].fsa_code,
        fsa3: this.agentData['data'][0]?.FSAData[2] == undefined ? '' : this.agentData['data'][0].FSAData[2].fsa_code,
        fsa4: this.agentData['data'][0]?.FSAData[3] == undefined ? '' : this.agentData['data'][0].FSAData[3].fsa_code,
        fsa5: this.agentData['data'][0]?.FSAData[4] == undefined ? '' : this.agentData['data'][0].FSAData[4].fsa_code,
        fsa6: this.agentData['data'][0]?.FSAData[5] == undefined ? '' : this.agentData['data'][0].FSAData[5].fsa_code,
        fsa7: this.agentData['data'][0]?.FSAData[6] == undefined ? '' : this.agentData['data'][0].FSAData[6].fsa_code,
        fsa8: this.agentData['data'][0]?.FSAData[7] == undefined ? '' : this.agentData['data'][0].FSAData[7].fsa_code,
        fsa9: this.agentData['data'][0]?.FSAData[8] == undefined ? '' : this.agentData['data'][0].FSAData[8].fsa_code,
        fsa10: this.agentData['data'][0]?.FSAData[9] == undefined ? '' : this.agentData['data'][0].FSAData[9].fsa_code,
        fsa11: this.agentData['data'][0]?.FSAData[10] == undefined ? '' : this.agentData['data'][0].FSAData[10].fsa_code,
        fsa12: this.agentData['data'][0]?.FSAData[11] == undefined ? '' : this.agentData['data'][0].FSAData[11].fsa_code,
        fsa13: this.agentData['data'][0]?.FSAData[12] == undefined ? '' : this.agentData['data'][0].FSAData[12].fsa_code,
        fsa14: this.agentData['data'][0]?.FSAData[13] == undefined ? '' : this.agentData['data'][0].FSAData[13].fsa_code,
        fsa15: this.agentData['data'][0]?.FSAData[14] == undefined ? '' : this.agentData['data'][0].FSAData[14].fsa_code,
        fsa16: this.agentData['data'][0]?.FSAData[15] == undefined ? '' : this.agentData['data'][0].FSAData[15].fsa_code,
        fsa17: this.agentData['data'][0]?.FSAData[16] == undefined ? '' : this.agentData['data'][0].FSAData[16].fsa_code,
        fsa18: this.agentData['data'][0]?.FSAData[17] == undefined ? '' : this.agentData['data'][0].FSAData[17].fsa_code,
        fsa19: this.agentData['data'][0]?.FSAData[18] == undefined ? '' : this.agentData['data'][0].FSAData[18].fsa_code,
        fsa20: this.agentData['data'][0]?.FSAData[19] == undefined ? '' : this.agentData['data'][0].FSAData[19].fsa_code,
        fsa21: this.agentData['data'][0]?.FSAData[20] == undefined ? '' : this.agentData['data'][0].FSAData[20].fsa_code,
        fsa22: this.agentData['data'][0]?.FSAData[21] == undefined ? '' : this.agentData['data'][0].FSAData[21].fsa_code,
        fsa23: this.agentData['data'][0]?.FSAData[22] == undefined ? '' : this.agentData['data'][0].FSAData[22].fsa_code,
        fsa24: this.agentData['data'][0]?.FSAData[23] == undefined ? '' : this.agentData['data'][0].FSAData[23].fsa_code,
        fsa25: this.agentData['data'][0]?.FSAData[24] == undefined ? '' : this.agentData['data'][0].FSAData[24].fsa_code,
        fsa26: this.agentData['data'][0]?.FSAData[25] == undefined ? '' : this.agentData['data'][0].FSAData[25].fsa_code,
        fsa27: this.agentData['data'][0]?.FSAData[26] == undefined ? '' : this.agentData['data'][0].FSAData[26].fsa_code,
        fsa28: this.agentData['data'][0]?.FSAData[27] == undefined ? '' : this.agentData['data'][0].FSAData[27].fsa_code,
        fsa29: this.agentData['data'][0]?.FSAData[28] == undefined ? '' : this.agentData['data'][0].FSAData[28].fsa_code,
        fsa30: this.agentData['data'][0]?.FSAData[29] == undefined ? '' : this.agentData['data'][0].FSAData[29].fsa_code,
        fsa31: this.agentData['data'][0]?.FSAData[30] == undefined ? '' : this.agentData['data'][0].FSAData[30].fsa_code,
        fsa32: this.agentData['data'][0]?.FSAData[31] == undefined ? '' : this.agentData['data'][0].FSAData[31].fsa_code,
        fsa33: this.agentData['data'][0]?.FSAData[32] == undefined ? '' : this.agentData['data'][0].FSAData[32].fsa_code,
        fsa34: this.agentData['data'][0]?.FSAData[33] == undefined ? '' : this.agentData['data'][0].FSAData[33].fsa_code,
        fsa35: this.agentData['data'][0]?.FSAData[34] == undefined ? '' : this.agentData['data'][0].FSAData[34].fsa_code,
        fsa36: this.agentData['data'][0]?.FSAData[35] == undefined ? '' : this.agentData['data'][0].FSAData[35].fsa_code,
        fsa37: this.agentData['data'][0]?.FSAData[36] == undefined ? '' : this.agentData['data'][0].FSAData[36].fsa_code,
        fsa38: this.agentData['data'][0]?.FSAData[37] == undefined ? '' : this.agentData['data'][0].FSAData[37].fsa_code,
        fsa39: this.agentData['data'][0]?.FSAData[38] == undefined ? '' : this.agentData['data'][0].FSAData[38].fsa_code,
        fsa40: this.agentData['data'][0]?.FSAData[39] == undefined ? '' : this.agentData['data'][0].FSAData[39].fsa_code,

        text_no: this.agentData['data'][0]?.textNo,
        brokeraege_street_address: this.agentData['data'][0]?.BrokerageStreetAddress != 'undefined' && this.agentData['data'][0]?.BrokerageStreetAddress != null && this.agentData['data'][0]?.BrokerageStreetAddress != undefined ? this.agentData['data'][0]?.BrokerageStreetAddress : '',
        brokeraege_city: this.agentData['data'][0]?.BrokerageCity,
        brokeraege_province: this.agentData['data'][0]?.BrokerageProvince,
        brokeraege_postal_code: this.agentData['data'][0]?.BrokeragePostalCode,
      });

      if (this.agentData['data'][0]?.FSAData[0]) (document.getElementById('n1') as HTMLInputElement).value = this.agentData['data'][0].FSAData[0].address;
      if (this.agentData['data'][0]?.FSAData[1]) (document.getElementById('n2') as HTMLInputElement).value = this.agentData['data'][0].FSAData[1].address;
      if (this.agentData['data'][0]?.FSAData[2]) (document.getElementById('n3') as HTMLInputElement).value = this.agentData['data'][0].FSAData[2].address;
      if (this.agentData['data'][0]?.FSAData[3]) (document.getElementById('n4') as HTMLInputElement).value = this.agentData['data'][0].FSAData[3].address;
      if (this.agentData['data'][0]?.FSAData[4]) (document.getElementById('n5') as HTMLInputElement).value = this.agentData['data'][0].FSAData[4].address;
      if (this.agentData['data'][0]?.FSAData[5]) (document.getElementById('n6') as HTMLInputElement).value = this.agentData['data'][0].FSAData[5].address;
      if (this.agentData['data'][0]?.FSAData[6]) (document.getElementById('n7') as HTMLInputElement).value = this.agentData['data'][0].FSAData[6].address;
      if (this.agentData['data'][0]?.FSAData[7]) (document.getElementById('n8') as HTMLInputElement).value = this.agentData['data'][0].FSAData[7].address;
      if (this.agentData['data'][0]?.FSAData[8]) (document.getElementById('n9') as HTMLInputElement).value = this.agentData['data'][0].FSAData[8].address;
      if (this.agentData['data'][0]?.FSAData[9]) (document.getElementById('n10') as HTMLInputElement).value = this.agentData['data'][0].FSAData[9].address;
      if (this.agentData['data'][0]?.FSAData[10]) (document.getElementById('n11') as HTMLInputElement).value = this.agentData['data'][0].FSAData[10].address;
      if (this.agentData['data'][0]?.FSAData[11]) (document.getElementById('n12') as HTMLInputElement).value = this.agentData['data'][0].FSAData[11].address;
      if (this.agentData['data'][0]?.FSAData[12]) (document.getElementById('n13') as HTMLInputElement).value = this.agentData['data'][0].FSAData[12].address;
      if (this.agentData['data'][0]?.FSAData[13]) (document.getElementById('n14') as HTMLInputElement).value = this.agentData['data'][0].FSAData[13].address;
      if (this.agentData['data'][0]?.FSAData[14]) (document.getElementById('n15') as HTMLInputElement).value = this.agentData['data'][0].FSAData[14].address;
      if (this.agentData['data'][0]?.FSAData[15]) (document.getElementById('n16') as HTMLInputElement).value = this.agentData['data'][0].FSAData[15].address;
      if (this.agentData['data'][0]?.FSAData[16]) (document.getElementById('n17') as HTMLInputElement).value = this.agentData['data'][0].FSAData[16].address;
      if (this.agentData['data'][0]?.FSAData[17]) (document.getElementById('n18') as HTMLInputElement).value = this.agentData['data'][0].FSAData[17].address;
      if (this.agentData['data'][0]?.FSAData[18]) (document.getElementById('n19') as HTMLInputElement).value = this.agentData['data'][0].FSAData[18].address;
      if (this.agentData['data'][0]?.FSAData[19]) (document.getElementById('n20') as HTMLInputElement).value = this.agentData['data'][0].FSAData[19].address;
      if (this.agentData['data'][0]?.FSAData[20]) (document.getElementById('n21') as HTMLInputElement).value = this.agentData['data'][0].FSAData[20].address;
      if (this.agentData['data'][0]?.FSAData[21]) (document.getElementById('n22') as HTMLInputElement).value = this.agentData['data'][0].FSAData[21].address;
      if (this.agentData['data'][0]?.FSAData[22]) (document.getElementById('n23') as HTMLInputElement).value = this.agentData['data'][0].FSAData[22].address;
      if (this.agentData['data'][0]?.FSAData[23]) (document.getElementById('n24') as HTMLInputElement).value = this.agentData['data'][0].FSAData[23].address;
      if (this.agentData['data'][0]?.FSAData[24]) (document.getElementById('n25') as HTMLInputElement).value = this.agentData['data'][0].FSAData[24].address;
      if (this.agentData['data'][0]?.FSAData[25]) (document.getElementById('n26') as HTMLInputElement).value = this.agentData['data'][0].FSAData[25].address;
      if (this.agentData['data'][0]?.FSAData[26]) (document.getElementById('n27') as HTMLInputElement).value = this.agentData['data'][0].FSAData[26].address;
      if (this.agentData['data'][0]?.FSAData[27]) (document.getElementById('n28') as HTMLInputElement).value = this.agentData['data'][0].FSAData[27].address;
      if (this.agentData['data'][0]?.FSAData[28]) (document.getElementById('n29') as HTMLInputElement).value = this.agentData['data'][0].FSAData[28].address;
      if (this.agentData['data'][0]?.FSAData[29]) (document.getElementById('n30') as HTMLInputElement).value = this.agentData['data'][0].FSAData[29].address;
      if (this.agentData['data'][0]?.FSAData[30]) (document.getElementById('n31') as HTMLInputElement).value = this.agentData['data'][0].FSAData[30].address;
      if (this.agentData['data'][0]?.FSAData[31]) (document.getElementById('n32') as HTMLInputElement).value = this.agentData['data'][0].FSAData[31].address;
      if (this.agentData['data'][0]?.FSAData[32]) (document.getElementById('n33') as HTMLInputElement).value = this.agentData['data'][0].FSAData[32].address;
      if (this.agentData['data'][0]?.FSAData[33]) (document.getElementById('n34') as HTMLInputElement).value = this.agentData['data'][0].FSAData[33].address;
      if (this.agentData['data'][0]?.FSAData[34]) (document.getElementById('n35') as HTMLInputElement).value = this.agentData['data'][0].FSAData[34].address;
      if (this.agentData['data'][0]?.FSAData[35]) (document.getElementById('n36') as HTMLInputElement).value = this.agentData['data'][0].FSAData[35].address;
      if (this.agentData['data'][0]?.FSAData[36]) (document.getElementById('n37') as HTMLInputElement).value = this.agentData['data'][0].FSAData[36].address;
      if (this.agentData['data'][0]?.FSAData[37]) (document.getElementById('n38') as HTMLInputElement).value = this.agentData['data'][0].FSAData[37].address;
      if (this.agentData['data'][0]?.FSAData[38]) (document.getElementById('n39') as HTMLInputElement).value = this.agentData['data'][0].FSAData[38].address;
      if (this.agentData['data'][0]?.FSAData[39]) (document.getElementById('n40') as HTMLInputElement).value = this.agentData['data'][0].FSAData[39].address;

      this.dataImg = this.agentData['data'][0]?.profile_img;
      this.showMyImg = this.agentData["data"][0].profile_img;
    }
    let result = await this.http.get(this.apiURL.url.getLastId);
    this.accountNumber = this.generateAccountNumber(result["data"][0]?.lastId);
    this.regisrtationForm.patchValue({ account_no: this.accountNumber });

  }

  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch?.nativeElement);
    this.getAddress(this.addressSearch1?.nativeElement);
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
      name: ['', this.validation.fullname],
      phone: ['', this.validation.mobile],
      text_no: ['', this.validation.textno],
      // email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
      email: ['', this.validation.email],
      estate_brokeraege: ['', this.validation.fullname],
      brokeraege_street_address: ['', this.validation.address],
      brokeraege_city: ['', this.validation.city_country],
      brokeraege_province: ['', this.validation.city_country],
      brokeraege_postal_code: ['', this.validation.postal],
      brokerage_phone: ['', this.validation.mobile],
      office_address_lat: [''],
      office_address_lng: [''],
      shortBio: ['', this.validation.shortbio],
      // longBio: ['',this.validation.longbio], // changed in validation on server[28-04-2023]
      longBio: ['',this.validation.notRequired_validator],
      // website: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      website: ['', this.validation.website],
      accept1: ['', Validators.required],
      accept2: ['', Validators.required],
      fsa1: ['', this.validation.fsacode],
      fsa2: ['',this.validation.fsacodeforall],
      fsa3: ['',this.validation.fsacodeforall],
      fsa4: ['',this.validation.fsacodeforall],
      fsa5: ['',this.validation.fsacodeforall],
      fsa6: ['',this.validation.fsacodeforall],
      fsa7: ['',this.validation.fsacodeforall],
      fsa8: ['',this.validation.fsacodeforall],
      fsa9: ['',this.validation.fsacodeforall],
      fsa11: ['',this.validation.fsacodeforall],
      fsa10: ['',this.validation.fsacodeforall],
      fsa12: ['',this.validation.fsacodeforall],
      fsa13: ['',this.validation.fsacodeforall],
      fsa14: ['',this.validation.fsacodeforall],
      fsa15: ['',this.validation.fsacodeforall],
      fsa16: ['',this.validation.fsacodeforall],
      fsa17: ['',this.validation.fsacodeforall],
      fsa18: ['',this.validation.fsacodeforall],
      fsa19: ['',this.validation.fsacodeforall],
      fsa20: ['',this.validation.fsacodeforall],
      fsa21: ['',this.validation.fsacodeforall],
      fsa22: ['',this.validation.fsacodeforall],
      fsa23: ['',this.validation.fsacodeforall],
      fsa24: ['',this.validation.fsacodeforall],
      fsa25: ['',this.validation.fsacodeforall],
      fsa26: ['',this.validation.fsacodeforall],
      fsa27: ['',this.validation.fsacodeforall],
      fsa28: ['',this.validation.fsacodeforall],
      fsa29: ['',this.validation.fsacodeforall],
      fsa30: ['',this.validation.fsacodeforall],
      fsa31: ['',this.validation.fsacodeforall],
      fsa32: ['',this.validation.fsacodeforall],
      fsa33: ['',this.validation.fsacodeforall],
      fsa34: ['',this.validation.fsacodeforall],
      fsa35: ['',this.validation.fsacodeforall],
      fsa36: ['',this.validation.fsacodeforall],
      fsa37: ['',this.validation.fsacodeforall],
      fsa38: ['',this.validation.fsacodeforall],
      fsa39: ['',this.validation.fsacodeforall],
      fsa40: ['',this.validation.fsacodeforall],
      password: ['', this.validation.password],
      cpassword: ['', this.validation.password],
      facebook: [''],
      whatsapp: [''],
      messenger: [''],
      wechat: [''],

      // image: ['', Validators.required],
      // office_address: ['', Validators.required],
      // account_no: [''],
      // shown_On_Map: ['Yes'],
    }, { validator: MustMatch('password', 'cpassword') });
  }

  get f() { return this.regisrtationForm.controls; }

  fsaData: any = [];
  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    this.ref.detectChanges();
  }
  imageSrc: any = "";
  image = null;

  async submitRequest(btn_type) {
    this.submitted = true;

    if (this.id == null) {
      this.regisrtationForm.get('cpassword').clearValidators();
      this.regisrtationForm.get('cpassword').setErrors(null);
    }
    // let res = [];
    // this.str = this.regisrtationForm.value.shortBio?.replace(/[\t\n\r\.\?\!]/gm, "").split("");
    // this.str?.map((s) => {
    //   let trimStr = s.trim();
    //   if (trimStr.length > 0) {
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
    let res1 = [];
    let charLen = this.str1?.length;
    this.str1 = this.regisrtationForm.value.longBio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str1?.map((s) => {
      let trimStr1 = s?.trim();
      if (trimStr1.length > 0) {
        res1?.push(trimStr1);
      }
    });
    this.len1 = res1.length;


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

    if (this.regisrtationForm.invalid || !this.dataImg) {console.log('inavlid'); return; }
    this.submitted = false;
    const formData: any = new FormData();
    formData.append("btn_type", btn_type);
    
    var first_name = this.regisrtationForm.value.name.split(' ')[0]
    var last_name = this.regisrtationForm.value.name.substring(first_name.length).trim()
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);

    // formData.append("first_name", this.regisrtationForm.value.name.split(' ')[0]);
    // formData.append("last_name", this.regisrtationForm.value.name?.split(' ')[1]);

    if (this.regisrtationForm.value.email != this.finalemail) {
      formData.append("email", this.regisrtationForm.value.email);
    } else {
      formData.append("email", this.finalemail);
    }
    if (this.id) {
      if (this.regisrtationForm.value.phone != this.agentData['data'][0]?.mobile || this.regisrtationForm.value.text_no != this.agentData['data'][0]?.textNo) {
        formData.append("status", 0);
      }
    }

    formData.append("profile_img", this.dataImg);
    formData.append("latitude", this.common.mainAddress.latitude);
    formData.append("longitude", this.common.mainAddress.longitude);
    formData.append("mobile", this.regisrtationForm.value.phone);
    formData.append("estate_brokeraege", this.regisrtationForm.value.estate_brokeraege);
    formData.append("brokerage_phone", this.regisrtationForm.value.brokerage_phone);
    formData.append("shortBio", this.regisrtationForm.value.shortBio);
    formData.append("longBio", this.regisrtationForm.value.longBio);
    formData.append("website", this.regisrtationForm.value.website);
    formData.append("textNo", this.regisrtationForm.value.text_no);
    formData.append("BrokerageStreetAddress", this.common.mainAddress.address ? this.common.mainAddress.address : this.regisrtationForm.value.brokeraege_street_address);
    formData.append("BrokerageCity", this.regisrtationForm.value.brokeraege_city);
    formData.append("BrokerageProvince", this.regisrtationForm.value.brokeraege_province);
    formData.append("BrokeragePostalCode", this.regisrtationForm.value.brokeraege_postal_code);
    formData.append("password", this.regisrtationForm.value.password);
    formData.append("facebook", this.regisrtationForm.value.facebook);
    formData.append("whatsapp", this.regisrtationForm.value.whatsapp);
    formData.append("messenger", this.regisrtationForm.value.messenger);
    formData.append("wechat", this.regisrtationForm.value.wechat);

    await this.getActiveFSAIdAndData();
    
    let arr = [];
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
    let result: any = await this.http.Post('JoinUs/' + this.id, formData);
    if (result['status'] == true) {
      this.toastr.success(result["msg"], "", { timeOut: 10000 });
      if (this.id == null) {
        this.router.navigate(['/login/realtor']);
      }
      if (this.id != null) {
        if (result['update_type'] == 2) {
          let timerInterval
          Swal.fire({
            title: 'Account Verified Successfully!',
            // html: 'I will close in <b></b> milliseconds.',
            html: 'We are redirecting you to login page',
            timer: 4000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
              const b: any = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((sweetresult) => {
            if (sweetresult.dismiss === Swal.DismissReason.timer) {
              if (result['update_type'] == 2) { this.btn_nature = true; this.router.navigate(['/login/realtor']); }
            }
          })
        } else {
          if (result['agent_status'] == 0 || result['agent_status'] == 5) {
            Swal.fire(
              'Your Account Information Updated Successfully',
              'Please Verify Your Account!',
            )
          }
          if (result['agent_status'] != 0 && result['agent_status'] != 5) this.router.navigate(['/login/realtor']);
          else {
            this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/verification/' + this.id]);
            });
          }
        }

      }
    } else {
      this.toastr.warning(result["msg"], "", { timeOut: 2000 });
    }

  }

  fileChangeEvent(event: any): void {
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
    await fetch(this.croppedImage)
      .then(res => res.blob()).then((ress) => this.dataImg = ress)
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  closeResult;
  open(modal: any) {
    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title" }).result.then((result) => { 
        this.closeResult = `Closed with: ${result}`;
        },(reason) => {
          if(reason == 'Cross click'){
            this.dataImg = null; this.croppedImage = ''; this.imageChangedEvent = '';
            this.croppedImage = this.showMyImg; 
          }else{
            this.dataImg = null; this.croppedImage = ''; this.imageChangedEvent = '';
            if(reason == 0){ this.croppedImage = this.showMyImg; }
          }
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true
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
    let result = await this.http.post(this.apiURL.url.getFsaCodeAndNeighborhood, { fsa_code: this.search, fsaArr: duplicates, isLoaderShow: false });
    if (result['status']) {
      this.getfsaCode = result["data"][0];
      let value = (document.getElementById(inputId) as HTMLInputElement).value = this.getfsaCode.nieghborhood;
    } else {
      let value = (document.getElementById(inputId) as HTMLInputElement).value = '';
      let fsaCodeLength = fsaValue.length;
      if (result['alreadyEntered'] == 1) message = 'This FSA Already Entered';
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
  }

  Delete(btn_type) {
    Swal.fire({
      text: btn_type == 1 ? "Are you sure, you want to Delete ?" : "Are you sure you want to Opt out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let Deletedata = {
          id: this.id,
          status: btn_type == 1 ? 2 : 0,
          // status: this.agentData['data'][0]?.status,
          profile_status: 0,
          is_want_referrals: btn_type == 1 ? 1 : 2,
          // user_type: 3,
          is_default_agent: 0,
          agent_type: this.agentData['data'][0]?.agent_type
        }
        if(btn_type == 1) Deletedata.status = 2;

        let result = await this.http.post('deletePofile', Deletedata);
        if (result['status']) {
          this.toastr.success(result['msg'], '', { timeOut: 2000 });
          this.auth.logout();
          this.apiURL.nameProfile = ''
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/login/realtor']);
          });
        }
        else this.toastr.error(result['msg'], '', { timeOut: 2000 });
      }
    })
  }

  showHidePassword1() {
    if (this.showHidePass1) this.showHidePass1 = false;
    else this.showHidePass1 = true
  }

  changePass() {
    if (this.id != null) {
      if (this.regisrtationForm.value.password != this.agentData['data'][0]?.password) {
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