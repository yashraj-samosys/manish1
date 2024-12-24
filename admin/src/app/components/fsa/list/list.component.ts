import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { HttpService } from "../../../shared/services/http.service";
import { ApiUrlService } from "../../../shared/services/apiUrl.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LoaderService } from "src/app/shared/services/loader.service";
import { PageEvent } from "@angular/material/paginator";
import { ValidationsService } from "src/app/shared/services/validations.service";
import { validationscnfg } from "src/app/validations/validation";


@Component({
  selector: "app-my-program-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  filtered = [];
  data;
  useNotAssign = [];
  submitted = false;
  selected;
  assignUserId;
  show_div_list;
  addFsa: FormGroup;
  editFsa: FormGroup;
  confirmResut;
  inputValue;
  index;
  program_id;
  closeResult: string;
  inputs;
  search = "";
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
  @ViewChild("table", { static: false }) table: ElementRef;

  validations_cnfg = validationscnfg


  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public validations: ValidationsService,
    private modalService: NgbModal,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {


    this.addFsaForm();
    this.editFsaForm();





    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        console.log(value, "value");
        // console.log(value)
        this.search = value;
        this.getAgentList();
        // this.filerData(value);
      });
    this.pageSize = 10;
    console.log(this.pageSize, "pageSize");
    this.getAgentList();
  }

  async pageCallback(e) {
    console.log(e, "e");
    this.pageSize = e.pageSize;
    console.log(this.pageSize, "pageSize");
    let isExist = this.isCount.includes(e.offset);
    if (isExist) return;
    this.isCount.push(e.offset);
    this.count = e.offset;
    this.isLoaderShow = false;
    await this.getAgentList();
  }

  reset() {
    this.count = 0;
    this.filtered = [];
    this.search = "";
    this.isCount = [0];
    this.searchControl.patchValue("");
    this.getAgentList();
  }

  searchFilter() {
    this.isLoaderShow = true;
    this.count = 0;
    this.filtered = [];
    this.isCount = [0];
    this.getAgentList();
  }

  // async getAgentList() {
  //   this.isLoaderShow = false;
  //   let result = await this.http.get(this.apiUrl.url.getActiveFSA, {
  //     isLoaderShow: this.isLoaderShow,
  //     search: this.search,
  //     count: this.count,
  //     limit: this.pageSize
  //   });
  //   console.log(result)
  //   // let result = await this.http.get('getActiveFSAWithDefaultAgent');
  //   this.data = [...result["data"]];
  //   this.total = result['total'][0]?.Total;
  //   // console.log(this.data);
  //   // this.filtered = result['data'];
  //   this.filtered = [...this.filtered, ...this.data];
  //   // console.log(this.filtered,'filter')
  // }

  async getAgentList(event?: PageEvent) {
    console.log(event);
    // event.pageSize = this.pageSize
    // event.pageSize = 20;
    // let isExist = this.isCount.includes(event?.pageIndex);
    // if (isExist) return;
    // this.isCount.push(event?.pageIndex);
    this.isLoaderShow = true;
    let result = await this.http.get(this.apiUrl.url.getActiveFSA, {
      search: this.search,
      count: event?.pageIndex || this.count,
      limit: event?.pageSize || this.pageSize,
    });
    console.log(result, "getAgentList=====>>>>");
    this.isLoaderShow = false;

    // let result = await this.http.get('getActiveFSAWithDefaultAgent');
    this.data = [...result["data"]];
    this.total = result["total"][0]?.Total;
    // console.log(this.data);
    this.filtered = result["data"];
    // this.filtered = [...this.filtered, ...this.data];
    // console.log(this.filtered,'filter')
  }
  async viewDefaultAgentFSA(id, index) {
    // console.log(id,'id View-----------')
    let result = await this.http.get("getActiveFSAWithDefaultAgent/" + id);
    // console.log(this.defaultName)
    document.getElementById("agent_show_" + index).innerHTML =
      result["data"].name;
  }


  // scrollOnTop(event: any,table) {
  //   console.log("test", this.table);
  //   console.log(this.table);
  //   console.log(event,'event')
  //   // this.table["scrollTop"] = 0
  //   // console.log(this.table["scrollTop"],'stat')
  //   // window.scrollTo(0, 0);
  //   // window.scroll(0,0);
  //   // this.table.nativeElement.element.scrollTo = 1;
  //   // this.table.offset = 0;
  //   // this.table.bodyComponent.updateOffsetY(0)
  //   debugger
  //   // this.table.element.getElementsByTagName("datatable-body")[0].scrollTop = 1;
  // }

  filerData(val) {
    if (val) val = val.toLowerCase();
    else return (this.filtered = [...this.data]);

    const columns = Object.keys(this.data[0]);
    if (!columns.length) return;

    const rows = this.data.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1)
          return true;
      }
    });
    this.filtered = rows;
  }

  async changeStatus(id, status) {
    let result = await this.http.post("FSAChangeStatus/" + id, {
      status: status,
    });
    if (result["status"]) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });

       this.getAgentList();
    } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
  }


  view(id) {

    this.router.navigate(["/fsa/view", id]);
  }

  export() {
    let excel_data = [];
    for (let i = 0; i < this.filtered.length; i++) {
      excel_data.push({
        Code: this.filtered[i].fsa_code,
        Name: this.filtered[i].fsa_name,
      });
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook, workSheet, "data"); // add the worksheet to the book
    XLSX.writeFile(workBook, "Reports.xlsx"); // initiate a file download in browser
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  modal_dismiss() {
    this.modalService.dismissAll();
    this.addFsa.reset();
    this.submitted = false;

  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }




  async getFsaCodeAndNeighborhood(fsaValue: any, inputId) {
    console.log(fsaValue, inputId, "actionactionactionactionaction");
    fsaValue = fsaValue.toUpperCase();
    (document.getElementById(inputId) as HTMLInputElement).value.toUpperCase();
  }



  editFsaForm() {

    this.editFsa = this.formBuilder.group({
      fsa_code: ["", this.validations.fsacode],
      fsa_name: ["", this.validations.fsaarea],
      nieghborhood: ["", this.validations.fsaarea],
    });
  }


  addFsaForm() {

    this.addFsa = this.formBuilder.group({
      fsa_code: ["", this.validations.fsacode],
      fsa_name: ["", this.validations.fsaarea],
      nieghborhood: ["", this.validations.fsaarea],
    });


  }

  async submitFsa() {

    this.submitted = true;
    if (this.addFsa.invalid) return;
    this.submitted = false;

    this.addFsa.value.fsa_code = this.addFsa.value.fsa_code.toUpperCase();
    let result = await this.http.Post(this.apiUrl.url.checkFsaInAdmin, { fsa_code: this.addFsa.value.fsa_code });
    console.log(this.addFsa.value, '-------------+++---------------', result)
    if (result['data'].length != 0) {
      this.toastr.warning(result["msg"], "", { timeOut: 2000 });
      this.addFsa.patchValue({
        fsa_code: '',

      })
      return;
    }
    else {
      let result = await this.http.Post(this.apiUrl.url.addFSA, this.addFsa.value);
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
      this.modalService.dismissAll()
      this.addFsa.reset();
      this.submitted = false;

    }
  }


  async open1(content, fsa_code) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    let result = await this.http.Post(this.apiUrl.url.checkFsaInAdmin, { fsa_code: fsa_code });
    this.editFsa.patchValue({

      fsa_code: result['data'][0].fsa_code,
      fsa_name: result['data'][0].fsa_name,
      nieghborhood: result['data'][0].nieghborhood
    })

  }


  async editFsaAdmin(id: any, fsa_code: any) {

    this.submitted = true;
    if (this.editFsa.invalid) return;
    this.submitted = false;

    // this.editFsa.value.fsa_code =this.editFsa.value.fsa_code.toUpperCase();

    // let result2 = await this.http.Post(this.apiUrl.url.checkFsaInAdmin,{fsa_code:fsa_code});

    // if(result2['data'].length != 0 && result2['data'][0].fsa_code  == this.editFsa.value.fsa_code){

    // console.log(this.editFsa.value.fsa_code,'-------------+++---------------',result2)
    //   this.toastr.warning(result2["msg"], "", { timeOut: 2000 });
    //   this.editFsa.patchValue({
    //    fsa_code:  '',

    //   })
    // }
    // else{

    //this.editFsa.value.fsa_code =this.editFsa.value.fsa_code.toUpperCase();
    let result = await this.http.Post(this.apiUrl.url.EditFsa + id, this.editFsa.value);
    this.toastr.success(result["msg"], "", { timeOut: 2000 });
    this.modalService.dismissAll()
    this.editFsa.reset();
    this.submitted = false;


    // }

  }




}


