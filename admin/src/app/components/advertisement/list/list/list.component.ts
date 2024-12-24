import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from '../../../../shared/services/http.service'
//import { ApiUrlService } from '../../../shared/services/apiUrl.service';
import { ApiUrlService } from '../../../../shared/services/apiUrl.service'
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2'
import { async } from 'q';
import { registerLocaleData } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchControl: FormControl = new FormControl();
  filtered:any = [];
  data;
  useNotAssign = [];
  selected;
  assignUserId;
  show_div_list;
  confirmResut;
  inputValue;
  index;
  program_id;
  inputs;
  apiURL: any;
  search = "";
  count = 0;
  isCount = [0];
  total;
  isLoaderShow = true;
  pageEvent: PageEvent;
datasource: null;
pageIndex:number;
pageSize: 10;
length:number;

  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      // this.filerData(value);
    });
    this.getAdvertisementList();
   
  }
  
  // async getAdvertisementList() {
  //   //alert("List function")
  //   let result = await this.http.get(this.apiUrl.url.getAdvertisementList);

  //   console.log("advertisment result data is:", result)

  //   //    this.data = [...result['data']];
  //   this.data = result['data'][0].advertising;
  //   console.log('image',this.data[0].profile_img )

  //   let start = this.data[0].StartDate;
  //   // console.log('Database Date', start);
  //   // console.log("Dataa is:", this.data);
  //   this.filtered = this.data;
  //   //  console.log(this.data.status)
   
  // }

  async getAdvertisementList(event?:PageEvent) {
    // event.pageSize = this.pageSize
    // event.pageSize = 20;
    // let isExist = this.isCount.includes(event?.pageIndex);
    // if (isExist) return;
    // this.isCount.push(event?.pageIndex);
    this.isLoaderShow = true;
    let result = await this.http.get(this.apiUrl.url.getAdvertisementList, {
      count: event?.pageIndex || this.count ,
      limit: event?.pageSize || 10
    });
    this.isLoaderShow = false;
    // let result = await this.http.get('getActiveFSAWithDefaultAgent');
    // this.data = [...result["data"]]
    this.total = result['total'][0]?.total;
       this.data = [...result['data']];
    this.data = result['data'][0].advertising;
    let start = this.data[0].StartDate;
    this.filtered = this.data;
  }

  // filerData(val) {
  //   if (val) val = val.toLowerCase();
  //   else return this.filtered = [...this.data];

  //   const columns = Object.keys(this.data[0]);
  //   if (!columns.length) return;

  //   const rows = this.data.filter(function (d) {
  //     for (let i = 0; i <= columns.length; i++) {
  //       const column = columns[i];
  //       if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) return true;
  //     }
  //   });
  //   this.filtered = rows;
  //   console.log(val,'valeeeeeee')
  //     console.log(this.filtered,'')
  // }


  async changeStatus(id, status) {
    //  status=true;
   // alert('change status')
    
   let result = await this.http.post(this.apiUrl.url.changeAdvertisementStatus + id, { status: status });
   console.log('*&*&*&*&', result,this.filtered[0].status,'+++++++++++++++')
    if (result['status']) {
    //  alert("status is")
     console.log("status is:", result['status']);
      this.toastr.success(result['msg'], '', { timeOut: 2000 });
    this.getAdvertisementList();
      
    }
    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  }

  view(id) { this.router.navigate(['/advertisement/view', id]) }

  edit(id) {
    this.router.navigate(['/advertisement/add-edit', id])
  }

  async delete(id, data) {
  // alert("delete is work")
    Swal.fire({
      title: 'Are you sure want to Delete?',
    //  text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(async(result) =>  {
      if (result.isConfirmed) {
        let result1 = await this.http.get(this.apiUrl.url.DeleteAd + id);
        //this.getAdvertisementList();
        this.thisreload()
       
        //console.log("delete data status is:", data.status, id, data);
        Swal.fire(
          'Deleted!',
          'Your data has been deleted from the list.',
          'success'
        )
      } 
    })
  }
 
  async thisreload()
  {
    //alert("after delete")
    this.router.navigateByUrl('/advertisement', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/advertisement/list"]);
    });
    
  }

  export() {
    // if (this.filtered.length ) {
    //   this.toastr.error('No Data Found', '', { timeOut: 2000 });
    //   return;
    // }
    // let excel_data = [];
    // for (let i = 0; i < this.filtered.length; i++) {
    //   excel_data.push({
    //   ' Type': this.filtered[i].type,
    //     //' Panel Type': this.filtered[i].panel-type ,
    //     'Start Date': this.filtered[i].date,
    //      'End Date': this.filtered[i].date,
    //     // 'Mobile': '+' + this.filtered[i].phonecode + this.filtered[i].mobile,
    //     // 'Agent': "Public User",
    //     // 'Account Number': this.filtered[i].account_number,
    //     // 'Address': this.filtered[i].address
    //   })
  }
}


    //let result = await this.http.get(this.apiURL.url.getDateRange);
    //console.log("deleted result is:",result);
    // this.router.navigate(['/advertisement/list', id])