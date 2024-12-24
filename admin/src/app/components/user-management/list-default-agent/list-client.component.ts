import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { HttpService } from "../../../shared/services/http.service";
import { ApiUrlService } from "../../../shared/services/apiUrl.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";
import { da } from "date-fns/locale";

@Component({
  selector: "app-list-client",
  templateUrl: "./list-client.component.html",
  styleUrls: ["./list-client.component.scss"],
})
export class ListDefaultAgentComponent implements OnInit {
  @ViewChild("modalAlreadyActive", { static: false })
  private modalAlreadyActive;
  @ViewChild("modalDeactive", { static: false }) private modalDeactive;

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
  agentData;
  count = 0;
  isCount = [0];
  total;
  // isLoaderShow: boolean;
  isLoaderShow = true;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: 10;
  length: number;
  userStatus: FormControl;
  search = "";
  filterStatus: any = '';
  searchFilter: FormControl;


  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.params["id"];
  }

  ngOnInit() {
    // this.searchControl.valueChanges
    //   .pipe(debounceTime(200))
    //   .subscribe((value) => {
    //     this.filerData(value);
    //   });
    this.getAgentList();

    this.userStatus = new FormControl('1');
    this.searchControl = new FormControl();
  }

  // async getAgentList() {
  //   // let result = await this.http.get('getDefaultAgentInAdminList');getDefaultAndPartnerAgent/
  //   let result = await this.http.get('getDefaultAndPartnerAgent/3');
  //   this.data = [...result['data']];
  //   this.filtered = result['data'];
  //   console.log(this.filtered,'d////////////////////')
  // }

  async getAgentList(event?: PageEvent) {
    // console.log(event);
    this.isLoaderShow = true;
    let result = await this.http.post(
      this.apiUrl.url.getDefaultAndPartnerAgent,
      {
        id: 3,
        search: this.search,
        filterStatus: this.filterStatus || 1,
        count: event?.pageIndex || this.count,
        limit: event?.pageSize || 10,
      }
    );
    // console.log(result,'getAgentList=====>>>>')
    this.isLoaderShow = false;

    // let result = await this.http.get('getActiveFSAWithDefaultAgent');
    this.data = [...result["data"]];
    this.total = result?.total;
    this.filtered = result["data"];
    // this.filtered = [...this.filtered, ...this.data];
    // console.log(this.data, 'getAgentList===')
    console.log(this.filtered, "this.filtered")
  }

  async applyFilter(filterValue: string) {
    console.log(filterValue, "value");
    this.search = filterValue.trim();
    this.getAgentList();
  }

  statusFilter(status) {
    console.log('status', status.target.value)
    this.filterStatus = status.target.value;
    console.log(this.filterStatus, 'status');
    // this.getUserList();
    this.getAgentList();
  }

  // filerData(val) {
  //   if (val) val = val.toLowerCase();
  //   else return (this.filtered = [...this.data]);

  //   const columns = Object.keys(this.data[0]);
  //   if (!columns.length) return;

  //   const rows = this.data.filter(function (d) {
  //     for (let i = 0; i <= columns.length; i++) {
  //       const column = columns[i];
  //       if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1)
  //         return true;
  //     }
  //   });
  //   this.filtered = rows;
  // }

  // async activate(data) {

  //   let result = await this.http.post(this.apiUrl.url.changeDefaultAgentStatus + data.id, data);
  //   if (result['status']) {
  //     if (result['isActivated']) {
  //       this.agentData = result['data'][0];
  //       this.modalService.dismissAll(this.modalDeactive);
  //       this.modalService.open(this.modalAlreadyActive, { ariaLabelledBy: 'modal-basic-title', centered: true, keyboard: false, backdrop: 'static' });
  //     } else {
  //       this.toastr.success(result['msg'], '', { timeOut: 2000 });
  //       this.modalService.dismissAll(this.modalDeactive);
  //       this.getAgentList();
  //     }
  //   }
  //   else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  // }

  // async deactiivate(data) {
  //   let result = await this.http.post(this.apiUrl.url.changeDefaultAgentStatus + data.id, data);
  //   this.modalService.dismissAll(this.modalDeactive);
  //   if (result['status']) {
  //     this.toastr.success(result['msg'], '', { timeOut: 2000 });
  //     this.getAgentList();
  //   }
  //   else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  // }

  async defaultAgent(data) {
    Swal.fire({
      text: "Are you sure want to make Default Agent ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await this.http.post(
          this.apiUrl.url.changeDefaultAgentStatus + data.id,
          data
        );
        if (result["status"]) {
          if (result["isActivated"]) {
            this.agentData = result["data"][0];
            this.toastr.success(result["msg"], "", { timeOut: 2000 });
          } else {
            this.getAgentList();
            this.toastr.success(result["msg"], "", { timeOut: 2000 });
          }
        } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
      }
    });
  }
  async changeDefaultAgentStatus(data) {

    if (data.password == null && data.status == 0) {
      this.toastr.warning("Please set password to activate Agent");
    } else {
      // let result = await this.http.post(this.apiUrl.url.changeDefaultAgentStatus + data.id, data);
      let result = await this.http.post(
        this.apiUrl.url.changeAgentStatus + data.id,
        { status: data.status, agent_type: data.agent_type }
      );

      console.log(data.status,result,'**********',data)
      if (result["status"]) {
        console.log(result["status"], "status");

        if (result["isActivated"]) {
          this.agentData = result["data"][0];
          this.toastr.success(result["msg"], "", { timeOut: 2000 });
        } else {
          // this.getAgentList();
          this.toastr.success(result["msg"], "", { timeOut: 2000 });
        }
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
      this.agentData = data;
      // this.modalService.open(this.modalDeactive, { ariaLabelledBy: 'modal-basic-title', centered: true, keyboard: false, backdrop: 'static' });
    }
    this.getAgentList()
  }

  // view(row,id) {
  //   if(row.user_type  == 3) this.router.navigate(["/users/view/" + id + "/" + 3 + "/0"]);
  //   else this.router.navigate(["/users/view/" + id + "/" + 2 + "/1"]);
  //   this.modalService.dismissAll(this.modalAlreadyActive);
  // }

  view(row, id) {

    if (!this.filterStatus) { this.filterStatus = 1 }

    this.router.navigate(["/users/view", id, 2], { queryParams: { status: this.filterStatus,page: 'partner'  } });
    this.modalService.dismissAll(this.modalAlreadyActive);
  }


  // edit(id) { this.router.navigate(['/users/add-edit', id, 2]) }
  edit(row, id) {
    if (row.user_type == 3) this.router.navigate(["/users/add-edit/" + id + "/" + 3 + "/0"]);
    else this.router.navigate(["/users/add-edit/" + id + "/" + 2 + "/1"]);

  }

  export() {
    if (!this.filtered.length) {
      this.toastr.error("No Data Found", "", { timeOut: 2000 });
      return;
    }
    let excel_data = [];
    for (let i = 0; i < this.filtered.length; i++) {
      excel_data.push({
        Name: this.filtered[i].first_name + this.filtered[i].last_name,
        Email: this.filtered[i].email,
        Mobile: "+" + this.filtered[i].phonecode + this.filtered[i].mobile,
        Agent: "Default Agent",
        "Account Number": this.filtered[i].account_number,
        Address: this.filtered[i].fullAdress,
      });
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook, workSheet, "data"); // add the worksheet to the book
    XLSX.writeFile(workBook, "Client-list.xlsx"); // initiate a file download in browser
  }
  // Delete(data){
  //   Swal.fire({
  //     text: "Are you sure want to Delete ?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       let result = await this.http.post('deleteUser', data);
  //       if (result['status']) {
  //            this.toastr.success(result['msg'], '', { timeOut: 2000 });
  //            this.ngOnInit();
  //        }
  //        else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  //     }
  //   })
  // }
  recover(data, i) {
    Swal.fire({
      text: "Are you sure want to Activate this Agent ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed == true) {
        Swal.fire({
          text: "Are you sure want to Activate this Agent ?",
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
      else { console.log('elseeeee') }
    })
  }

  verify(data, i) {
    Swal.fire({
      text: "Are you sure want to Verify this Agent ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed == true) {
        Swal.fire({
          text: "Are you sure want to Verify this Agent ?",
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
      else { console.log('elseeeee') }
    })
  }

  reset() {
    this.userStatus.reset();
    this.filterStatus = null;
    this.userStatus = new FormControl('1');
    this.searchControl.reset();
    this.search = null;
    this.getAgentList();
  }


  Delete(data, i) {
    Swal.fire({
      text: "Are you sure want to Delete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed == true) {
        Swal.fire({
          text: "Are you sure want to Delete ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let result = await this.http.post("deleteUser", data);
            console.log(result, "result11", data, "data");
            if (result["status"]) {
              console.log(data.status, "status");
              if (data.status == 0) {
                data.status = 2;
                // data.activate_status = 0;
              }
              // console.log(i)
              this.filtered.splice(i, 1);
              this.filtered = [...this.filtered];
              // else data.status = 1;
              this.toastr.success(result["msg"], "", { timeOut: 2000 });
              //  this.ngOnInit();
            } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
          }
        });
      } else {
        console.log("elseeeee");
      }
    });
  }
}
