import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from "../../services/http.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/services/must-match.validator';
import { TranslateService } from '@ngx-translate/core';
import { ValidationsService } from 'src/app/services/validations.service';
import Swal from 'sweetalert2';
import { validationscnfg } from '../validations/validation';
@Component({
  selector: 'app-consumer-registration',
  templateUrl: './consumer-registration.component.html',
  styleUrls: ['./consumer-registration.component.css']
})
export class ConsumerRegistrationComponent implements OnInit {
  regisrtationForm: FormGroup;
  emailData:any;
  submitted = false;
  latitude:any='';
  longitude:any='';
  geoError='';
  showHidePass = true;
  showHidePass1 = true;

myValidation = validationscnfg;
  
  constructor(private formBuilder: FormBuilder, 
    private http: HttpService,
     private _router: Router,
     private route: ActivatedRoute,
    private translate: TranslateService,
    private validation: ValidationsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.emailData = this.route.snapshot.queryParams.email;
    if (localStorage.getItem('userid') != null) {
          this._router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            this._router.navigate(['home']);
        }); 
      }
      this.creteForm();
      this.regisrtationForm.patchValue({
        email: this.emailData
      })

  // this.getCurrentLocation()
  
  }
  get f() { return this.regisrtationForm.controls; }

  creteForm(){
    this.regisrtationForm = this.formBuilder.group({
      email   : ['', this.validation.email],
      password: ['',this.validation.password],
      cpassword: ['',this.validation.password],
      name : ['',this.validation.fullname],
      mobile:['',this.validation.mobile],
      accept:['',Validators.required],

    }, {
      validator: MustMatch('password', 'cpassword')
  });
  }

  getCurrentLocation(){
      navigator.geolocation.getCurrentPosition(resp => {
        this.latitude = resp['coords']['latitude'];
        this.longitude = resp['coords']['longitude']
        this.geoError='';
       },
      err => {
       this.geoError=err['message'];
       this.toastr.warning(err['message'])
      });
    }
  async onLogin() {
    
    // Swal.fire(
    //   'Good job!',
    //   'You clicked the button!',
    // )
    console.log(this.regisrtationForm)
    
    this.submitted = true;
    if (this.regisrtationForm.invalid) {return;}
    // if(this.geoError != ''){
    //   this.toastr.warning(this.geoError);
    // }else{
      // this.regisrtationForm.value.latitude = this.latitude;
      // this.regisrtationForm.value.longitude = this.longitude;
      var ResData:any = await   this.http.post('consumerRegistration',this.regisrtationForm.value)
     if(ResData['status'] == false){
              this.toastr.error(ResData['msg']);
      }else{
            this.toastr.success(ResData['msg']);
            Swal.fire(
              'Signup Successfully',
              'Verification link has been sent to your email!',
              'success'
            )
           
           this._router.navigate(['/login']);
      }
    // }
}
showHidePassword() {
  if (this.showHidePass) this.showHidePass = false;
  else this.showHidePass = true

}
showHidePassword1() {
  if (this.showHidePass1) this.showHidePass1 = false;
  else this.showHidePass1 = true

}
onchange() {
  if (!this.regisrtationForm.value.accept) this.f.accept.reset();
}

}
