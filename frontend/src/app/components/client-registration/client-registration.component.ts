import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { MustMatch } from 'src/app/services/must-match.validator';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validationscnfg } from '../validations/validation';
@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit {
  emailData: any;
  requestData: any;
  regisrtationForm: FormGroup;
  submitted = false;
  latitude: any = '';
  longitude: any = '';
  geoError = '';
  fsaResult: any = [];
  param: any
  showHidePass = true;



  myValidation = validationscnfg;


  @ViewChild('addressSearch', { static: false }) addressSearch: any;

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
  croppedImage: any = '';
  dataImg: any = null;
  imageChangedEvent: any = '';
  FSA_ARR2 = [{ fsa1: '' }, { fsa2: '' }, { fsa3: '' }, { fsa4: '' }, { fsa5: '' }, { fsa6: '' }, { fsa7: '' }, { fsa8: '' }, { fsa9: '' }, { fsa10: '' }, { fsa11: '' }, { fsa12: '' }, { fsa13: '' }, { fsa14: '' }, { fsa15: '' }, { fsa16: '' }, { fsa17: '' }, { fsa18: '' }, { fsa19: '' }, { fsa20: '' }, { fsa21: '' }, { fsa22: '' }, { fsa23: '' }, { fsa24: '' }, { fsa25: '' }, { fsa26: '' }, { fsa27: '' }, { fsa28: '' }, { fsa29: '' }, { fsa30: '' }, { fsa31: '' }, { fsa32: '' }, { fsa33: '' }, { fsa34: '' }, { fsa35: '' }, { fsa36: '' }, { fsa37: '' }, { fsa38: '' }, { fsa39: '' }, { fsa40: '' }];

  FSA_ARR = ["fsa1", "fsa2", "fsa3", "fsa4", "fsa5", "fsa6", "fsa7", "fsa8", "fsa9", "fsa10", "fsa11", "fsa12", "fsa13", "fsa14", "fsa15", "fsa16", "fsa17", "fsa18", "fsa19", "fsa20", "fsa21", "fsa22", "fsa23", "fsa24", "fsa25", "fsa26", "fsa27", "fsa28", "fsa29", "fsa30", "fsa31", "fsa32", "fsa33", "fsa34", "fsa35", "fsa36", "fsa37", "fsa38", "fsa39", "fsa40"]
  Id_arr = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"]
  getfsaCode;
  getFSAIdAndData;
  search = "";
  str;
  str1;
  len;
  len1;
  finalemail: any = "";
  newstr: any;
  isEnabled: boolean;



  constructor(private ref: ChangeDetectorRef,
    public router: Router,
    public common: CommonService,
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private validation: ValidationsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private apiURL: ApiUrlService,
    private _snackBar: MatSnackBar



  ) { }
  ngOnInit(): void {
    this.createForm();
    this.getActiveFSA();
    var param = localStorage.getItem('userid');
    this.VefifyAccount(param);
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select FSA",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.emailData = this.route.snapshot.queryParams.email;
    this.regisrtationForm.patchValue({
      email: this.emailData
    })
    this.getActiveFSAIdAndData();

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

  }

  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);

  }


  createForm() {
    this.regisrtationForm = this.formBuilder.group({
      email: ['', this.validation.email],
      name: ['', this.validation.fullname],
      text: ['', this.validation.textno],
      title: ['', this.validation.fullname],
      brokerage_city: ['', this.validation.city_country],
      brokerage_province: ['', this.validation.city_country],
      brokerage_postal_code: ['', this.validation.postal],
      estate_brokeraege: ['', this.validation.fullname],
      shortBio: ['', this.validation.shortbio],
      // longBio: ['', this.validation.longbio],  // changed in validation on server[28-04-2023]
      longBio: ['', this.validation.notRequired_validator],
      website: ['', this.validation.website],
      phone: ['', this.validation.mobile],
      brokerage_phone: ['', this.validation.mobile],
      office_address: ['', this.validation.address],
      office_address_lat: [''],
      office_address_lng: [''],
      fsa1: ['', this.validation.fsacode],
      fsa2: ['', this.validation.fsacodeforall], fsa3: ['', this.validation.fsacodeforall], fsa4: ['', this.validation.fsacodeforall], fsa5: ['', this.validation.fsacodeforall], fsa6: ['', this.validation.fsacodeforall], fsa7: ['', this.validation.fsacodeforall], fsa8: ['', this.validation.fsacodeforall], fsa9: ['', this.validation.fsacodeforall], fsa11: ['', this.validation.fsacodeforall],
      fsa10: ['', this.validation.fsacodeforall], fsa12: ['', this.validation.fsacodeforall], fsa13: ['', this.validation.fsacodeforall], fsa14: ['', this.validation.fsacodeforall], fsa15: ['', this.validation.fsacodeforall], fsa16: ['', this.validation.fsacodeforall], fsa17: ['', this.validation.fsacodeforall], fsa18: ['', this.validation.fsacodeforall],
      fsa19: ['', this.validation.fsacodeforall], fsa20: ['', this.validation.fsacodeforall], fsa21: ['', this.validation.fsacodeforall], fsa22: ['', this.validation.fsacodeforall], fsa23: ['', this.validation.fsacodeforall], fsa24: ['', this.validation.fsacodeforall], fsa25: ['', this.validation.fsacodeforall], fsa26: ['', this.validation.fsacodeforall],
      fsa27: ['', this.validation.fsacodeforall], fsa28: ['', this.validation.fsacodeforall], fsa29: ['', this.validation.fsacodeforall], fsa30: ['', this.validation.fsacodeforall], fsa31: ['', this.validation.fsacodeforall], fsa32: ['', this.validation.fsacodeforall], fsa33: ['', this.validation.fsacodeforall], fsa34: ['', this.validation.fsacodeforall],
      fsa35: ['', this.validation.fsacodeforall], fsa36: ['', this.validation.fsacodeforall], fsa37: ['', this.validation.fsacodeforall], fsa38: ['', this.validation.fsacodeforall], fsa39: ['', this.validation.fsacodeforall], fsa40: ['', this.validation.fsacodeforall],
      password: ['', this.validation.password],
      facebook: [''], whatsapp: [''],
      messenger: [''], wechat: [''],
      accept1: ['', Validators.required],
      accept2: ['', Validators.required],
    });

  }
  get f() { return this.regisrtationForm.controls; }

  fsaData: any = [];
  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    this.ref.detectChanges();
  }


  async selectFSAReq(event: any, fsa_id: any) {
    if (event.target.checked == true) {
      this.fsaResult.push(fsa_id);
    } else {
      this.fsaResult.splice(this.fsaResult.indexOf(fsa_id), 1);
    }
  }



  async submitRequest() {
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

    this.submitted = true;
    this.str = this.regisrtationForm.value.shortBio;
    this.newstr = this.str?.replace(/ /g, "")
    this.len = this.newstr.length
    if (this.len > 20) {
      this.isEnabled = true;
      this.toastr.warning("Short Bio should be less than 20 characters", "", { timeOut: 2000 });
      return;
    }

    this.str1 = this.regisrtationForm.value.longBio;
    let charLen = this.str1.length;
    let res1 = [];
    this.str1 = this.regisrtationForm.value.longBio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str1?.map((s) => {
      let trimStr1 = s?.trim();
      if (trimStr1.length > 0) {
        res1.push(trimStr1);
      }
    });
    this.len1 = res1.length;

    if (charLen > 0) {
      if (this.len1 < 21) {
        this.toastr.warning("Long Bio should be more than 20 words", "", { timeOut: 2000 });
        return;
      }
      else if (this.len1 > 200) {
        this.toastr.warning("Long Bio should not be more than 200 words", "", { timeOut: 2000 });
        return
      }

    }

    if (this.regisrtationForm.invalid || !this.dataImg) { return; }


    const formData: any = new FormData();
    // formData.append("btn_type", btn_type);
    formData.append("first_name", this.regisrtationForm.value.name.split(' ')[0]);
    formData.append("last_name", this.regisrtationForm.value.name?.split(' ')[1]);

    if (this.regisrtationForm.value.email != this.finalemail) {
      formData.append("email", this.regisrtationForm.value.email);
    } else {
      formData.append("email", this.finalemail);
    }
    formData.append("profile_img", this.dataImg);
    formData.append("latitude", this.common.mainAddress.latitude);
    formData.append("longitude", this.common.mainAddress.longitude);
    formData.append("mobile", this.regisrtationForm.value.phone);
    formData.append("brokerageName", this.regisrtationForm.value.estate_brokeraege);
    formData.append("brokerage_phone", this.regisrtationForm.value.brokerage_phone);
    formData.append("shortBio", this.regisrtationForm.value.shortBio);
    formData.append("longBio", this.regisrtationForm.value.longBio);
    formData.append("website", this.regisrtationForm.value.website);
    formData.append("textNo", this.regisrtationForm.value.text);
    formData.append("title", this.regisrtationForm.value.title);
    formData.append("office_address", this.common.mainAddress.address ? this.common.mainAddress.address : this.regisrtationForm.value.office_address);
    // formData.append("BrokerageStreetAddress", this.common.mainAddress.address ? this.common.mainAddress.address : this.regisrtationForm.value.brokeraege_street_address);
    formData.append("BrokerageCity", this.regisrtationForm.value.brokerage_city);
    formData.append("BrokerageProvince", this.regisrtationForm.value.brokerage_province);
    formData.append("BrokeragePostalCode", this.regisrtationForm.value.brokerage_postal_code);
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

    if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0) { return; }
    this.regisrtationForm.value.user_id = localStorage.getItem('userid');
    this.regisrtationForm.value.agent_id = this.param;
    formData.append("agent_id", this.regisrtationForm.value.agent_id);

    // let result: any = await this.http.Post('RealtorSignup', formData);

    let result: any = await this.http.Post('makePaymentClient', formData);

    if (result["status"] == true) {
      var param = localStorage.getItem('userid');
      let user_id = result.user_id;
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
      var param = localStorage.getItem('userid');
      this.VefifyAccount(param);
      Swal.fire({
        text: "You will be redirect to Payment description page ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.href = environment.PaymentUrl + user_id;
          this.croppedImage = ''; this.imageChangedEvent = ''; this.dataImg = null;
          this.regisrtationForm.reset();
          this.submitted = false;
          this.createForm();
          for (let i = 0; i < this.Id_arr.length; i++) {
            (document.getElementById(this.Id_arr[i]) as HTMLInputElement).value = '';
          }
        }else if (result.isDismissed) {
          this.router.navigate(['/']);
        }
        else {
          this.croppedImage = ''; this.imageChangedEvent = ''; this.dataImg = null;
          this.regisrtationForm.reset();
          this.createForm();
          this.submitted = false;
          for (let i = 0; i < this.Id_arr.length; i++) {
            (document.getElementById(this.Id_arr[i]) as HTMLInputElement).value = '';
          }
        }
      })
    } else {
      if (result["status"] == false) this.toastr.error(result["msg"], '', { timeOut: 2000 });
      else { this.toastr.warning(result["msg"], '', { timeOut: 2000 }); }
    }
  }

  
  async VefifyAccount(param: any) {
    let data: any = await this.http.post('getUserDataForPayment/' + param, {});
    if (data.status) {
      this.requestData = data['data'][0];
      this.requestData = data['data'];
    }
  }

  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

  }
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

  // open(modal: any) {
  //   this.modalService
  //     .open(modal, { ariaLabelledBy: "modal-basic-title" })
  //     .result.then(
  //       (result) => { },
  //       (reason) => { }
  //     );
  // }

  closeResult;
  public openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      if (reason == 'Cross click') {
        this.croppedImage = ''; this.imageChangedEvent = ''; this.dataImg = null;
      } else {
        this.croppedImage = ''; this.dataImg = null; this.imageChangedEvent = '';
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


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (event.target.files[0].type === '' || event.target.files[0].type === null || event.target.files[0].type === undefined || event.target.files[0].type === 'image/svg+xml') {
      this.toastr.warning("Please Select jpg or jpeg or png extension image!", " ", {
        timeOut: 2000,
      })
      return
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
    let result = await this.http.post(this.apiURL.url.getFsaCodeAndNeighborhood, { fsa_code: this.search, fsaArr: duplicates, isLoaderShow: false });
    // console.log(fsaValue, inputId, message, action,result, "actionactionactionactionaction");
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

        for (let i = 0; i <= this.Id_arr.length; i++) {
          if (this.Id_arr[i] == inputId) {
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

  onchange() {
    if (!this.regisrtationForm.value.accept1) this.f.accept1.reset();
    if (!this.regisrtationForm.value.accept2) this.f.accept2.reset();
  }


}