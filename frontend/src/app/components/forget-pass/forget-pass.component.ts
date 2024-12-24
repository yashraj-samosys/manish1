import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidationsService } from 'src/app/services/validations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { validationscnfg } from '../validations/validation';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { MustMatch } from 'src/app/services/must-match.validator';


@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  [x: string]: any;

  constructor(private formBuilder: FormBuilder,
    private http: HttpService,
    private _router: Router,
    private apiUrl: ApiUrlService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private validation: ValidationsService,
    private toastr: ToastrService) { }

  resetForm: FormGroup;
  showHidePass = true;
  showHidePass1 = true;
  submitted = false;
  getParamm;
  decodedJWT
  myValidation = validationscnfg;
  async ngOnInit(): Promise<void> {
    this.creteForm()

    this.getParamm = this.route.snapshot.params;


    this.decodedJWT = JSON.parse(window.atob(this.getParamm.token.split('.')[1]));

    console.log(this.decodedJWT.id, '--------------', this.decodedJWT, this.getParamm)


  }
  get f() { return this.resetForm.controls; }

  creteForm() {
    this.resetForm = this.formBuilder.group({
      password: ['', this.validation.password],
      cpassword: ['', this.validation.password]
    }, {
      validator: MustMatch('password', 'cpassword')
    });
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true

  }
  showHidePassword1() {
    if (this.showHidePass1) this.showHidePass1 = false;
    else this.showHidePass1 = true

  }


  async resetPassword() {

    this.submitted = true
    if (this.resetForm.invalid) { return; }
    let result = await this.http.post(this.apiUrl.url.resetpass + this.getParamm.token, { id: this.decodedJWT.id, password: this.resetForm.value.password });
    console.log(this.resetForm.value.password, '---------------------------------', this.getParamm['id'], this.decodedJWT)
    if (result.status == true) {
      this.toastr.success("Password changed successfully");
      this._router.navigate(['/home']);

    } else { this.toastr.warning(result.msg, '', { timeOut: 20000 }); }



  }


}
