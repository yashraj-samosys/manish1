import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class RequestViewComponent implements OnInit {

  id:any;
  data;
  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.getRequestDataById()
  }

  async getRequestDataById(){
    let result = await this.http.get(this.apiUrl.url.getRequestDataById + this.id) 
    // console.log(result)
    this.data = [...result['data']][0];
    console.log(this.data,'dat')
  }


}
