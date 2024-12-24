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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule, Dimensions, ImageCroppedEvent, base64ToFile, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-subagent-account-request',
  templateUrl: './subagent-account-request.component.html',
  styleUrls: ['./subagent-account-request.component.css']
})
export class SubagentAccountRequestComponent implements OnInit {

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

  @ViewChild('addressSearch', { static: false }) addressSearch: any;
  settings = {
    singleSelection: false, 
                         text:"Select FSA",
                         selectAllText:'Select All',
                         unSelectAllText:'UnSelect All',
                         enableSearchFilter: true,
                         classes:"myclass custom-class"
};

dropdownList:any = [];
selectedItems :any= [];
dropdownSettings:any = {};

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
    private formBuilder: FormBuilder) {
      this.data = {};
     }

  async ngOnInit() {
    // if (localStorage.getItem('type') != '3' && '2') {
    //   this._router.navigate(['/login']);
    // }
    var param = localStorage.getItem('userid');
    // console.log('yashraj')
    this.VefifyAccount(param);
    this.getActiveFSA();
    
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select FSA",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };
    this.createForm();
    let result: any = await this.http.post('getLastId', {});
    this.regisrtationForm.patchValue({ account_number: this.generateAccountNumber(result['data'][0].lastId) });
   
  }
  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);
  }


  fsaData:any=[];
  async getActiveFSA() {
    let data:any = await  this.http.post('getActiveFSAStatus/',{})
    this.fsaData=data['data'];
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
      // email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
     email:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', this.validation.removeSpace],
      mobile: ['',[Validators.required,Validators.maxLength(15), Validators.minLength(9)]],
      officeName: ['', Validators.required],
      brokerage_phone: ['', [Validators.required,Validators.maxLength(15), Validators.minLength(9)]],
      text_line: ['', this.validation.required],
      // image: ['', Validators.required],
      office_address: ['', this.validation.required],
      office_address_lat: [''],
      office_address_lng: [''],
      fsa: ['', Validators.required],
      // facebook: ['', Validators.required],
      // whatsapp: ['', Validators.required],
      // messenger: ['', Validators.required],
      // wechat: ['', Validators.required],
      website: ['',  [Validators.required,Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      // website:['',Validators.required],
      // shortBio: ['', this.validation.removeSpace],
      shortBio: ['', Validators.required],
      account_number: [''],
      // longBio: ['', this.validation.removeSpace],
      longBio: ['', Validators.required],
      accept1: ['', Validators.required],
      accept2: ['', Validators.required],
      id: [''],
      req_id: [''],
      agent_id: [''],


    }, {
      validator: MustMatch('password', 'cpassword')
    });
  }
  get f() { return this.regisrtationForm.controls; }

  requestDataa: any;
  async VefifyAccount(param: any) {
    // console.log("===datam", param)
    let data: any = await this.http.post('getUserDataForPayment/' + param, {});

    console.log(data,'data123')
    if (data.status) {
    // console.log(data,'........................')
      // this.requestData = data['data'];
      this.requestData = data['data'][0];
      this.croppedImage = this.requestData.profile_img;
      // console.log(this.requestData,'d..............')
      this.regisrtationForm.patchValue({

        id: this.requestData?.id,
        name: this.requestData?.first_name + ' ' + this.requestData?.last_name,
        mobile: this.requestData?.mobile,
        brokerage_phone: this.requestData?.brokerPhoneNo,
        officeName: this.requestData?.brokerageName,
        website: this.requestData?.website,
        email: this.requestData?.email,
        office_address: this.requestData?.address == "undefined" ? "" : this.requestData?.address,
        office_address_lat: this.requestData?.latitude,
        office_address_lng: this.requestData?.longitude,
        password: this.requestData?.password,
        cpassword: this.requestData?.password,
        fsa: this.requestData?.fsaData,
      
        text_line: this.requestData?.textNo != null ? this.requestData?.textNo : '',

    //     // facebook: this.requestData[0]?.facebook,
    //     // whatsapp: this.requestData[0]?.whatsapp,
    //     // messenger: this.requestData[0]?.messenger,
    //     // wechat: this.requestData[0]?.wechat,
        
        
         
         
        shortBio: this.requestData?.shortBio,
        longBio: this.requestData.bio,
         
        // shortBio: shortbio,
        // longBio: bio
      })

      this.common.mainAddress.address = this.requestData[0]?.address;
      this.common.mainAddress.latitude = this.requestData[0]?.latitude;
      this.common.mainAddress.longitude = this.requestData[0]?.longitude;

      this.fsaResult.push(this.requestData.fsa);

      if (this.requestData.imageExists == true) {
        this.regisrtationForm.controls.image?.setValidators(null);
        this.regisrtationForm.controls.image?.updateValueAndValidity();
      }
      this.regisrtationForm.controls['name'].disable();
      this.regisrtationForm.controls['mobile'].disable();
      this.regisrtationForm.controls['email'].disable();
     
    }
    console.log(this.requestData?.bio);
    console.log(typeof(this.requestData?.shortBio),"kjhkjhkjhjghhhhhhhh");
    console.log(typeof(this.requestData?.bio),"hhhhhhhhhhhhhhh");
  }

  async selectFSAReq(event:any,fsa_id:any){
    if(event.target.checked == true){
      this.fsaResult.push(fsa_id);
    }else{
       this.fsaResult.splice(this.fsaResult.indexOf(fsa_id), 1);
    }
      }

      fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        if( event.target.files[0].type === '' ||event.target.files[0].type === null ||event.target.files[0].type === undefined || event.target.files[0].type === 'image/svg+xml'){
          this.toastr.warning("Please Select  jpg or jpeg or png extension image!"," ",{
            timeOut: 2000,
          })
          return
        }
      }
      dataImg: any = null;
      async imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64
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

  async onLogin() {

    


    let fsa_data = [];
    if(this.regisrtationForm.value.fsa?.length > 0){
      fsa_data = this.regisrtationForm.value.fsa;
      fsa_data =  fsa_data.map((x: { id: any; }) => x.id);

    }
   
    this.regisrtationForm.value.email = this.requestData?.email;
    this.regisrtationForm.value.mobile =  this.requestData?.mobile;
    this.regisrtationForm.value.name =  this.requestData?.first_name + ' ' + this.requestData?.last_name;
    
    console.log('ss-------------------sss',this.fsaResult,this.regisrtationForm); 
    this.submitted = true;
   
    // if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0 || !this.dataImg) {return; }
    if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0 ) {return; }
    // this.str = this.regisrtationForm.value.shortBio;
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
// alert('1')
    // let fsa_data = [];
    // fsa_data = this.regisrtationForm.value.fsa;
    // // console.log(fsa_data,'f saDafa')
    // fsa_data =  fsa_data.map((x: { id: any; }) => x.id);
    const formData: any = new FormData();
    formData.append("first_name", this.regisrtationForm.value.name.split(' ')[0]);
    formData.append("last_name", this.regisrtationForm.value.name?.split(' ')[1]);
    formData.append("email", this.regisrtationForm.value.email);
    formData.append("id", this.regisrtationForm.value.id);
    // formData.append("req_id", this.regisrtationForm.value.req_id);
    // formData.append("account_number", this.regisrtationForm.value.account_number);
    formData.append("password", this.regisrtationForm.value.password);
    formData.append("profile_img", this.dataImg);
    formData.append("address", this.common.mainAddress.address);
    formData.append("latitude", this.common.mainAddress.latitude);
    formData.append("longitude", this.common.mainAddress.longitude);
    formData.append("mobile", this.regisrtationForm.value.mobile);
    formData.append("shownOnMap", 'Yes');
    formData.append("textNo", this.regisrtationForm.value.text_line);
    formData.append("shortBio", this.regisrtationForm.value.shortBio);
    formData.append("bio", this.regisrtationForm.value.longBio);
    formData.append("officeName", this.regisrtationForm.value.officeName);
    formData.append('website', this.regisrtationForm.value.website)
    formData.append("brokerage_phone", this.regisrtationForm.value.brokerage_phone);
    formData.append("fsa_id",fsa_data);

      if(this.regisrtationForm.value.fsa.length > 20){
        this.toastr.warning('You can select only 20 FSA.');
        return;
      }else {
        let result: any = await this.http.Post('makePayment/' + this.regisrtationForm.value.id, formData);
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
            window.location.href = environment.PaymentUrl + this.regisrtationForm.value.id;
  
          }
        })
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });

      }
  }


  onItemSelect(item: any) {
    console.log(item);
    this.regisrtationForm.value.fsa = this.selectedItems;
    console.log(this.regisrtationForm.value.fsa, 'fsa')
  }
  OnItemDeSelect(item: any) {
    console.log(this.selectedItems);
    this.regisrtationForm.value.fsa = this.selectedItems;

  }
  onSelectAll(items: any) {
    console.log(items);
    this.regisrtationForm.value.fsa = items;
  }
  onDeSelectAll(items: any) {
    console.log(items);
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

}