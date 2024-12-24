import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ValidationsService } from 'src/app/shared/services/validations.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  animations: [SharedAnimations]
})
export class UpdatePasswordComponent implements OnInit {
  form;
  token;
  submitted = false;
  showHidePass = true;
  showHideConPass = true;
  constructor(
    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toaster: ToastrService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.token = route.snapshot.params.token }

  ngOnInit() {
    // if (localStorage.getItem('user_id')) this.router.navigate(['dashboard/v1']);
    this.createform();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) return;
      if (control.value !== matchingControl.value) matchingControl.setErrors({ mustMatch: true });
      else matchingControl.setErrors(null);
    }
  }

  createform() {
    this.form = this.formBuilder.group({
      password: ['', this.validations.password],
      confirmPass: ['', this.validations.password]
    }, { validator: this.MustMatch('password', 'confirmPass') });
  }

  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true;
  }

  showHideConform() {
    if (this.showHideConPass) this.showHideConPass = false;
    else this.showHideConPass = true;
  }

  async updatePass() {
    this.submitted = true;
    if (this.form.invalid) return false;
    let result = await this.http.post(this.apiUrl.url.updatePassword + this.token, { password: this.form.value.password });
    if (result['status']) {
      this.toaster.success(result['msg'], '', { timeOut: 2000 });
      this.router.navigateByUrl('/session/login');
    } else {
      this.toaster.error(result['msg'], '', { timeOut: 2000 });
    }
  }

}
