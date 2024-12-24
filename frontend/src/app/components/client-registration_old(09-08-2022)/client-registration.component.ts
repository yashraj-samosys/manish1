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
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit {
  imageChangedEvent: any = '';
  str;
  newstr;
  newstr1;
  str1;
  len;
  len1;
  Count;
  maxl;
  croppedImage: any = '';
  emailData;

  requestData: any;
  clientRegistrationForm: any;
  requestDataa: any;
  submitted = false;
  latitude: any = '';
  longitude: any = '';
  fsaResult: any = [];
  showHidePass = true;
  showHidePass1 = true;
  @ViewChild('addressSearch', { static: false }) addressSearch: any;
  settings = { singleSelection: false, text: "Select FSA", selectAllText: 'Select All', unSelectAllText: 'UnSelect All', enableSearchFilter: true, classes: "myclass custom-class" };
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    public common: CommonService,
    private http: HttpService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private validation: ValidationsService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private imageCropper: ImageCropperModule,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.emailData = this.route.snapshot.queryParams.email;
    

    var param = localStorage.getItem('userid');
    console.log(param, 'params')
    this.createForm();
    this.VefifyAccount(param);
    this.getActiveFSA();
    this.dropdownSettings = {
      singleSelection: false,
      text: "Choose up to  20 FSA ( Postal Code) areas serve",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    this.clientRegistrationForm.patchValue({
      email: this.emailData
    })


    let result: any = await this.http.post('getLastId', {});
    this.clientRegistrationForm.patchValue({ account_number: this.generateAccountNumber(result['data'][0].lastId) });
  }

  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);
  }

  image: any = null;


  generateAccountNumber(n: any) {
    let string = "" + n;
    let pad = "000000";
    n = new Date().getFullYear() + pad.substring(0, pad.length - string.length) + string;
    return n;
  }

  fsaData: any = [];
  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    this.ref.detectChanges();
  }


  async selectFSAReq(event: any, fsa_id: any) {
    if (event.target.checked == true) { this.fsaResult.push(fsa_id); }
    else { this.fsaResult.splice(this.fsaResult.indexOf(fsa_id), 1) }
  }

  createForm() {
    this.clientRegistrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      // name: ['', this.validation.removeSpace],
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(9)]],
      officeName: ['', Validators.required],
      brokerage_phone: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
      text_line: ['', this.validation.required],
      website: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      // image: ['', Validators.required],
      office_address: ['', this.validation.required],
      office_address_lat: [''],
      office_address_lng: [''],
      fsa: ['', Validators.required],
      facebook: [''],
      whatsapp: [''],
      messenger: [''],
      wechat: [''],
      // shortBio: ['', this.validation.removeSpace],
      shortBio: ['', Validators.required],
      // account_number: [''],
      // longBio: ['', this.validation.removeSpace],
      longBio: ['', Validators.required],
      accept1: ['', Validators.required],
      accept2: ['', Validators.required],
      id: [''],
      req_id: [''],
      agent_id: [''],


    }, { validator: MustMatch('password', 'cpassword') });
  }
  get f() { return this.clientRegistrationForm.controls; }

  async VefifyAccount(param: any) {
    console.log("===datam", param)
    let data: any = await this.http.post('getUserDataForPayment/' + param, {});
    console.log(data, 'dataaaaaaaaaa')
    if (data.status) {
      this.requestData = data['data'][0];
      this.requestData = data['data'];


    }
  }


  // onkeyup($event) {
  //   let str2 = $event.target.value;
  //   let Count2 = str2.replace(/ /g, '');
  //   if (Count2.length == 20) return false;
  //   this.ref.detectChanges();
  // }


  async onSubmit() {
    let res = [];
    this.str = this.clientRegistrationForm.value.shortBio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
   this.str.map((s) => {
      let trimStr = s.trim();
      if (trimStr.length > 0) {
        res.push(trimStr);
      }
    });
    this.len = res.length;
    if (this.len > 20) {
      this.toastr.warning("Short Bio should be less than 20 characters", "", { timeOut: 2000 });
      return;
    }
    this.str1 = this.clientRegistrationForm.value.longbio;
    let res1 = [];
    if(this.clientRegistrationForm.value.longbio == undefined){
      this.str1 ='';
    }else{
       this.str1 = this.clientRegistrationForm.value.longbio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
   this.str1.map((s) => {
      let trimStr1 = s.trim();
      if (trimStr1.length > 0) {
        res1.push(trimStr1);
      }
    });
    }
   
this.len1 = res1.length;
    if (this.len1 < 21 && this.len1 != 0) {
      this.toastr.warning("Long Bio should be more than 20 characters", "", { timeOut: 2000 });
      return;
    }

    console.log(this.clientRegistrationForm.value.id, 'this.clientRegistrationForm.value.id==>>>')
    let fsa_data = [];
    if (this.clientRegistrationForm.value.fsa.length > 0) {
      fsa_data = this.clientRegistrationForm.value.fsa;
      fsa_data = fsa_data.map((x: { id: any; }) => x.id);

    }
    this.clientRegistrationForm.value.image = this.dataImg;
    console.log('ss-sss', this.clientRegistrationForm.value);
    this.submitted = true;
    if (this.clientRegistrationForm.invalid || this.fsaResult.lenght == 0 || !this.dataImg) { return }

    this.clientRegistrationForm.value.office_address = this.common.mainAddress.address;
    this.clientRegistrationForm.value.office_address_lat = this.common.mainAddress.latitude;
    this.clientRegistrationForm.value.office_address_lng = this.common.mainAddress.longitude
    console.log('datajhj', this.clientRegistrationForm.value)
    // console.log('hjghjg',this.clientRegistrationForm.value.account_number)
    const formData: any = new FormData();
    formData.append("first_name", this.clientRegistrationForm.value.name?.split(' ')[0]);
    formData.append("last_name", this.clientRegistrationForm.value.name?.split(' ')[1]);
    formData.append("email", this.clientRegistrationForm.value.email);
    formData.append("id", this.clientRegistrationForm.value.id);
    // formData.append("req_id", this.clientRegistrationForm.value.req_id);
    formData.append("password", this.clientRegistrationForm.value.password);
    formData.append("profile_img", this.dataImg);
    formData.append("address", this.common.mainAddress.address);
    formData.append("latitude", this.common.mainAddress.latitude);
    formData.append("longitude", this.common.mainAddress.longitude);
    formData.append("mobile", this.clientRegistrationForm.value.mobile);
    formData.append("shownOnMap", 'Yes');
    formData.append("textNo", this.clientRegistrationForm.value.text_line);
    formData.append("shortBio", this.clientRegistrationForm.value.shortBio.trim());
    formData.append("bio", this.clientRegistrationForm.value.longBio.trim());
    formData.append("officeName", this.clientRegistrationForm.value.officeName);
    formData.append('website', this.clientRegistrationForm.value.website)
    formData.append("brokerage_phone", this.clientRegistrationForm.value.brokerage_phone);
    formData.append("fsa_id", fsa_data);
    // formData.append("account_number", this.clientRegistrationForm.value.account_number);

    if (this.clientRegistrationForm.value.fsa.length > 20) {
     return this.toastr.warning('You can select only 20 FSA.')
    }
    else {
      // console.log(formData,"kkkkkkkkkkkkkkkkkkk")
      // let result = formData
      let result: any = await this.http.Post('makePaymentClient', formData);
      console.log(result, 'paymentClient======')
      if (result["status"] == true) {
        let user_id = result.user_id;
        console.log('status????')
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
        var param = localStorage.getItem('userid');
        console.log(param, 'param---------------')
        this.VefifyAccount(param);
        Swal.fire({
          text: "You will be redirect to Payment description page ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(async (result) => {
          if (result.isConfirmed) {

            window.location.href = environment.PaymentUrl + user_id;

          }
        })
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });

    }

  }

  // ************************************************************

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

  open(modal: any) {
    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => { },
        (reason) => { }
      );
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

  }
  showHidePassword1() {
    if (this.showHidePass1) this.showHidePass1 = false;
    else this.showHidePass1 = true

  }

}
