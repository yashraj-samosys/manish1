import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CommonService } from "src/app/services/common.service";
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';
import { ValidationsService } from 'src/app/services/validations.service';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrlService } from "src/app/services/apiUrl.service";
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';
import { validationscnfg } from '../validations/validation';

@Component({
  selector: 'app-subagent-account-request',
  templateUrl: './subagent-account-request.component.html',
  styleUrls: ['./subagent-account-request.component.css']
})
export class SubagentAccountRequestComponent implements OnInit {

  id;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  str;
  str1;
  len;
  len1;
  newstr;
  newstr1;
  requestData: any;
  regisrtationForm: any;
  submitted = false;
  latitude: any = '';
  longitude: any = '';
  geoError = '';
  fsaResult: any = [];
  data: any;
  showHidePass = true;
  showHidePass1 = true;
  btn_nature = false;
  showConfirm;
  getFSAIdAndData;
  showMyImg: any = null;
  validations_cnfg = validationscnfg


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

  FSA_ARR2 = [{ fsa1: '' }, { fsa2: '' }, { fsa3: '' }, { fsa4: '' }, { fsa5: '' }, { fsa6: '' }, { fsa7: '' }, { fsa8: '' }, { fsa9: '' }, { fsa11: '' }, { fsa10: '' }, { fsa12: '' }, { fsa13: '' }, { fsa14: '' }, { fsa15: '' }, { fsa16: '' }, { fsa17: '' }, { fsa18: '' }, { fsa19: '' }, { fsa20: '' }, { fsa21: '' }, { fsa22: '' }, { fsa23: '' }, { fsa24: '' }, { fsa25: '' }, { fsa26: '' }, { fsa27: '' }, { fsa28: '' }, { fsa29: '' }, { fsa30: '' }, { fsa31: '' }, { fsa32: '' }, { fsa33: '' }, { fsa34: '' }, { fsa35: '' }, { fsa36: '' }, { fsa37: '' }, { fsa38: '' }, { fsa39: '' }, { fsa40: '' }];
  fsa_id = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n11", "n10", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"];
  FSA_ARR = ["fsa1", "fsa2", "fsa3", "fsa4", "fsa5", "fsa6", "fsa7", "fsa8", "fsa9", "fsa11", "fsa10", "fsa12", "fsa13", "fsa14", "fsa15", "fsa16", "fsa17", "fsa18", "fsa19", "fsa20", "fsa21", "fsa22", "fsa23", "fsa24", "fsa25", "fsa26", "fsa27", "fsa28", "fsa29", "fsa30", "fsa31", "fsa32", "fsa33", "fsa34", "fsa35", "fsa36", "fsa37", "fsa38", "fsa39", "fsa40"]
  search = "";
  getfsaCode;
  isEnabled: boolean;

  constructor(private auth: AuthService,
    private _router: Router,
    public common: CommonService,
    private http: HttpService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private imageCropper: ImageCropperModule,
    private translate: TranslateService,
    private validation: ValidationsService,
    private ref: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private apiURL: ApiUrlService,
    private formBuilder: FormBuilder) {
    this.data = {};
  }

  async ngOnInit() {
    // if (localStorage.getItem('type') != '3' && '2') {
    //   this._router.navigate(['/login']);
    // }
    var param = localStorage.getItem('userid');
    this.id = param;
    this.VefifyAccount(param);
    this.getActiveFSA();
    this.getActiveFSAIdAndData();
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select FSA",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.createForm();
    let result: any = await this.http.post('getLastId', {});
    this.regisrtationForm.patchValue({ account_number: this.generateAccountNumber(result['data'][0].lastId) });

  }
  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);
  }


  fsaData: any = [];
  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    this.ref.detectChanges();
  }

  generateAccountNumber(n: any) {
    let string = "" + n;
    let pad = "000000";
    n = new Date().getFullYear() + pad.substring(0, pad.length - string.length) + string;
    return n;
  }
  createForm() {
    this.regisrtationForm = this.formBuilder.group({
      name: ['', this.validation.removeSpace], // disabled
      phone: ['', [Validators.required, Validators.minLength(8), Validators.minLength(15)]],// disabled
      text_no: ['', this.validation.textno],//-----
      email: ['', this.validation.email],
      estate_brokeraege: ['', this.validation.fullname],
      brokeraege_street_address: ['', this.validation.address],
      brokeraege_city: ['', this.validation.city_country],
      brokeraege_province: ['', this.validation.city_country],
      brokeraege_postal_code: ['', this.validation.postal],
      brokerage_phone: ['', this.validation.mobile],
      password: ['', this.validation.password],
      cpassword: ['', this.validation.city_country],
      office_address_lat: [''],
      office_address_lng: [''],
      shortBio: ['', this.validation.shortbio],
      longBio: ['',this.validation.longbio],
      website: ['', this.validation.website],
      accept1: ['', Validators.required],
      accept2: ['', Validators.required],
      fsa1: ['', this.validation.fsacode],
      fsa2: ['',this.validation.fsacodeforall], fsa3: ['',this.validation.fsacodeforall], fsa4: ['',this.validation.fsacodeforall], fsa5: ['',this.validation.fsacodeforall], fsa6: ['',this.validation.fsacodeforall], fsa7: ['',this.validation.fsacodeforall], fsa8: ['',this.validation.fsacodeforall], fsa9: ['',this.validation.fsacodeforall], fsa11: ['',this.validation.fsacodeforall],
      fsa10: ['',this.validation.fsacodeforall], fsa12: ['',this.validation.fsacodeforall], fsa13: ['',this.validation.fsacodeforall], fsa14: ['',this.validation.fsacodeforall], fsa15: ['',this.validation.fsacodeforall], fsa16: ['',this.validation.fsacodeforall], fsa17: ['',this.validation.fsacodeforall], fsa18: ['',this.validation.fsacodeforall],
      fsa19: ['',this.validation.fsacodeforall], fsa20: ['',this.validation.fsacodeforall], fsa21: ['',this.validation.fsacodeforall], fsa22: ['',this.validation.fsacodeforall], fsa23: ['',this.validation.fsacodeforall], fsa24: ['',this.validation.fsacodeforall], fsa25: ['',this.validation.fsacodeforall], fsa26: ['',this.validation.fsacodeforall],
      fsa27: ['',this.validation.fsacodeforall], fsa28: ['',this.validation.fsacodeforall], fsa29: ['',this.validation.fsacodeforall], fsa30: ['',this.validation.fsacodeforall], fsa31: ['',this.validation.fsacodeforall], fsa32: ['',this.validation.fsacodeforall], fsa33: ['',this.validation.fsacodeforall], fsa34: ['',this.validation.fsacodeforall],
      fsa35: ['',this.validation.fsacodeforall], fsa36: ['',this.validation.fsacodeforall], fsa37: ['',this.validation.fsacodeforall], fsa38: ['',this.validation.fsacodeforall], fsa39: ['',this.validation.fsacodeforall], fsa40: ['',this.validation.fsacodeforall],
      facebook: [''],
      whatsapp: [''],
      messenger: [''],
      wechat: [''],
    }, {
      validator: MustMatch('password', 'cpassword')
    });
  }
  get f() { return this.regisrtationForm.controls; }

  requestDataa: any;
  async VefifyAccount(param: any) {
    let data: any = await this.http.post('getUserDataForPayment/' + param, {});
    if (data.status) {
      this.requestData = data['data'][0];
      this.croppedImage = this.requestData.profile_img;
      console.log(this.requestData)
      this.regisrtationForm.patchValue({

        id: this.requestData?.id,
        name: `${this.requestData?.first_name}${this.requestData?.last_name != 'undefined' && this.requestData?.last_name != null && this.requestData?.last_name != 'null' && this.requestData?.last_name != '' ? this.requestData?.last_name : ''}`,
        phone: this.requestData?.mobile,
        text_no: this.requestData?.textNo != (null || 'undefined') ? this.requestData?.textNo : '',
        email: this.requestData?.email,
        estate_brokeraege: this.requestData?.brokerageName == 'undefined' ? '' : this.requestData?.brokerageName,
        brokeraege_street_address: this.requestData?.BrokerageStreetAddress == "undefined" ? "" : this.requestData?.BrokerageStreetAddress,
        brokeraege_city: this.requestData?.BrokerageCity,
        brokeraege_province: this.requestData?.BrokerageProvince,
        brokeraege_postal_code: this.requestData?.BrokeragePostalCode,
        brokerage_phone: this.requestData?.brokerPhoneNo,
        website: this.requestData?.website,
        shortBio: this.requestData?.shortBio,
        longBio: this.requestData.bio != 'null' ? this.requestData.bio : '',
        password: this.requestData?.password,
        cpassword: this.requestData?.password,
        facebook: this.requestData?.facebook != (null || 'null') ? this.requestData?.facebook : '',
        whatsapp: this.requestData?.whatsapp != (null || 'null') ? this.requestData?.whatsapp : '',
        messenger: this.requestData?.messenger != (null || 'null') ? this.requestData?.messenger : '',
        wechat: this.requestData?.wechat != (null || 'null') ? this.requestData?.wechat : '',

        fsa1: this.requestData?.FSAData[0] == undefined ? '' : this.requestData?.FSAData[0].fsa_code,
        fsa2: this.requestData?.FSAData[1] == undefined ? '' : this.requestData?.FSAData[1].fsa_code,
        fsa3: this.requestData?.FSAData[2] == undefined ? '' : this.requestData?.FSAData[2].fsa_code,
        fsa4: this.requestData?.FSAData[3] == undefined ? '' : this.requestData?.FSAData[3].fsa_code,
        fsa5: this.requestData?.FSAData[4] == undefined ? '' : this.requestData?.FSAData[4].fsa_code,
        fsa6: this.requestData?.FSAData[5] == undefined ? '' : this.requestData?.FSAData[5].fsa_code,
        fsa7: this.requestData?.FSAData[6] == undefined ? '' : this.requestData?.FSAData[6].fsa_code,
        fsa8: this.requestData?.FSAData[7] == undefined ? '' : this.requestData?.FSAData[7].fsa_code,
        fsa9: this.requestData?.FSAData[8] == undefined ? '' : this.requestData?.FSAData[8].fsa_code,
        fsa10: this.requestData?.FSAData[9] == undefined ? '' : this.requestData?.FSAData[9].fsa_code,
        fsa11: this.requestData?.FSAData[10] == undefined ? '' : this.requestData?.FSAData[10].fsa_code,
        fsa12: this.requestData?.FSAData[11] == undefined ? '' : this.requestData?.FSAData[11].fsa_code,
        fsa13: this.requestData?.FSAData[12] == undefined ? '' : this.requestData?.FSAData[12].fsa_code,
        fsa14: this.requestData?.FSAData[13] == undefined ? '' : this.requestData?.FSAData[13].fsa_code,
        fsa15: this.requestData?.FSAData[14] == undefined ? '' : this.requestData?.FSAData[14].fsa_code,
        fsa16: this.requestData?.FSAData[15] == undefined ? '' : this.requestData?.FSAData[15].fsa_code,
        fsa17: this.requestData?.FSAData[16] == undefined ? '' : this.requestData?.FSAData[16].fsa_code,
        fsa18: this.requestData?.FSAData[17] == undefined ? '' : this.requestData?.FSAData[17].fsa_code,
        fsa19: this.requestData?.FSAData[18] == undefined ? '' : this.requestData?.FSAData[18].fsa_code,
        fsa20: this.requestData?.FSAData[19] == undefined ? '' : this.requestData?.FSAData[19].fsa_code,
        fsa21: this.requestData?.FSAData[20] == undefined ? '' : this.requestData?.FSAData[20].fsa_code,
        fsa22: this.requestData?.FSAData[21] == undefined ? '' : this.requestData?.FSAData[21].fsa_code,
        fsa23: this.requestData?.FSAData[22] == undefined ? '' : this.requestData?.FSAData[22].fsa_code,
        fsa24: this.requestData?.FSAData[23] == undefined ? '' : this.requestData?.FSAData[23].fsa_code,
        fsa25: this.requestData?.FSAData[24] == undefined ? '' : this.requestData?.FSAData[24].fsa_code,
        fsa26: this.requestData?.FSAData[25] == undefined ? '' : this.requestData?.FSAData[25].fsa_code,
        fsa27: this.requestData?.FSAData[26] == undefined ? '' : this.requestData?.FSAData[26].fsa_code,
        fsa28: this.requestData?.FSAData[27] == undefined ? '' : this.requestData?.FSAData[27].fsa_code,
        fsa29: this.requestData?.FSAData[28] == undefined ? '' : this.requestData?.FSAData[28].fsa_code,
        fsa30: this.requestData?.FSAData[29] == undefined ? '' : this.requestData?.FSAData[29].fsa_code,
        fsa31: this.requestData?.FSAData[30] == undefined ? '' : this.requestData?.FSAData[30].fsa_code,
        fsa32: this.requestData?.FSAData[31] == undefined ? '' : this.requestData?.FSAData[31].fsa_code,
        fsa33: this.requestData?.FSAData[32] == undefined ? '' : this.requestData?.FSAData[32].fsa_code,
        fsa34: this.requestData?.FSAData[33] == undefined ? '' : this.requestData?.FSAData[33].fsa_code,
        fsa35: this.requestData?.FSAData[34] == undefined ? '' : this.requestData?.FSAData[34].fsa_code,
        fsa36: this.requestData?.FSAData[35] == undefined ? '' : this.requestData?.FSAData[35].fsa_code,
        fsa37: this.requestData?.FSAData[36] == undefined ? '' : this.requestData?.FSAData[36].fsa_code,
        fsa38: this.requestData?.FSAData[37] == undefined ? '' : this.requestData?.FSAData[37].fsa_code,
        fsa39: this.requestData?.FSAData[38] == undefined ? '' : this.requestData?.FSAData[38].fsa_code,
        fsa40: this.requestData?.FSAData[39] == undefined ? '' : this.requestData?.FSAData[39].fsa_code,

      })
      this.dataImg = this.requestData?.profile_img;
      this.showMyImg = this.requestData?.profile_img;

      if (this.requestData?.FSAData[0]) (document.getElementById('n1') as HTMLInputElement).value = this.requestData.FSAData[0].address;
      if (this.requestData?.FSAData[1]) (document.getElementById('n2') as HTMLInputElement).value = this.requestData.FSAData[1].address;
      if (this.requestData?.FSAData[2]) (document.getElementById('n3') as HTMLInputElement).value = this.requestData.FSAData[2].address;
      if (this.requestData?.FSAData[3]) (document.getElementById('n4') as HTMLInputElement).value = this.requestData.FSAData[3].address;
      if (this.requestData?.FSAData[4]) (document.getElementById('n5') as HTMLInputElement).value = this.requestData.FSAData[4].address;
      if (this.requestData?.FSAData[5]) (document.getElementById('n6') as HTMLInputElement).value = this.requestData.FSAData[5].address;
      if (this.requestData?.FSAData[6]) (document.getElementById('n7') as HTMLInputElement).value = this.requestData.FSAData[6].address;
      if (this.requestData?.FSAData[7]) (document.getElementById('n8') as HTMLInputElement).value = this.requestData.FSAData[7].address;
      if (this.requestData?.FSAData[8]) (document.getElementById('n9') as HTMLInputElement).value = this.requestData.FSAData[8].address;
      if (this.requestData?.FSAData[9]) (document.getElementById('n10') as HTMLInputElement).value = this.requestData.FSAData[9].address;
      if (this.requestData?.FSAData[10]) (document.getElementById('n11') as HTMLInputElement).value = this.requestData.FSAData[10].address;
      if (this.requestData?.FSAData[11]) (document.getElementById('n12') as HTMLInputElement).value = this.requestData.FSAData[11].address;
      if (this.requestData?.FSAData[12]) (document.getElementById('n13') as HTMLInputElement).value = this.requestData.FSAData[12].address;
      if (this.requestData?.FSAData[13]) (document.getElementById('n14') as HTMLInputElement).value = this.requestData.FSAData[13].address;
      if (this.requestData?.FSAData[14]) (document.getElementById('n15') as HTMLInputElement).value = this.requestData.FSAData[14].address;
      if (this.requestData?.FSAData[15]) (document.getElementById('n16') as HTMLInputElement).value = this.requestData.FSAData[15].address;
      if (this.requestData?.FSAData[16]) (document.getElementById('n17') as HTMLInputElement).value = this.requestData.FSAData[16].address;
      if (this.requestData?.FSAData[17]) (document.getElementById('n18') as HTMLInputElement).value = this.requestData.FSAData[17].address;
      if (this.requestData?.FSAData[18]) (document.getElementById('n19') as HTMLInputElement).value = this.requestData.FSAData[18].address;
      if (this.requestData?.FSAData[19]) (document.getElementById('n20') as HTMLInputElement).value = this.requestData.FSAData[19].address;
      if (this.requestData?.FSAData[20]) (document.getElementById('n21') as HTMLInputElement).value = this.requestData.FSAData[20].address;
      if (this.requestData?.FSAData[21]) (document.getElementById('n22') as HTMLInputElement).value = this.requestData.FSAData[21].address;
      if (this.requestData?.FSAData[22]) (document.getElementById('n23') as HTMLInputElement).value = this.requestData.FSAData[22].address;
      if (this.requestData?.FSAData[23]) (document.getElementById('n24') as HTMLInputElement).value = this.requestData.FSAData[23].address;
      if (this.requestData?.FSAData[24]) (document.getElementById('n25') as HTMLInputElement).value = this.requestData.FSAData[24].address;
      if (this.requestData?.FSAData[25]) (document.getElementById('n26') as HTMLInputElement).value = this.requestData.FSAData[25].address;
      if (this.requestData?.FSAData[26]) (document.getElementById('n27') as HTMLInputElement).value = this.requestData.FSAData[26].address;
      if (this.requestData?.FSAData[27]) (document.getElementById('n28') as HTMLInputElement).value = this.requestData.FSAData[27].address;
      if (this.requestData?.FSAData[28]) (document.getElementById('n29') as HTMLInputElement).value = this.requestData.FSAData[28].address;
      if (this.requestData?.FSAData[29]) (document.getElementById('n30') as HTMLInputElement).value = this.requestData.FSAData[29].address;
      if (this.requestData?.FSAData[30]) (document.getElementById('n31') as HTMLInputElement).value = this.requestData.FSAData[30].address;
      if (this.requestData?.FSAData[31]) (document.getElementById('n32') as HTMLInputElement).value = this.requestData.FSAData[31].address;
      if (this.requestData?.FSAData[32]) (document.getElementById('n33') as HTMLInputElement).value = this.requestData.FSAData[32].address;
      if (this.requestData?.FSAData[33]) (document.getElementById('n34') as HTMLInputElement).value = this.requestData.FSAData[33].address;
      if (this.requestData?.FSAData[34]) (document.getElementById('n35') as HTMLInputElement).value = this.requestData.FSAData[34].address;
      if (this.requestData?.FSAData[35]) (document.getElementById('n36') as HTMLInputElement).value = this.requestData.FSAData[35].address;
      if (this.requestData?.FSAData[36]) (document.getElementById('n37') as HTMLInputElement).value = this.requestData.FSAData[36].address;
      if (this.requestData?.FSAData[37]) (document.getElementById('n38') as HTMLInputElement).value = this.requestData.FSAData[37].address;
      if (this.requestData?.FSAData[38]) (document.getElementById('n39') as HTMLInputElement).value = this.requestData.FSAData[38].address;
      if (this.requestData?.FSAData[39]) (document.getElementById('n40') as HTMLInputElement).value = this.requestData.FSAData[39].address;

      // this.fsaResult.push(this.requestData.fsa);
      this.regisrtationForm.controls['name'].disable();
      this.regisrtationForm.controls['phone'].disable();
      this.regisrtationForm.controls['email'].disable();
    }
  }

  async selectFSAReq(event: any, fsa_id: any) {
    if (event.target.checked == true) {
      this.fsaResult.push(fsa_id);
    } else {
      this.fsaResult.splice(this.fsaResult.indexOf(fsa_id), 1);
    }
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
  dataImg: any = null;
  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
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
          this.dataImg = ''; this.croppedImage = ''; this.imageChangedEvent = '';
           this.croppedImage = this.showMyImg; 
        }else{
          this.dataImg = ''; this.croppedImage = ''; this.imageChangedEvent = '';
          if(reason == 0){ this.croppedImage = this.showMyImg } 
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


  async onLogin() {
    let fsa_data = [];
    if (this.regisrtationForm.value.fsa?.length > 0) {
      fsa_data = this.regisrtationForm.value.fsa;
      fsa_data = fsa_data.map((x: { id: any; }) => x.id);
    }
    this.regisrtationForm.value.email = this.requestData?.email;
    this.regisrtationForm.value.mobile = this.requestData?.mobile;
    this.regisrtationForm.value.name = this.requestData?.first_name + ' ' + this.requestData?.last_name;

    this.submitted = true;
    // if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0 || !this.dataImg) {return; }
    // if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0) { return; }

    // let res = [];
    // this.str = this.regisrtationForm.value.shortBio.replace(/[\t\n\r\.\?\!]/gm, "").split("");
    // this.str.map((s) => {
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



    let charLen = this.str1.length;
    let res1 = [];
    this.str1 = this.regisrtationForm.value.longBio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str1?.map((s) => {
      let trimStr1 = s.trim();
      if (trimStr1.length > 0) {
        res1.push(trimStr1);
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
        //  if(this.len1 > 2000)this.toastr.warning("Long Bio is too large!", "", { timeOut: 2000 });
      
      
    }


    // let res1 = [];
    // this.str1 = this.regisrtationForm.value.longBio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    // this.str1?.map((s) => {
    //   let trimStr1 = s?.trim();
    //   if (trimStr1?.length > 0) {
    //     res1.push(trimStr1);
    //   }
    // });
    // this.len1 = res1?.length;
    // if(this.str1 > 0){
    //   if ( this.len1 < 21)this.toastr.warning("Long Bio should be greater than 20 words", "", { timeOut: 2000 });
    //   else if (this.len1 >200) this.toastr.warning("Long Bio should not be more then 200 words", "", { timeOut: 2000 });
    //     return;
      
    // }

    if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0) { return; }




    const formData: any = new FormData();
    formData.append("first_name", this.regisrtationForm.value.name.split(' ')[0]);
    formData.append("last_name", this.regisrtationForm.value.name?.split(' ')[1]);
    formData.append("email", this.regisrtationForm.value.email);
    formData.append("id", this.id);
    formData.append("password", this.regisrtationForm.value.password);
    formData.append("profile_img", this.dataImg);
    formData.append("address", this.common.mainAddress.address);
    formData.append("latitude", this.common.mainAddress.latitude);
    formData.append("longitude", this.common.mainAddress.longitude);
    formData.append("mobile", this.regisrtationForm.value.mobile);
    formData.append("shownOnMap", 'Yes');
    formData.append("textNo", this.regisrtationForm.value.text_no);
    formData.append("shortBio", this.regisrtationForm.value.shortBio);
    formData.append("bio", this.regisrtationForm.value.longBio);
    formData.append("officeName", this.regisrtationForm.value.officeName);
    formData.append('website', this.regisrtationForm.value.website)
    formData.append("brokerage_phone", this.regisrtationForm.value.brokerage_phone);
    formData.append("brokerageName", this.regisrtationForm.value.estate_brokeraege);

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

    let result: any = await this.http.Post('makePayment/' + this.id, formData);
    if (result["status"] == true) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
      // this.auth.sendToken(result['data'],true)
      Swal.fire({
        text: "You will be redirect to Payment description page ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.href = environment.PaymentUrl + this.id;
          this.onechange1();
          this.submitted = false;

        } else {
          Swal.fire({
            title: 'Are you sure you want to cancel payment?',
            text: 'If you cancel payment then your account will automatically be converted to a realtor account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this._router.navigate(["/home"]);
              // window.location.href = environment.PaymentUrl + this.id;
            }
          })
        }
      })
    } else{
      if(result["status"] == false) this.toastr.error(result["msg"], '', { timeOut: 2000 });
      else{ this.toastr.warning(result["msg"], '', { timeOut: 2000 }); }
    } 
  }


  onItemSelect(item: any) {
    this.regisrtationForm.value.fsa = this.selectedItems;
  }
  OnItemDeSelect(item: any) {
    this.regisrtationForm.value.fsa = this.selectedItems;
  }
  onSelectAll(items: any) {
    this.regisrtationForm.value.fsa = items;
  }
  onDeSelectAll(items: any) {
    this.regisrtationForm.value.fsa = items;
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true
  }
  showHidePassword1() {
    if (this.showHidePass1) this.showHidePass1 = false;
    else this.showHidePass1 = true
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
      if (fsaCodeLength == 3)  {
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
  Delete(dsf) {

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

  async getActiveFSAIdAndData() {
    let data: any = await this.http.post('getActiveFSAIdAndData/', {})
    this.getFSAIdAndData = data['data'];
  }

  onchange() {
    if (!this.regisrtationForm.value.accept1) this.f.accept1.reset();
    if (!this.regisrtationForm.value.accept2) this.f.accept2.reset();
  }
onechange1(){
  if (this.regisrtationForm.value.accept1) this.f.accept1.reset();
  if (this.regisrtationForm.value.accept2) this.f.accept2.reset();

}

}