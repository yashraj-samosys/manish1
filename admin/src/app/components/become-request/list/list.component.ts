import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  filtered: [];
  data;
  searchFilter;
  total;
  count: 0;
  isLoaderShow = true;
  pageEvent: PageEvent;
datasource: null;
pageIndex:number;
pageSize: 10;
length:number;
  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBecomeAgentList()
  }

  applyFilter(filterValue: string){
    this.searchFilter = filterValue;
    this.getBecomeAgentList()
  }

  // async getBecomeAgentList(){
  //   // let result = await this.http.get(this.apiUrl.url.getContactData);
  //   // let result = await this.http.get(this.apiUrl.url.getBecomeAgentList)
  //   let result = await this.http.post(this.apiUrl.url.getBecomeAgentList,{ filter: this.searchFilter, isLoaderShow: false})
  //   this.data = [...['data']];
  //   this.filtered = result['data']
  //   this.total = result['total'][0]?.total;
  //   console.log(result) 
  // }


  async getBecomeAgentList(event?:PageEvent) {
    this.isLoaderShow = true;
    let result = await this.http.post(this.apiUrl.url.getBecomeAgentList, {
      filter: this.searchFilter,
      count: event?.pageIndex || 0 ,
      limit: event?.pageSize || 20
    });
    console.log(result,'getAgentList=====>>>>')
    this.isLoaderShow = false;
    this.data = [...result["data"]];
    this.total = result['total'][0]?.total;
    this.data = [...['data']];
    this.filtered = result['data']
  }


  view(id: any){
    console.log(id);
    this.router.navigate(['/users/view',id,2])
  }
  

  // view(id) {
  //   this.router.navigate(['/users/view', id, 2])
  //   this.modalService.dismissAll(this.modalAlreadyActive);
  // }

}
