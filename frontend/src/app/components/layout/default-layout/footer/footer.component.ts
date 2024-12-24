import { Component, OnInit } from '@angular/core';


import { ApiUrlService } from "src/app/services/apiUrl.service";
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  data: any;
  footerdata: any;
  lakshya:any;
  boss:any;
  constructor(
    private apiURL: ApiUrlService,
    private http: HttpService) { }

  ngOnInit():void {
    this.getfoot();
  };

  //   async getfoot(){
  //   await this.http.get(this.apiURL1.url.getfoot);
  //   // this.footerdata = this.data
  //   console.log(this.footerdata);
  // }



  async getfoot() {
    this.data = await this.http.get(this.apiURL.url.getFooter);
    this.footerdata = this.data.data
  }



}
