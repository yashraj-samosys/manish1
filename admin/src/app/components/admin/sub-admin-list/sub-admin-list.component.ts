import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sub-admin-list',
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.scss']
})
export class SubAdminListComponent implements OnInit {
  search: FormControl;
  statusfilter: FormControl;
  filtered = [];
  data;
  confirmResut;
  data1;
  filtered1;
  filterStatus = '';
  searchFilter = '';
  count = 0;
  total;
  pageIndex: number;
  pageSize: 20;
  length: number;
  user_type;

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private apiUrl: ApiUrlService,
    private modalService: NgbModal
  ) {

    this.user_type = localStorage.getItem('user_type')
  }

  async ngOnInit() {
    this.getsubAdminList();
    this.statusfilter = new FormControl('1');
    this.search = new FormControl();
  }

  // view(id) { this.router.navigate(['/subadmin/view', id]) }
  view(id) { this.router.navigate(['/admin/subadminview', id]) }

  edit(id) { this.router.navigate(['/admin/addeditsubadmin', id]) }

  async getsubAdminList(event?: PageEvent) {
    let result = await this.http.post(this.apiUrl.url.getsubAdminList, {
      filter: this.searchFilter,
      status: this.filterStatus || 1,
      count: event?.pageIndex || this.count,
      limit: event?.pageSize || 20
    });
    this.data = [...result['data']];/////////////////////
    this.filtered = result['data'];
    if (result['status']) {
      this.total = result['total'][0]?.total;
    }

  }
  async changeStatus2(id, status) {
    let result = await this.http.post(this.apiUrl.url.changeAgentStatus + id, { status: status });
    if (result['status']) {
      // console.log(status, 'staus')
      if (status == 1) status = 0;
      else status = 1;
      this.toastr.success(result['msg'], '', { timeOut: 2000 });
      this.getsubAdminList();
    }
    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
    // this.getsubAdminList();
  }

  async changeStatus(data) {
    let result = await this.http.post(this.apiUrl.url.changeAgentStatus + data.id, { status: data.status });
    if (result['status']) {
 
      // if (data.status == 1) data.status = 0;
      // else data.status = 1;
      this.toastr.success(result['msg'], '', { timeOut: 2000 });
      this.getsubAdminList();
    }
    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  }


  statusFilter(status) {
    // console.log('status', status.target.value)
    this.filterStatus = status.target.value;
    // console.log(this.filterStatus, 'status');
    this.getsubAdminList();
  }
  applyFilter(filter: string) {
    // console.log(filter, 'value')
    this.searchFilter = filter;
    this.getsubAdminList();
  }

  confirm(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, keyboard: false, backdrop: 'static' })
      .result.then((result) => {
        this.deleteUser(id);
        this.confirmResut = `Closed with: ${result}`;
      }, (reason) => {
        this.confirmResut = `Dismissed with: ${reason}`;
      });
  }

  async deleteUser(id) {
    let result = await this.http.post(this.apiUrl.url.changeadminStatus + id, { status: 6 });
    if (result['status']) {/////////////////////////
      this.toastr.success('Delete Successfully', '', { timeOut: 2000 });
      this.getsubAdminList();
    } else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  }

  reset() {
    this.statusfilter.reset();
    this.statusfilter = new FormControl('1');

    this.search.reset();
    this.filterStatus = null;
    this.searchFilter = null;
    this.getsubAdminList();
  }
  Delete(id, i) {
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
            this.deleteUser(id);
          }

        })
      }
      // else { console.log('elseeeee') }
    })
  }
}
