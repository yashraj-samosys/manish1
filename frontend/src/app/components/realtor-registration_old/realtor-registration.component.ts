import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CommonService } from "src/app/services/common.service";
import {ChangeDetectorRef} from '@angular/core'
import { TranslateService } from '@ngx-translate/core';
import { ValidationsService } from 'src/app/services/validations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-realtor-registration',
  templateUrl: './realtor-registration.component.html',
  styleUrls: ['./realtor-registration.component.css']
})
export class RealtorRegistrationComponent implements OnInit {
  emailData:any;

   requestData:any;
  regisrtationForm:any;
  submitted = false;
  latitude:any='';
  longitude:any='';
  geoError='';
  fsaResult:any=[];
   param:any
   showHidePass = true;
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

  constructor(private ref: ChangeDetectorRef,
    public router:Router,
    public common: CommonService,
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private validation: ValidationsService,
    private route: ActivatedRoute
    ) { }
  ngOnInit(): void {
    this.createForm();
    this.getActiveFSA();
   this.dropdownSettings = { 
        singleSelection: false, 
        text:"Select FSA",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class"
      };  
      this.emailData = this.route.snapshot.queryParams.email; 
      this.regisrtationForm.patchValue({
        email:this.emailData
      })         
}
   
   ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);

  }
  createForm(){
    this.regisrtationForm = this.formBuilder.group({
      email   : ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
      name : ['',this.validation.removeSpace],
      estate_brokeraege:['',Validators.required],
      phone:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
      brokerage_phone:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      office_address:['',Validators.required],
      office_address_lat:[''],
      office_address_lng:[''],
      fsa:['',Validators.required],
    });

  }
  get f() { return this.regisrtationForm.controls; }

  fsaData:any=[];
  async getActiveFSA() {
    let data:any = await  this.http.post('getActiveFSAStatus/',{})
    this.fsaData=data['data'];
    this.ref.detectChanges();
} 

  
async  selectFSAReq(event:any,fsa_id:any){
         if(event.target.checked == true){
           this.fsaResult.push(fsa_id);
         }else{
            this.fsaResult.splice(this.fsaResult.indexOf(fsa_id), 1);
         }
           }
async submitRequest() {

    this.submitted = true;
    if (this.regisrtationForm.invalid || this.fsaResult.lenght == 0) {return;}

      this.regisrtationForm.value.office_address = this.common.mainAddress.address;
      this.regisrtationForm.value.office_address_lat = this.common.mainAddress.latitude;
      this.regisrtationForm.value.office_address_lng = this.common.mainAddress.longitude
      this.regisrtationForm.value.user_id= localStorage.getItem('userid');
      this.regisrtationForm.value.agent_id= this.param;

    if(this.regisrtationForm.value.fsa.length > 20){
      return this.toastr.warning('You can select only 20 FSA.')
    }else{
     
      let result:any = await this.http.post('RealtorSignup',this.regisrtationForm.value);
      if (result["status"] == true) {
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
        // Swal.fire(
        //   'Signup Successfully',
        //   'Verification link has been sent to your email!',
        //   'success'
        // )
        this.router.navigate(["/login/realtor"]);
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
    }
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

  }

}