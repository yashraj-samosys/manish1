import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from '../../../shared/services/http.service';
import { ApiUrlService } from '../../../shared/services/apiUrl.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  searchControl: FormControl = new FormControl();
  filtered = [];
  id;
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
  count = 0;
  isCount = [0];
  total;
  isLoaderShow = true;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: 10;
  userStatus: FormControl;
  searchFilter: FormControl;
  search = "";
  filterStatus: any = '';
  length: number;
  deleteStatus;

  //  searchFilter = '';
  // filterStatus = '';
  // userStatus:FormControl;
  // search:FormControl;

  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute

  ) { this.id = route.snapshot.params["id"] }

  ngOnInit() {
    // this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
    //   this.filerData(value);
    // });
    this.getAgentList();
    this.userStatus = new FormControl('1');
    this.searchControl = new FormControl();
  }

  // async getAgentList() {
  //   let result = await this.http.get(this.apiUrl.url.getAgentList + 4);
  //   this.data = [...result['data']];
  //   this.filtered = result['data'];
  // }


  async getAgentList(event?: PageEvent) {
    // console.log(event)
    this.isLoaderShow = true;
    let result = await this.http.post(this.apiUrl.url.getAgentList, {
      id: 4,
      search: this.search,
      filterStatus: this.filterStatus || 1,
      count: event?.pageIndex || this.count,
      limit: event?.pageSize || 20
    });
    this.isLoaderShow = false;
    this.data = [...result["data"]];
    if (result['status']) {
      // console.log(result,"dsfewaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      this.total = result['total'][0]?.total;
    }
    // this.total = result['total'][0]?.total;
    this.filtered = result['data'];
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
  // }

  async applyFilter(filterValue: string) {
    // console.log(filterValue, "value");
    this.search = filterValue.trim();
    this.getAgentList();
  }

  reset() {
    this.userStatus.reset();
    this.filterStatus = null;
    this.userStatus = new FormControl('1');
    this.searchControl.reset();
    this.search = null;
    this.getAgentList();
  }


  statusFilter(status) {
    // console.log(this.filterStatus)
    // console.log('status', status.target.value)
    this.filterStatus = status.target.value;
    // console.log(this.filterStatus, 'status');
    // this.getUserList();
    this.getAgentList();
  }

  async changeStatus(data) {
    console.log(data,'ststss======')
    let result = await this.http.post(this.apiUrl.url.changeAgentStatus + data.id, { status: data.status, user_type: data.user_type });
    if (result['status']) {
      // console.log(data.status, 'staus', data.id, 'id')
      // if (data.status == 1) data.status = 0;
      // else data.status = 1;
      this.toastr.success(result['msg'], '', { timeOut: 2000 });
      this.getAgentList();
    }
    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  }

  view(id) {
    if (!this.filterStatus) { this.filterStatus = 1 }
    this.router.navigate(['/users/view', id, 4], { queryParams: { status: this.filterStatus } })
  }

  export() {
    if (!this.filtered.length) {
      this.toastr.error('No Data Found', '', { timeOut: 2000 });
      return;
    }
    let excel_data = [];
    for (let i = 0; i < this.filtered.length; i++) {
      excel_data.push({
        'Name': this.filtered[i].first_name + this.filtered[i].last_name,
        'Email': this.filtered[i].email,
        'Mobile': '+' + this.filtered[i].phonecode + this.filtered[i].mobile,
        'Agent': "Public User",
        // 'Account Number': this.filtered[i].account_number,
        // 'Address': this.filtered[i].address
      })
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Public_User_List.xlsx'); // initiate a file download in browser
  }
  recover(data, i) {
    Swal.fire({
      text: "Are you sure want to Activate this User ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed == true) {
        Swal.fire({
          text: "Are you sure want to Activate this User ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let result = await this.http.post('recoverUser', data);
            if (result['status']) {
              this.toastr.success(result['msg'], '', { timeOut: 2000 });
              if (data.status == 2) {
                data.status = 1;
                // data.activate_status = 1;
              }
              this.filtered.splice(i, 1);
              this.filtered = [...this.filtered]

              //  this.ngOnInit();
            }
            else this.toastr.error(result['msg'], '', { timeOut: 2000 });
          }

        })
      }
      // else { console.log('elseeeee') }
    })
  }

  Delete(data, i) {
    Swal.fire({
      text: "Are you sure want to Delete ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed == true) {
        Swal.fire({
          text: "Are you sure want to Delete ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let result = await this.http.post('deleteUser', data);
            if (result['status']) {
              if (data.status == 0) {
                data.status = 2;
                // data.activate_status = 0;
              }
              this.filtered.splice(i, 1);
              this.filtered = [...this.filtered]

              this.toastr.success(result['msg'], '', { timeOut: 2000 });
              //  this.ngOnInit();

            }
            else this.toastr.error(result['msg'], '', { timeOut: 2000 });
          }
        })
      }
      // else { console.log('elseeeee') }


      // if (result.isConfirmed) {
      //   let result = await this.http.post('deleteUser', data);
      //   if (result['status']) {
      //        this.toastr.success(result['msg'], '', { timeOut: 2000 });
      //        this.ngOnInit();
      //    }
      //    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
      // }
    })
  }
}
