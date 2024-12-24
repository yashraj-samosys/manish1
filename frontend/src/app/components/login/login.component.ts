import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from "../../services/http.service";
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ValidationsService } from 'src/app/services/validations.service';
import { validationscnfg } from 'src/app/components/validations/validation';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  ForgetPassword: any;
  submitted = false;
  validations_cnfg = validationscnfg;
  checkparam = 'counsumer';
  showHidePass = true;
  addFsa: any;
  closeResult: string;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private _router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private validation: ValidationsService,
    private apiUrl: ApiUrlService,
    private router: Router,
    public validations: ValidationsService,
    private modalService: NgbModal,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.checkparam = window.location.href.split('login/')[1] == undefined ? 'counsumer' : window.location.href.split('login/')[1];

    this.ForgetPassword = this.formBuilder.group({
      checkEmail: ['', this.validation.email]
    })

    this.loginForm = this.formBuilder.group({
      email: ['', this.validation.email],
      password: ['', this.validation.password],
      rememberme: [false]

    });
    if (localStorage.getItem('userid') != null) {
      this._router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this._router.navigate(['home']);
      });
    }
    if (localStorage.getItem('remberme') != null) {
      var data: any = localStorage.getItem('remberme');
      this.loginForm.patchValue({
        email: JSON.parse(data).email,
        password: JSON.parse(data).password,
      })
    }

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async onLogin() {
    localStorage.removeItem('mapPointerDataPublic') // clear map cache
    localStorage.removeItem('mapPointerDataPrivate')

    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    var loginData: any = await this.http.post('weblogin', this.loginForm.value);
    console.log(loginData.data[0]?.SubscriptionEndDate, '------')

    if (loginData.data[0]?.SubscriptionEndDate != "") { // lakshya
      let givenDate = new Date(loginData.data[0]?.SubscriptionEndDate);
      // console.log(givenDate,'givenDate')
      let currentDate = new Date();
      // console.log(currentDate,'currentDate')
      if (givenDate > currentDate) {// subscription on
        localStorage.setItem('changeNetWork', '1')
      } else { localStorage.removeItem('changeNetWork') }
    } else { localStorage.removeItem('changeNetWork') }

    if (loginData['msg'] == "User not found") {
      this.toastr.error('User not found');
      return
    }
    else if (loginData['msg'] == "Invalid Password") {
      this.toastr.error('Invalid Password');
      return
    }

    if ((this.checkparam === 'client' || this.checkparam === 'realtor') && loginData['data'][0].user_type == 4) {
      this.toastr.warning('Please login from public sign in');
    }
    else if ((this.checkparam === 'client' || this.checkparam === 'counsumer') && ((loginData['data'][0].user_type == 3 && loginData['data'][0].agent_type == 0) || (loginData['data'][0].user_type == 2 && loginData['data'][0].agent_type == 0))) {
      this.toastr.warning('Please login from realtor sign in');
    }
    else if ((this.checkparam === 'realtor' || this.checkparam === 'counsumer') && (loginData['data'][0].user_type == 2 && loginData['data'][0].agent_type == 1)) {
      this.toastr.warning('Please login from client sign in');
    } else {
      if (loginData['status'] == false) {


        if (loginData['data'][0]?.status != 0) {

          this.toastr.error(loginData['msg']);
        }
        if (loginData['data'][0]?.status == 0) {
          Swal.fire(
            'Account is inactive',
            'Please activate your account. Go to Verification Email to Verify',
            // ' '
          )
          // console.log('77777777777777777')
        }

        if (loginData['data'][0]?.status == 0 && loginData['ClientPayment'] == false) {
          Swal.fire({
            title: 'Account is inactive, if you want to activate the account, then please complete the payment process.',
            text: "Please click 'Yes' button so that we will redirect to the Payment description page! ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
              window.location.href = environment.PaymentUrl + loginData['data'][0]?.id;
            }
          })

        }

        if (loginData['data'][0]?.status == 4) {
          Swal.fire(
            '',
            'Your account is rejected by admin please contact admin!',
            // ' '
          )
        }

        if (loginData['data'][0]?.status == 5) {
          Swal.fire({
            title: 'Please verify your account!',
            text: "Please click the 'Yes' button to verify the account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this._router.navigate(['/join-us/' + loginData['data'][0]?.id]);
              // window.location.href = environment.PaymentUrl + loginData['data'][0]?.id;
            }
          })
        }

        if (loginData['data'][0]?.user_type == 4 && loginData['data'][0]?.status == 2) {
          Swal.fire({
            text: "Your account is deleted, need to signup again !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this._router.navigate(['/consumer-registration'], { queryParams: { email: loginData['data'][0]?.email } })
            }
          })
        }
        if ((loginData['data'][0]?.user_type == 2 && loginData['data'][0]?.is_default_agent == 1 && loginData['data'][0]?.agent_type == 0 && loginData['data'][0]?.status == 2) || (loginData['data'][0]?.user_type == 3 && loginData['data'][0]?.status == 2)) {
          Swal.fire({
            text: "Your account is deleted, need to signup again !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this._router.navigate(['/realtor-registration'], { queryParams: { email: loginData['data'][0]?.email } });
            }
          })
        }
        if (loginData['data'][0]?.user_type == 2 && loginData['data'][0]?.agent_type == 1 && loginData['data'][0]?.status == 2) {
          Swal.fire({
            text: "Your account is deleted, need to signup again !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this._router.navigate(['/client-registration'], { queryParams: { email: loginData['data'][0]?.email } });
            }
          })
        }

        if (loginData['data'][0]?.user_type == 3 && loginData['data'][0]?.status == 0 && loginData['data'][0]?.is_want_referrals == 2) {
          Swal.fire({
            text: "Please click on the Reactivate profile button to Reactivate your profile.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reactivate Referral Profile'
          }).then(async (result) => {
            if (result.isConfirmed) {
              var reactivateData: any = await this.http.post('reactivate-referral', this.loginForm.value)
              // this.toastr.success('Your Account is Reactivated Successfully, Please Login Again.');
              // this._router.navigate(['login/realtor']);

              // this.toastr.success(loginData['msg']);
              this.toastr.success('Your Account is Reactivated and Login Successfully!');
              this.auth.sendToken(loginData['data'], true)
              if (loginData['data'][0]?.user_type == 3 && loginData['data'][0]?.profile_status == 0) {
                this._router.navigate(['/edit-profile']);
                this.ngOnInit();
              } else {
                this._router.navigate(['/home']);
              }
            }
          })
        }

      }
      else {

        if (this.loginForm.value.rememberme == true) {
          localStorage.setItem('remberme', JSON.stringify(this.loginForm.value));
        } else {
          localStorage.removeItem('remberme');
        }
        this.toastr.success(loginData['msg']);
        this.auth.sendToken(loginData['data'], true)
        if (loginData['data'][0].user_type == 3 && loginData['data'][0].profile_status == 0) {
          this._router.navigate(['/edit-profile']);
          this.ngOnInit();
        } else {
          this._router.navigate(['/home']);
        }

      }
    }
  }


  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

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
  modal_dismiss() {
    this.modalService.dismissAll();
    this.submitted = false;
    this.ForgetPassword.reset();


  }
  open(content) {
    this.ForgetPassword.reset();
    this.submitted = false
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async checkEmail() {
    this.submitted = true;
    if (this.ForgetPassword.invalid) { return; }
    let result = await this.http.post(this.apiUrl.url.forgetpassword, { email: this.ForgetPassword.value.checkEmail, isLoaderShow: false });

    if (result.status == true) {
      this.toastr.success(result.msg, "", { timeOut: 2000 })
      this.ForgetPassword.reset();
      this.modal_dismiss()
    } else {
      this.toastr.warning(result.msg, "", { timeOut: 2000 })

    }

  }


}

