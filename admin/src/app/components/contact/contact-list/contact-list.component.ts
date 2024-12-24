import { Component, OnInit } from '@angular/core';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  data;
  filtered: [];
  searchFilter;
  search = "";
  count = 0;
  isCount = [0];
  total;
  // isLoaderShow: boolean;
  isLoaderShow = true;
  pageEvent: PageEvent;
datasource: null;
pageIndex:number;
pageSize: 20;
length:number;
eData;


  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getContactDataList();
  }

  // async getContactDataList(){
  //   // let result = await this.http.get(this.apiUrl.url.getContactData);
  //   let result = await this.http.post(this.apiUrl.url.getContactData,{ filter: this.searchFilter, isLoaderShow: false})
  //   this.data = [...['data']];
  //   this.filtered = result['data']
  //   console.log(result) 
  // }

  // async getContactDataList(event?:PageEvent) {
  //   this.isLoaderShow = true;
  //   let result = await this.http.get(this.apiUrl.url.getRequestData, {
  //     filter: this.searchFilter,
  //     count: event?.pageIndex || 0 ,
  //     limit: event?.pageSize || 10
  //   });
  //   this.isLoaderShow = false;
  //   this.data = [...result["data"]];
  //   this.total = result['total'][0]?.total;
  //   this.filtered = result['data'];
  // }

  async getContactDataList(event?:PageEvent) {
    this.isLoaderShow = true;
    let result = await this.http.get(this.apiUrl.url.getContactData, {
      filter: this.searchFilter || '',
      count: event?.pageIndex || this.count ,
      limit: event?.pageSize || 20
    });
    console.log(result,'getAgentList=====>>>>')
    this.isLoaderShow = false;
    this.data = [...result["data"]];
    this.total = result['total'][0]?.total;
    this.data = [...['data']];
    this.filtered = result['data']
    console.log(this.filtered,"llllllll")

  }


  view(id){
    this.router.navigate(['/contact/contact-view', id])
  }

 async applyFilter( filterValue: string){
  this.searchFilter = filterValue.trim();
   this.getContactDataList()
  }


  export(){
    let excel_data = [];
    this.eData = this.filtered;
    console.log(this.eData,'data')
    for (let i = 0; i < this.eData.length; i++) {
      excel_data.push({
        "Name": this.eData[i].name,
        "Email": this.eData[i].email,
        "Phone": this.eData[i].phone,
        "message": this.eData[i].message,
        // "Create Date": this.eData[i].create_date
      })
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook,workSheet,"data");
    XLSX.writeFile(workBook,'Contact.xlsx')
    
  }

}
