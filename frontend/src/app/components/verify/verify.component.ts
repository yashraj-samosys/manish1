import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  verify = 1;
  userType;
  constructor(
    private http: HttpService,
    public translate: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log('translate', this.translate);
    var param = window.location.href.split('verify/')[1];
    console.log(param, 'prams')
    this.VefifyAccount(param);
    let lan = localStorage.getItem('language');
    if (!lan) lan = 'en';
    this.translate.use(lan);
  }

  async VefifyAccount(param: any) {
    var loginData: any = await this.http.post('verifyUserAccount/' + param, {});
    // console.log(loginData, "login")
    // console.log(loginData.Userdata[0].user_type), 'usertype'
    if (loginData['status'] == false) {
      if (loginData['status'] == false && loginData['data'] == 3) {
        this.toastr.error(loginData['msg']);
        this.verify = 5;
      }
      if (loginData['status'] == false && loginData['data'] != 3) {
        this.toastr.error(loginData['msg']);
        this.verify = 2;
      }
    } else {
      if (loginData['status'] == true && loginData['data'] == 1) {
        this.toastr.success(loginData['msg']);
        this.verify = 3;
        this.userType = loginData.Userdata[0].user_type
      } else {
        this.toastr.success(loginData['msg']);
        this.verify = 4;
        this.userType = loginData.Userdata[0].user_type
      }
    }
  }
}
