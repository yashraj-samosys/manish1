import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ValidationsService } from 'src/app/shared/services/validations.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { validationscnfg } from "src/app/validations/validation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SharedAnimations]
})
export class LoginComponent implements OnInit {
  loginForm;
  submitted = false;
  showHidePass = true;
  validations_cnfg = validationscnfg

  constructor(
    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toaster: ToastrService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user_id')) this.router.navigate(['dashboard/v1']);
    this.createLoginForm();
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/session/login']); // navigate to same route
    // });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', this.validations.email],
      password: ['', this.validations.password]
    });
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true;
  }

  async login() {
    this.submitted = true;
    if (this.loginForm.invalid) return false;
    let result = await this.http.post(this.apiUrl.url.login, this.loginForm.value);
    if (result['status']) {
      localStorage.setItem('user_id', result['data'][0].id);
      localStorage.setItem('user_type', result['data'][0].user_type);
      this.toaster.success(result['msg'], '', { timeOut: 2000 });
      this.router.navigateByUrl('/dashboard/v1');      
    } else {
      this.toaster.error(result['msg'], '', { timeOut: 2000 });
    }
  }
}
