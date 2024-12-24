import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiUrlService } from "src/app/shared/services/apiUrl.service";
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from "ngx-toastr";
import { ValidationsService } from 'src/app/shared/services/validations.service';
import { validationscnfg } from "src/app/validations/validation";


@Component({
  selector: 'app-footer-text',
  templateUrl: './footer-text.component.html',
  styleUrls: ['./footer-text.component.scss']
})
export class FooterTextComponent implements OnInit {
  addfooterForm: any;
  submitted = false;
  value: any;
  data: any;
  id: any;
  validations_cnfg = validationscnfg


  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService,
    private apiURL: ApiUrlService,
    public validations: ValidationsService,
  ) { }


  get f() { return this.addfooterForm.controls };
  ngOnInit(): void {


    this.addfooterForm = this.fb.group(
      {
        // phone_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
        phone_no: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        address: ['', this.validations.address],
        // email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,25}$')]]
        email: ["", this.validations.email],
      }
    )
    this.get();


  };


  async get() {
    this.data = await this.http.get(this.apiURL.url.getFooter)
    console.log(this.data.data[0])
    this.id = this.data.data[0].id
    this.addfooterForm.patchValue({
      phone_no: this.data.data[0].phone_no,
      address: this.data.data[0].address,
      email: this.data.data[0].email
    })

  }


  Onadd() {
    this.submitted =true;
    if (!this.addfooterForm.invalid){

      this.http.Post(this.apiURL.url.addEdit + '/' + this.id, this.addfooterForm.value);
      this.toastr.success(' Footer text Update Successfully');
      this.data = this.addfooterForm.value
      // console.log(this.data,'++++++++++++++++++++++++')

    } else {
      // this.id = 0
      // this.http.Post(this.apiURL.url.addEdit + '/' + this.id, this.addfooterForm.value);
     return

    }
  }
}



