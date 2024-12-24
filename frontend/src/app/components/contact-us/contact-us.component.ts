import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { HttpService } from 'src/app/services/http.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { validationscnfg } from '../validations/validation';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  addContactForm: any;
  submitted: any;
  user_id: any;
  data: any;
  result: any = [];
  myValidation = validationscnfg


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private router: Router,
    private route: ActivatedRoute,
    public validations: ValidationsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('userid');
    console.log(this.user_id)
    if (this.user_id) this.getUserData();
    this.createContact()
  }

  async getUserData() {
    console.log(this.user_id, 'id')
    this.result = await this.http.get(this.apiUrl.url.getAgentDataById + this.user_id);
    this.data = this.result['data'][0];
    console.log(this.data, 'dataaaaat')
    let lastname
    if (this.data?.last_name == 'null' || this.data?.last_name == null) {
      lastname = '';
    }
    else lastname = this.data?.last_name
    if (this.result['status']) {
      this.addContactForm.patchValue({
        name: this.data?.first_name + " " + lastname,
        email: this.data?.email,
        phone: this.data?.mobile.replaceAll('-', ''),
      });
    } else this.toastr.error(this.result["msg"], "", { timeOut: 2000 })


  }

  createContact() {
    this.addContactForm = this.formBuilder.group({
      name: ['', this.validations.fullname],
      email: ['', this.validations.email],
      phone: ['', this.validations.mobile],
      message: ['', this.validations.longbio]
    })
  }
  // findInvalidControls() {
  //   const invalid = [];
  //   const controls = this.addContactForm.controls;
  //   for (const name in controls) {
  //   if (controls[name].invalid) {
  //   invalid.push(name);
  //   // console.log(name,'name')
  //   console.log(invalid,'invalid')
  //   }
  //   }
  //   return invalid;
  //   }
  get f() { return this.addContactForm.controls; }
  async submit() {
    // this.findInvalidControls();
    console.log(this.addContactForm.value)
    this.submitted = true;
    if (this.addContactForm.invalid) {
      console.log('INVALID ContactForm')
      return;
    }
    this.submitted = false;

    this.result = await this.http.post(this.apiUrl.url.addContactData, this.addContactForm.value);

    if (this.result['status']) {
      this.toastr.success(this.result['msg'], '', { timeOut: 2000 });
      this.router.navigate(['/home'])

    } else {
      this.toastr.error(this.result['msg'], '', { timeOut: 2000 })
    }


  }

  openmap() {
    const destination = '49.04538485787091,-122.79530232124448';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  }
  sendEmail() {
    const email = 'mailto:info@myreferralnetwork.ca'; // Replace with your desired email address
    window.open(email, '_blank');
  }

  callPhone() {
    const phone = 'tel:+16043296759'; // Replace with your desired phone number
    window.open(phone, '_blank');
  }

}
