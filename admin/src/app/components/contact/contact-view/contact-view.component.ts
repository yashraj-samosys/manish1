import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  id;
  data;
  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.getContactDataById()
  }

  async getContactDataById(){
    let result = await this.http.get(this.apiUrl.url.getContactDataById + this.id) 
    // console.log(result)
    this.data = [...result['data']][0];
    // console.log(this.data,'dat')
  }

}
