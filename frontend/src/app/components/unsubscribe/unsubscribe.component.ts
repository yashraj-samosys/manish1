import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { HttpService } from 'src/app/services/http.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
result;
  constructor(  
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    var param = window.location.href.split('unsubscribe/')[1];
    var reqId = window.location.href.split('unsubscribe/')[2];
    this.changeAgent(param, reqId);
    let lan = localStorage.getItem('language');
    if(!lan) lan = 'en';
    this.translate.use(lan)
  }

async changeAgent(param, reqId){
  let queryParams = {"req_id":reqId};
  this.result = await this.http.get1(this.apiUrl.url.UnsubscribeAgent + param, queryParams);
}


}
