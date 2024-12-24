import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ValidationsService } from 'src/app/services/validations.service';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validationscnfg } from '../validations/validation';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css'],
})
export class CreateRequestComponent implements OnInit {
  requestData: any;
  regisrtationForm: any;
  mobileVerify: any;
  submitted = false;
  latitude: any = '';
  longitude: any = '';
  geoError = '';
  fsaResult: any = [];
  param: any;
  newParam: any;
  showVerifyPhoneBtn = true;
  phoneNoModel: any;
  showVerifyEmailBtn = true;
  fsaData: any;
  selectedFsa: any;
  getFSAIdAndData;
  FSA_ARR2 = [{ fsa1: '' }];

  fsa_id = ["n1"];

  FSA_ARR = ["fsa1"]
  search = "";
  getfsaCode;
  fsaDisable
  validations_cnfg = validationscnfg

  settings = {
    singleSelection: false,
    text: 'Choose up to  20 FSA ( Postal Code) areas serve',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class',
  };

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  @ViewChild('addressSearch', { static: false }) addressSearch: any;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    public common: CommonService,
    private apiUrl: ApiUrlService,
    private http: HttpService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private validation: ValidationsService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _snackBar: MatSnackBar

  ) { }
  async ngOnInit(): Promise<void> {
    this.fsaDisable = true;

    this.param = window.location.href.split('create-request/')[1];
    console.log(this.param,'this.param')
    this.mobileVerify = this.formBuilder.group({
      phoneotp: [''],
      vefifyotp: [''],
    });
    // this.param  = this.param.split("/")[0]
    this.getPhoneCode();
    this.getActiveFSA();
    this.getRequestById(this.param);
    this.createForm();
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
  async getActiveFSAIdAndData() {
    let data: any = await this.http.post('getActiveFSAIdAndData/', {})
    this.getFSAIdAndData = data['data'];
    console.log(this.getFSAIdAndData, 'getFSAIdAndData')
    // this.ref.detectChanges();
  }
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

  ngAfterViewInit() {
    // this.common.getAddress(this.addressSearch.nativeElement);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  createForm() {
    this.regisrtationForm = this.formBuilder.group({
      email: ['', this.validation.email],
      name: ['', this.validation.fullname],
      estate_brokeraege: ['1'],
      phone: ['', this.validation.mobile],
      brokerage_phone: [''],
      office_address: ['', this.validation.address],
      phone_code: ['', Validators.required],
      verifyMobile: [''],
      verifyEmail: [''],
      // fsa: [[], this.validation.required],
      fsa1: ['', this.validation.fsacode2],
      fsa2: [''], fsa3: [''], fsa4: [''], fsa5: [''], fsa6: [''], fsa7: [''], fsa8: [''], fsa9: [''], fsa11: [''],
      fsa10: [''], fsa12: [''], fsa13: [''], fsa14: [''], fsa15: [''], fsa16: [''], fsa17: [''], fsa18: [''],
      fsa19: [''], fsa20: [''], fsa21: [''], fsa22: [''], fsa23: [''], fsa24: [''], fsa25: [''], fsa26: [''],
      fsa27: [''], fsa28: [''], fsa29: [''], fsa30: [''], fsa31: [''], fsa32: [''], fsa33: [''], fsa34: [''],
      fsa35: [''], fsa36: [''], fsa37: [''], fsa38: [''], fsa39: [''], fsa40: [''],
      // office_address_lat:[''],
      // office_address_lng:[''],
    });
  }
  get f() {
    return this.regisrtationForm.controls;
  }

  async getRequestById(param: any) {
    let data: any = await this.http.post(
      'getUserDetailsById/' + localStorage.getItem('userid') + '/' + param,
      {}
    );

    this.requestData = data['data'];
    this.regisrtationForm.patchValue({
      name:
        this.requestData[0]?.first_name + ' ' + (this.requestData[0]?.last_name != 'undefined' && this.requestData[0]?.last_name != undefined && this.requestData[0]?.last_name != null && this.requestData[0]?.last_name != 'null' ? this.requestData[0]?.last_name : ''),
      phone: this.requestData[0]?.mobile,
      brokerage_phone: this.requestData[0]?.brokerage_phone,
      email: this.requestData[0].email,
      phone_code: 1,

      // phone_code: this.requestData[0].country_code_id,
      // office_address:this.requestData[0].message,
      // office_address_lat:this.requestData[0].office_address_lat,
      // office_address_lng:this.requestData[0].office_address_lng,
      fsa1: this.requestData[0]?.fsa[0] == undefined ? '' : this.requestData[0]?.fsa[0]?.itemName,
      // fsa2: this.requestData[0]?.fsa[1] == undefined ? '' : this.requestData[0].fsa[1].itemName,
      // fsa3: this.requestData[0]?.fsa[2] == undefined ? '' : this.requestData[0].fsa[2].itemName,
      // fsa4: this.requestData[0]?.fsa[3] == undefined ? '' : this.requestData[0].fsa[3].itemName,
      // fsa5: this.requestData[0]?.fsa[4] == undefined ? '' : this.requestData[0].fsa[4].itemName,
      // fsa6: this.requestData[0]?.fsa[5] == undefined ? '' : this.requestData[0].fsa[5].itemName,
      // fsa7: this.requestData[0]?.fsa[6] == undefined ? '' : this.requestData[0].fsa[6].itemName,
      // fsa8: this.requestData[0]?.fsa[7] == undefined ? '' : this.requestData[0].fsa[7].itemName,
      // fsa9: this.requestData[0]?.fsa[8] == undefined ? '' : this.requestData[0].fsa[8].itemName,
      // fsa10: this.requestData[0]?.fsa[9] == undefined ? '' : this.requestData[0].fsa[9].itemName,
      // fsa11: this.requestData[0]?.fsa[10] == undefined ? '' : this.requestData[0].fsa[10].itemName,
      // fsa12: this.requestData[0]?.fsa[11] == undefined ? '' : this.requestData[0].fsa[11].itemName,
      // fsa13: this.requestData[0]?.fsa[12] == undefined ? '' : this.requestData[0].fsa[12].itemName,
      // fsa14: this.requestData[0]?.fsa[13] == undefined ? '' : this.requestData[0].fsa[13].itemName,
      // fsa15: this.requestData[0]?.fsa[14] == undefined ? '' : this.requestData[0].fsa[14].itemName,
      // fsa16: this.requestData[0]?.fsa[15] == undefined ? '' : this.requestData[0].fsa[15].itemName,
      // fsa17: this.requestData[0]?.fsa[16] == undefined ? '' : this.requestData[0].fsa[16].itemName,
      // fsa18: this.requestData[0]?.fsa[17] == undefined ? '' : this.requestData[0].fsa[17].itemName,
      // fsa19: this.requestData[0]?.fsa[18] == undefined ? '' : this.requestData[0].fsa[18].itemName,
      // fsa20: this.requestData[0]?.fsa[19] == undefined ? '' : this.requestData[0].fsa[19].itemName,
      // fsa21: this.requestData[0]?.fsa[20] == undefined ? '' : this.requestData[0].fsa[20].itemName,
      // fsa22: this.requestData[0]?.fsa[21] == undefined ? '' : this.requestData[0].fsa[21].itemName,
      // fsa23: this.requestData[0]?.fsa[22] == undefined ? '' : this.requestData[0].fsa[22].itemName,
      // fsa24: this.requestData[0]?.fsa[23] == undefined ? '' : this.requestData[0].fsa[23].itemName,
      // fsa25: this.requestData[0]?.fsa[24] == undefined ? '' : this.requestData[0].fsa[24].itemName,
      // fsa26: this.requestData[0]?.fsa[25] == undefined ? '' : this.requestData[0].fsa[25].itemName,
      // fsa27: this.requestData[0]?.fsa[26] == undefined ? '' : this.requestData[0].fsa[26].itemName,
      // fsa28: this.requestData[0]?.fsa[27] == undefined ? '' : this.requestData[0].fsa[27].itemName,
      // fsa29: this.requestData[0]?.fsa[28] == undefined ? '' : this.requestData[0].fsa[28].itemName,
      // fsa30: this.requestData[0]?.fsa[29] == undefined ? '' : this.requestData[0].fsa[29].itemName,
      // fsa31: this.requestData[0]?.fsa[30] == undefined ? '' : this.requestData[0].fsa[30].itemName,
      // fsa32: this.requestData[0]?.fsa[31] == undefined ? '' : this.requestData[0].fsa[31].itemName,
      // fsa33: this.requestData[0]?.fsa[32] == undefined ? '' : this.requestData[0].fsa[32].itemName,
      // fsa34: this.requestData[0]?.fsa[33] == undefined ? '' : this.requestData[0].fsa[33].itemName,
      // fsa35: this.requestData[0]?.fsa[34] == undefined ? '' : this.requestData[0].fsa[34].itemName,
      // fsa36: this.requestData[0]?.fsa[35] == undefined ? '' : this.requestData[0].fsa[35].itemName,
      // fsa37: this.requestData[0]?.fsa[36] == undefined ? '' : this.requestData[0].fsa[36].itemName,
      // fsa38: this.requestData[0]?.fsa[37] == undefined ? '' : this.requestData[0].fsa[37].itemName,
      // fsa39: this.requestData[0]?.fsa[38] == undefined ? '' : this.requestData[0].fsa[38].itemName,
      // fsa40: this.requestData[0]?.fsa[39] == undefined ? '' : this.requestData[0].fsa[39].itemName,
    });
    if (this.requestData[0]?.fsa[0]) (document.getElementById('n1') as HTMLInputElement).value = this.requestData[0].fsa[0].nieghborhood;
    // if (this.requestData[0]?.fsa[1]) (document.getElementById('n2') as HTMLInputElement).value = this.requestData[0].fsa[1].nieghborhood;
    // if (this.requestData[0]?.fsa[2]) (document.getElementById('n3') as HTMLInputElement).value = this.requestData[0].fsa[2].nieghborhood;
    // if (this.requestData[0]?.fsa[3]) (document.getElementById('n4') as HTMLInputElement).value = this.requestData[0].fsa[3].nieghborhood;
    // if (this.requestData[0]?.fsa[4]) (document.getElementById('n5') as HTMLInputElement).value = this.requestData[0].fsa[4].nieghborhood;
    // if (this.requestData[0]?.fsa[5]) (document.getElementById('n6') as HTMLInputElement).value = this.requestData[0].fsa[5].nieghborhood;
    // if (this.requestData[0]?.fsa[6]) (document.getElementById('n7') as HTMLInputElement).value = this.requestData[0].fsa[6].nieghborhood;
    // if (this.requestData[0]?.fsa[7]) (document.getElementById('n8') as HTMLInputElement).value = this.requestData[0].fsa[7].nieghborhood;
    // if (this.requestData[0]?.fsa[8]) (document.getElementById('n9') as HTMLInputElement).value = this.requestData[0].fsa[8].nieghborhood;
    // if (this.requestData[0]?.fsa[9]) (document.getElementById('n10') as HTMLInputElement).value = this.requestData[0].fsa[9].nieghborhood;
    // if (this.requestData[0]?.fsa[10]) (document.getElementById('n11') as HTMLInputElement).value = this.requestData[0].fsa[10].nieghborhood;
    // if (this.requestData[0]?.fsa[11]) (document.getElementById('n12') as HTMLInputElement).value = this.requestData[0].fsa[11].nieghborhood;
    // if (this.requestData[0]?.fsa[12]) (document.getElementById('n13') as HTMLInputElement).value = this.requestData[0].fsa[12].nieghborhood;
    // if (this.requestData[0]?.fsa[13]) (document.getElementById('n14') as HTMLInputElement).value = this.requestData[0].fsa[13].nieghborhood;
    // if (this.requestData[0]?.fsa[14]) (document.getElementById('n15') as HTMLInputElement).value = this.requestData[0].fsa[14].nieghborhood;
    // if (this.requestData[0]?.fsa[15]) (document.getElementById('n16') as HTMLInputElement).value = this.requestData[0].fsa[15].nieghborhood;
    // if (this.requestData[0]?.fsa[16]) (document.getElementById('n17') as HTMLInputElement).value = this.requestData[0].fsa[16].nieghborhood;
    // if (this.requestData[0]?.fsa[17]) (document.getElementById('n18') as HTMLInputElement).value = this.requestData[0].fsa[17].nieghborhood;
    // if (this.requestData[0]?.fsa[18]) (document.getElementById('n19') as HTMLInputElement).value = this.requestData[0].fsa[18].nieghborhood;
    // if (this.requestData[0]?.fsa[19]) (document.getElementById('n20') as HTMLInputElement).value = this.requestData[0].fsa[19].nieghborhood;
    // if (this.requestData[0]?.fsa[20]) (document.getElementById('n21') as HTMLInputElement).value = this.requestData[0].fsa[20].nieghborhood;
    // if (this.requestData[0]?.fsa[21]) (document.getElementById('n22') as HTMLInputElement).value = this.requestData[0].fsa[21].nieghborhood;
    // if (this.requestData[0]?.fsa[22]) (document.getElementById('n23') as HTMLInputElement).value = this.requestData[0].fsa[22].nieghborhood;
    // if (this.requestData[0]?.fsa[23]) (document.getElementById('n24') as HTMLInputElement).value = this.requestData[0].fsa[23].nieghborhood;
    // if (this.requestData[0]?.fsa[24]) (document.getElementById('n25') as HTMLInputElement).value = this.requestData[0].fsa[24].nieghborhood;
    // if (this.requestData[0]?.fsa[25]) (document.getElementById('n26') as HTMLInputElement).value = this.requestData[0].fsa[25].nieghborhood;
    // if (this.requestData[0]?.fsa[26]) (document.getElementById('n27') as HTMLInputElement).value = this.requestData[0].fsa[26].nieghborhood;
    // if (this.requestData[0]?.fsa[27]) (document.getElementById('n28') as HTMLInputElement).value = this.requestData[0].fsa[27].nieghborhood;
    // if (this.requestData[0]?.fsa[28]) (document.getElementById('n29') as HTMLInputElement).value = this.requestData[0].fsa[28].nieghborhood;
    // if (this.requestData[0]?.fsa[29]) (document.getElementById('n30') as HTMLInputElement).value = this.requestData[0].fsa[29].nieghborhood;
    // if (this.requestData[0]?.fsa[30]) (document.getElementById('n31') as HTMLInputElement).value = this.requestData[0].fsa[30].nieghborhood;
    // if (this.requestData[0]?.fsa[31]) (document.getElementById('n32') as HTMLInputElement).value = this.requestData[0].fsa[31].nieghborhood;
    // if (this.requestData[0]?.fsa[32]) (document.getElementById('n33') as HTMLInputElement).value = this.requestData[0].fsa[32].nieghborhood;
    // if (this.requestData[0]?.fsa[33]) (document.getElementById('n34') as HTMLInputElement).value = this.requestData[0].fsa[33].nieghborhood;
    // if (this.requestData[0]?.fsa[34]) (document.getElementById('n35') as HTMLInputElement).value = this.requestData[0].fsa[34].nieghborhood;
    // if (this.requestData[0]?.fsa[35]) (document.getElementById('n36') as HTMLInputElement).value = this.requestData[0].fsa[35].nieghborhood;
    // if (this.requestData[0]?.fsa[36]) (document.getElementById('n37') as HTMLInputElement).value = this.requestData[0].fsa[36].nieghborhood;
    // if (this.requestData[0]?.fsa[37]) (document.getElementById('n38') as HTMLInputElement).value = this.requestData[0].fsa[37].nieghborhood;
    // if (this.requestData[0]?.fsa[38]) (document.getElementById('n39') as HTMLInputElement).value = this.requestData[0].fsa[38].nieghborhood;
    // if (this.requestData[0]?.fsa[39]) (document.getElementById('n40') as HTMLInputElement).value = this.requestData[0].fsa[39].nieghborhood;


    // this.fsaData1 = this.requestData[0].fsa;
    // this.selectedFsa = this.requestData[0].fsa;
    // this.fsaResult = this.fsaData.map((e: any) => e.id)
    // this.selectedItems = this.requestData[0].fsa;
  }

  async getActiveFSA() {
    // let data:any = await  this.http.post('getActiveFSAStatus/',{})
    let data: any = await this.http.get(this.apiUrl.url.getActiveFsaWithAdderess);
    this.fsaData = data['data'];
    this.ref.detectChanges();
  }


  getPhoneCodeData: any;
  async getPhoneCode() {
    let data: any = await this.http.get('getCountryCode');
    this.getPhoneCodeData = data['data'];
  }
  // async selectFSAReq(event: any, fsa_id: any) {
  //   if (event.target.checked == true) {
  //     this.fsaResult.push(fsa_id);
  //   } else {
  //     this.fsaResult.splice(this.fsaResult.indexOf(fsa_id), 1);
  //   }
  //   console.log(this.fsaResult);
  // }

  // findInvalidControls() {
  //   const invalid = [];
  //   const controls = this.regisrtationForm.controls;
  //   for (const name in controls) {
  //   if (controls[name].invalid) {
  //   invalid.push(name);
  //   // console.log(name,'name')
  //   console.log(invalid,'invalid')
  //   }
  //   }
  //   return invalid;
  //   }
  result

  async submitRequest() {
   
    this.result = await this.http.post(this.apiUrl.url.getFsaCodeAndNeighborhood, { fsa_code:this.regisrtationForm.value.fsa1,fsaArr:this.regisrtationForm.value.fsa1,isLoaderShow: false });

   if(this.result.status == false){
this.fsaDisable = false
     this.toastr.warning("FSA is inactive!, please choose another FSA", '',{ timeOut: 2000 });
     return
   }


    this.param = this.param.split("/")[0];
    this.submitted = true;
   
    if (this.regisrtationForm.invalid) {
      return;
    }

 

    this.regisrtationForm.value.message =
      this.regisrtationForm.value.office_address;
    // delete this.regisrtationForm.value.office_address;
    // this.regisrtationForm.value.office_address_lat = this.common.mainAddress.latitude;
    // this.regisrtationForm.value.office_address_lng = this.common.mainAddress.longitude
    // this.regisrtationForm.value.fsa = this.fsaResult.toString();
    // this.regisrtationForm.value.fsa = this.regisrtationForm.value.fsa.toString();

    this.regisrtationForm.value.user_id = localStorage.getItem('userid');
    this.regisrtationForm.value.agent_id = this.param;
    this.regisrtationForm.value.email = this.regisrtationForm.value.email;
    this.regisrtationForm.value.phone = this.regisrtationForm.value.phone;
    this.regisrtationForm.value.verifyMobile = this.showVerifyPhoneBtn ? 0 : 1;
    this.regisrtationForm.value.verifyEmail = this.showVerifyEmailBtn ? 0 : 1;
    // if (this.regisrtationForm.value.fsa.length > 20) {
    //   return this.toastr.warning('You can select only 20 FSA.')
    // }
    // this.regisrtationForm.value.phone_code = this.regisrtationForm.value.phone_code;]


    let arr = [];
    if (this.regisrtationForm.value.fsa1) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa1.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa2) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa2.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa3) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa3.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa4) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa4.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa5) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa5.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa6) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa6.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa7) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa7.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa8) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa8.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa9) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa9.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa10) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa10.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa11) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa11.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa12) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa12.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa13) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa13.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa14) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa14.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa15) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa15.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa16) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa16.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa17) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa17.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa18) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa18.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa19) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa19.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa20) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa20.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa21) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa21.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa22) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa22.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa23) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa23.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa24) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa24.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa25) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa25.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa26) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa26.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa27) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa27.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa28) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa28.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa29) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa29.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa30) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa30.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa31) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa31.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa32) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa32.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa33) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa33.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa34) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa34.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa35) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa35.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa36) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa36.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa37) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa37.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa38) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa38.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa39) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa39.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    // if (this.regisrtationForm.value.fsa40) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.regisrtationForm.value.fsa40.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (
      (this.showVerifyPhoneBtn === false && this.showVerifyEmailBtn === true) ||
      (this.showVerifyPhoneBtn === true && this.showVerifyEmailBtn === false) ||
      (this.showVerifyPhoneBtn === false && this.showVerifyEmailBtn === false)
    ) {
      let data = {
        name: this.regisrtationForm.value.name,
        estate_brokeraege: this.regisrtationForm.value.estate_brokeraege,
        phone: this.regisrtationForm.value.phone,
        phone_code: this.regisrtationForm.value.phone_code,
        verifyMobile: this.regisrtationForm.value.verifyMobile,
        verifyEmail: this.regisrtationForm.value.verifyEmail,
        fsa: arr,
        message: this.regisrtationForm.value.message,
        user_id: localStorage.getItem('userid'),
        agent_id: this.param,
        email: this.regisrtationForm.value.email
      }
      let result: any = await this.http.post(
        'createRequestForSubagent',
        data
      );
      if (result['status'] == true) {
        this.toastr.success(result['msg'], '', { timeOut: 2000 });
        this.router.navigate(['/home']);
      } else this.toastr.error(result['msg'], '', { timeOut: 2000 });
    } else {
      this.toastr.warning('Please Verify Email or Phone No');
    }
  }
  async openMobileNoPhpup(content: any) {
    if (this.regisrtationForm.value.phone_code == '') {
      this.toastr.warning('Please select country code');
    } else {
      let data: any = await this.http.post('verifyPhoneNo', {
        user_id: localStorage.getItem('userid'),
        phone: this.regisrtationForm.value.phone,
        phone_code: this.regisrtationForm.value.phone_code,
        // phone_code: 91,
      });
      if (data['data'].length > 0) {
        this.toastr.success(data['msg']);
        this.mobileVerify.patchValue({ vefifyotp: data['data'][0].otp });
        this.phoneNoModel = this.modalService.open(content, {
          backdrop: 'static',
          keyboard: false,
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
        });
      } else {
        this.toastr.warning(data['msg']);
      }
    }
  }
  phoneSubmit = false;
  async verifyMobile() {
    this.phoneSubmit = true;
    if (this.mobileVerify.value.phoneotp != '') {
      if (
        this.mobileVerify.value.phoneotp == this.mobileVerify.value.vefifyotp
      ) {
        this.toastr.success('Phone No Verified Successfully.');
        this.showVerifyPhoneBtn = false;
        this.phoneNoModel.close();
        // this.regisrtationForm.controls['phone'].disable();
        this.mobileVerify.reset();
      } else {
        this.toastr.warning('Invalid Otp.');
      }
    }
  }
  EmailModel: any;
  async openEmailPopup(content: any) {
    let data: any = await this.http.post('verifyEmail', {
      user_id: localStorage.getItem('userid'),
      email: this.regisrtationForm.value.email,
    });
    if (data['data'].length > 0) {
      this.toastr.success(data['msg']);
      this.mobileVerify.patchValue({ vefifyotp: data['data'][0].otp });
      this.EmailModel = this.modalService.open(content, {
        backdrop: 'static',
        keyboard: false,
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      });
    } else {
      this.toastr.warning(data['msg']);
    }
  }
  onItemSelect(item: any) {
    console.log(item, '-----------')
    this.regisrtationForm.value.fsa = this.selectedItems;
  }
  OnItemDeSelect(item: any) {
    // this.regisrtationForm.value.fsa = item;
    this.regisrtationForm.value.fsa = this.selectedItems;
  }
  onSelectAll(items: any) {
    this.regisrtationForm.value.fsa = items;
  }
  onDeSelectAll(items: any) {
    this.regisrtationForm.value.fsa = items;
  }
  EmailSubmit = false;
  async verifyEmail() {
    this.EmailSubmit = true;
    if (this.mobileVerify.value.email != '') {
      if (
        this.mobileVerify.value.phoneotp == this.mobileVerify.value.vefifyotp
      ) {
        this.toastr.success('Email Verified Successfully.');
        this.showVerifyEmailBtn = false;
        this.EmailModel.close();
        // this.regisrtationForm.controls['email'].disable();
        this.mobileVerify.reset();
      } else {
        this.toastr.warning('Invalid Otp.');
      }
    }
  }
  modal_dismiss() {
    this.EmailModel.close();
    this.mobileVerify.reset();
  }

  modal_dismiss1(){
    this.phoneNoModel.close();
    this.mobileVerify.reset();
  }


}
