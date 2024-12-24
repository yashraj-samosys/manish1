import { Component, OnInit } from "@angular/core";
import { ApiUrlService } from "src/app/shared/services/apiUrl.service";
import { HttpService } from "src/app/shared/services/http.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { FormControl } from '@angular/forms';
import * as XLSX from "xlsx";

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"],
})
export class RequestListComponent implements OnInit {
  data;
  filtered: [];
  searchFilter1;
  status;
  search = "";
  count = 0;
  isCount = [0];
  total;
  // isLoaderShow: boolean;
  isLoaderShow = true;
  pageEvent: PageEvent;
datasource: null;
pageIndex:number;
pageSize: 10;
length:number;
userStatus: FormControl;
searchFilter: FormControl;

  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStatus = new FormControl();
    this.searchFilter = new FormControl();
    this.getRequestDataList();
  }

  view(id) {
    this.router.navigate(["/request/request-view", id]);
  }

  


  // async getRequestDataList() {
  //   // let result = await this.http.get(this.apiUrl.url.getRequestData);
  //   let result = await this.http.post(this.apiUrl.url.getRequestData,{
  //     filter: this.searchFilter,
       
  //     isLoaderShow:false})
  //   this.data = [...["data"]];
  //   this.filtered = result["data"];
  //   console.log(result);
  // }

  async getRequestDataList(event?:PageEvent) {
    this.isLoaderShow = true;
    let result = await this.http.post(this.apiUrl.url.getRequestData, {
      filter: this.searchFilter1|| '',
      status: this.status|| '',
      count: event?.pageIndex || this.count ,
      limit: event?.pageSize || 20,
    });
    // console.log(result,'getRequestDataList=====')
    this.isLoaderShow = false;
    this.data = [...result["data"]];
    this.total = result['total'][0]?.total;
    this.filtered = result['data'];
  }

  export(){
    let excel_data = [];
    // console.log(this.data,'datgat')
    for (let i = 0; i < this.data.length; i++) {
      // const element = this.filtered[i];
    excel_data.push({
      "User Name": this.data[i].name,
      "Agent Name": this.data[i].first_name+ '' +this.data[i].last_name,
      "Email": this.data[i].email,
      "Mobile": this.data[i].phone,
      "Message": this.data[i].message
    })      
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook,workSheet,'data');
    XLSX.writeFile(workBook,'Request.xlsx')
  }


 async applyFilter( filterValue: string){
  this.searchFilter1 = filterValue;
   this.getRequestDataList()
  }
  
  statusFilter(status) {
    console.log('status',status.target.value)
    this.status = status.target.value;
    // console.log(this.status,'status');
    this.getRequestDataList();
  }
  reset(){
    this.userStatus.reset();
    this.status = null; 
    this.searchFilter.reset();
    this.searchFilter1 = null;
    this.getRequestDataList();
  }
}
