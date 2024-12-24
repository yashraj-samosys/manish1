import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ValidationsService } from 'src/app/shared/services/validations.service';

@Component({
  selector: 'app-admin-verify',
  templateUrl: './admin-verify.component.html',
  styleUrls: ['./admin-verify.component.scss']
})
export class AdminVerifyComponent implements OnInit {

  constructor(
    public validations: ValidationsService,
    private toaster: ToastrService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  loginPage(){
    this.router.navigateByUrl('/session/login');
  }

}
