import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from '../../../shared/services/http.service';
import { ApiUrlService } from '../../../shared/services/apiUrl.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.scss']
})
export class ListPartnerComponent implements OnInit {

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
  user_type;
  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.user_type = localStorage.getItem("user_type");
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filerData(value);
    });
    //Manage For Admin and Client
    if (this.user_type == "1") {
      this.getAgentList();
    }
    if (this.user_type == "2") {
      this.id = localStorage.getItem("user_id");
      this.getPartnerList(this.id);
    }
  }

  async getAgentList() {
    let result = await this.http.get(this.apiUrl.url.getAgentList + 3);
    this.data = [...result['data']];
    this.filtered = result['data'];
  }

  async getPartnerList(id) {
    let result = await this.http.get(this.apiUrl.url.getPartnerList + id);
    this.data = [...result['data']];
    console.log(this.data,'getPartnere==='); console.log(result.data.id,'--------------------------------**********+')
    this.filtered = result['data'];

  }

  filerData(val) {
    if (val) val = val.toLowerCase();
    else return this.filtered = [...this.data];

    const columns = Object.keys(this.data[0]);
    if (!columns.length) return;

    const rows = this.data.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) return true;
      }
    });
    this.filtered = rows;
  }

  async changeStatus(id, status) {
    let result = await this.http.post(this.apiUrl.url.changeAgentStatus + id, { status: status });
    if (result['status']) {
      this.toastr.success(result['msg'], '', { timeOut: 2000 });
      //Manage For Admin and Client
      if (this.user_type == "1") this.getAgentList();
      if (this.user_type == "2") this.getPartnerList(this.id);
    }
    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
  }


  async changeDefaultAgentStatus(data) {
    console.log(data,'data')
    let result = await this.http.post(this.apiUrl.url.changeDefaultAgentStatus + data.id, data);
    console.log(result)

    if (result['status']) {
      if (result['isActivated']) {
        this.data = result['data'][0];
      } else {
        this.toastr.success(result['msg'], '', { timeOut: 2000 });
        // this.getAgentList();

      }
    }
    else this.toastr.error(result['msg'], '', { timeOut: 2000 });
    this.data = data;
    // this.modalService.open(this.modalDeactive, { ariaLabelledBy: 'modal-basic-title', centered: true, keyboard: false, backdrop: 'static' });
  }


  view(id) { this.router.navigate(['/users/view', id, 3]) }
  // edit(id) { this.router.navigate(['/users/add-edit', id, 3]) }
  edit(id) { this.router.navigate(['/users/add-edit/'+id+'/'+3+'/0']) }


  export() {
    if (!this.filtered.length) {
      this.toastr.error('No Data Found', '', { timeOut: 2000 });
      return;
    }
    let excel_data = [];
    for (let i = 0; i < this.filtered.length; i++) {
      excel_data.push({
        'Name': this.filtered[i].name,
        'Email': this.filtered[i].email,
        'Mobile': '+' + this.filtered[i].phonecode + this.filtered[i].mobile,
        'Agent': "Partner Agent",
        'Account Number': this.filtered[i].account_number,
        'Address': this.filtered[i].address
      })
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Partner-Agent-list.xlsx'); // initiate a file download in browser
  }
  Delete(data){
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
             this.toastr.success(result['msg'], '', { timeOut: 2000 });
             this.ngOnInit();
         }
         else this.toastr.error(result['msg'], '', { timeOut: 2000 });
      }
    })
  }
}
