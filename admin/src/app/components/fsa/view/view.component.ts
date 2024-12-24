import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../shared/services/http.service";
import { ApiUrlService } from "../../../shared/services/apiUrl.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PageEvent } from "@angular/material/paginator";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-my-program-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  id;
  data;
  data01;
  dataNeighborhood;
  Fsaurl;
  fsaForm;
  confirmResult;
  Fsa_Name;
  neighborhood_name;
  Submitted = false;
  map: any;
  search = "";
  isLoaderShow = true;
  count = 0;
  hidden: boolean = false;
  hidden01: boolean = false;
  totalFSA;
  totalFSAAgent;
  icon =
    "http://developerdrive.developerdrive.netdna-cdn.com/wp-content/uploads/2013/08/ddrive.png";

  geoJson = "./assets/Canadian_FSA.geojson";
  // geoJson:any;
  // kmljson="https://webixun.com/t2.kml"
  kmljson = "http://localhost/referral/map/Canadian_FSA.geojson";
  iconData = "http://localhost/referral/map/1200px-Reddot-small.svg.png";
  new_zoom = 0;
  user_type: any = "";
  changeNetWork: number = 1;
  addAgentForm: any;
  validation: any;
  confirmResut: any;
  styleFunc(feature: any): any {
    return {
      clickable: true,
      fillColor: "white",
      strokeWeight: 1,
    };
  }

  // initial center position for the map
  lat: number;
  lng: number;
  zoom = 1;
  marker: any;
  mapControls = false;
  total;

  pinMap = 0;
  snackBarRef: any;
  pageIndex: number;
  pageSize: 10;

  // initial center position for the map
  // inputhidden;

  searchControl: FormControl = new FormControl();
  filtered = [];
  constructor(
    private _snackBar: MatSnackBar,
    private toastr: ToastrService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private modalService: NgbModal,
    private webhttp : HttpClient
  ) {
    this.id = this.route.snapshot.params["id"];

  }

  ngOnInit() {

    this.showHideButtons();
    // this.webhttp.get('./assets/Canadian_FSA.geojson').subscribe(mapdata => {
    //   this.geoJson=mapdata;
    //   // this.ref.detectChanges();
    // });
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.filerData(value);
      });
      this.FsaIdNotFound(this.id);
    this.getAgentById(this.id);
    this.fsaAddressById(this.id);
    this.getFSAActiveDefaultAgent();
    this.editForm();
    this.getActiveFSATotal();
    console.log(this.id)
    // this.zoomChange(12)
  }

  openSnackBar(message: string, action: string) {
    // this.snackBarRef = this._snackBar.open(message, action);
    this.snackBarRef = this._snackBar.open(message, action, {
      verticalPosition: "top",
    });
    this.pinMap = 1;
  }
  dismissSnackBar(message: string, action: string) {
    this.snackBarRef = this._snackBar.dismiss();
    this.pinMap = 0;
  }
  editForm() {
    this.fsaForm = this.formBuilder.group({
      fsaname: ["", Validators.required],
      address: ["", Validators.required],
    });
  }
  filerData(val) {
    if (val) val = val.toLowerCase();
    else return (this.filtered = [...this.data01]);

    const columns = Object.keys(this.data01[0]);
    if (!columns.length) return;

    const rows = this.data01.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1)
          return true;
      }
    });
    this.filtered = rows;
  }



  async FsaIdNotFound(id){
  let result = await this.http.get(this.apiUrl.url.fsaById + id);
       if (result['data'].length == 0) {

      Swal.fire({
        text: "FSA Not Found",
        icon: 'warning',
        confirmButtonText: 'Ok'
      }).then(async (result) => {
        this.router.navigate(['/fsa/view/1'])
          this.id=1;
        this.getAgentById(this.id);
        this.fsaAddressById(this.id);
        this.getFSAActiveDefaultAgent();

        this.nextFsabutton = true;
        this.previousFsaButton=false;
      })
    }
}

  async getAgentById(id) {

    let result = await this.http.get(this.apiUrl.url.fsaById + id);
    if (result["status"]) {
      this.data = await result["data"][0];
      this.lat = parseFloat(this.data?.lat);
      this.lng = parseFloat(this.data?.lng);
      this.Fsa_Name = this.data.fsa_name;
      this.fsaForm.patchValue({ fsaname: this.Fsa_Name });
      this.Fsaurl = this.sanitizer.bypassSecurityTrustResourceUrl(
        environment.MapUrl + this.data.fsa_code
      );
    } else
      this.toastr.error("Something went wrong from server/api", "", {
        timeOut: 2000,
      });
  }

  async zoomChange(e: any) {
    console.log(e, "e00000000");
    this.new_zoom = await e;
    this.zoom = await e;
  }

  async fsaAddressById(id) {
    let result = await this.http.get(this.apiUrl.url.fsaAddressById + id);
    this.dataNeighborhood = result["data"][0];
    this.neighborhood_name = this.dataNeighborhood?.nieghborhood;
    this.fsaForm.patchValue({ address: this.neighborhood_name });
  }

  async getFSAActiveDefaultAgent(event?: PageEvent) {
    // let result = await this.http.get(this.apiUrl.url.getFSAActiveDefaultAgent + this.id);
    let result = await this.http.get(
      this.apiUrl.url.getFSAActiveDefaultAgent + this.id,
      {
        search: this.search,
        count: event?.pageIndex || this.count,
        limit: event?.pageSize || 10,
        isLoaderShow: false
      }
    );
    this.total = result.total;
    if (result["status"]) {
      this.data01 = [...result["data"]];
      this.filtered = this.data01;
      this.totalFSAAgent = result['totalFSAAgent']
    }
  }

  async changeStatus(id, row, isDefault) {
    // let status01 = this.filtered.map((val) => {
      let status01 = this.totalFSAAgent.map((val) => {
      if (
        val.user_type == 2 &&
        val.is_default_agent == 1 && val.activate_status == 1
      ) {
        return true;
      } else {
        return false;
      }
    });
    let isExist = status01.includes(true);
    if (isExist && isDefault == 2) {
      this.toastr.warning("Please Deactivate Default Agent!", "", {
        timeOut: 2000,
      });
      return;
    }
    Swal.fire({
      text: this.totalFSAAgent.length != 1 ? "Are you sure want to Change Agent ?" : isDefault == 2 ?  "Are you sure want to make Default agent!" : "Are you sure want to remove Default agent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed == true) {
        var user_id_default = this.data01[0].id;
        // let result = await this.http.post("changeFSAAgentStatus/" + row.id, {
        //   fsa_id: this.id,
        //   id: row.id,
        //   status: status,
        //   user_type: row.user_type,
        //   is_default_agent: row.is_default_agent,
        //   fsa_status: row.activate_status,
        //   user_id_default: user_id_default,
        // });
        let fsa_status = row.activate_status == 1 && row.is_default_agent == 1 && row.user_type == 2 ? 1 : 0
        let result = await this.http.post('changeFSAAgentStatus/' + row.id, {fsa_id:this.id, id: row.id, status:  status, user_type: row.user_type, is_default_agent: row.is_default_agent, fsa_status: fsa_status, user_id_default: user_id_default });
        this.getFSAActiveDefaultAgent();
        // this.ngOnInit()
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
      } else {
        // this.toastr.error('Default Agent Change Failed', '', { timeOut: 2000 });
      }
    });
  }
  async getActiveFSATotal(){
    let result = await this.http.get(this.apiUrl.url.getActiveFSATotal);
    this.totalFSA = result.data[0].total;
    // this.totalFSA = result.total.Total;
  }


  edit() {
    this.hidden = true;
  }
  edit01() {
    this.hidden01 = true;
  }


  view(id, type) {
    this.router.navigate(["/users/view", id, type]);
  }

nextFsabutton=true;
previousFsaButton=true;


async showHideButtons() {

  let result0 = await this.http.post(this.apiUrl.url.getFsaPrevious ,{id:this.id});
  if (result0['data'].length == 1)
   { this.previousFsaButton = true }
  else { this.previousFsaButton = false }


  let result1 = await this.http.post(this.apiUrl.url.getFsaNext ,{id:this.id});
  if (result1['data'].length == 1)
   { this.nextFsabutton = true }
  else { this.nextFsabutton = false }


}
  async next(id) {

    this.previousFsaButton=true;
    let result = await this.http.Post(this.apiUrl.url.getFsaNext ,{id :id});
    let newid=result['data'][0].id;
    if(result['data'].length > 0 ){

    this.router.navigate(['/fsa/view/' + newid ]);
    this.getAgentById(newid);
    this.id = newid;
    this.getFSAActiveDefaultAgent();
    this.fsaAddressById(newid)

      let result2 = await this.http.Post(this.apiUrl.url.getFsaNext ,{id :result['data'][0].id});

      if(result2['data'].length == 0 ){
        this.nextFsabutton=false;
      }
    }
  }



  async pervious(id){

    this.nextFsabutton=true;
    let result = await this.http.Post(this.apiUrl.url.getFsaPrevious ,{id :id});
    let newid=result['data'][0].id;

    if(result['data'].length > 0 ){
    this.router.navigate(['/fsa/view/' + newid ]);
    this.getAgentById(newid);
    this.id = newid;
    this.getFSAActiveDefaultAgent();
    this.fsaAddressById(newid)

    let result2 = await this.http.Post(this.apiUrl.url.getFsaPrevious ,{id :result['data'][0].id});

    if(result2['data'].length == 0 ){
      this.previousFsaButton=false;
    }
  }
  }


  fsaName(content, data) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        keyboard: false,
        backdrop: "static",
      })
      .result.then(
        (result) => {
          this.confirmResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.confirmResult = `Dismissed with: ${reason}`;
        }
      );
  }

  async FSAnameSubmit() {
    this.hidden = false;
    this.Submitted = true;
    let fsa_name = this.fsaForm.value.fsaname;
    let result = await this.http.Post(this.apiUrl.url.editFSAName + this.id, {
      fsa_name,
    });
    this.getAgentById(this.id);
  }
  async NeighborhoodSubmit() {
    this.hidden01 = false;
    this.Submitted = true;
    var id = this.dataNeighborhood.id;
    let address01 = this.fsaForm.value.address;
    let result = await this.http.Post(this.apiUrl.url.neighborhood + this.id, {
      address: address01,
    });
    this.fsaAddressById(id);
  }

  // applyFilter(filter:any){

  // }

  async applyFilter(filterValue: string) {
    this.search = filterValue;
    this.getFSAActiveDefaultAgent();
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
        Mobile: "+" + 1 + this.filtered[i].mobile,
        Agent:
          this.filtered[i].user_type == 2 ? "Default Agent" : "Partner Agent",
        "Account Number": this.filtered[i].account_number,
        Address: this.filtered[i].address,
      });
    }
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    XLSX.utils.book_append_sheet(workBook, workSheet, "data"); // add the worksheet to the book
    XLSX.writeFile(workBook, "FSA_Default_Agent_List.xlsx"); // initiate a file download in browser
  }

  /**************************************************************************/
  // styleFunc(feature: any): any {
  //   return {
  //     clickable: true,
  //     fillColor: 'white',
  //     strokeWeight: 1,
  //   };
  // }
  async eventLayer(clickEvent: any) {
    if (this.pinMap == 1) {
      Swal.fire({
        text: "Are you sure want to pin this location ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result: any = await this.http.post("updateFsaLatLong", {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng(),
            fsa_id: this.id,
          });
          if (result["status"] == true) {
            this.toastr.success(result["msg"]);
            this.pinMap = 0;
            this.snackBarRef.dismiss();
            // this.router
            //   .navigateByUrl('/session/login', { skipLocationChange: true })
            //   .then(() => {
            //     this.router.navigate(['fsa/view'+this.id]);
            //   });
            this.ngOnInit();
          }
        } else {
          this.pinMap = 0;
          this.snackBarRef.dismiss();
        }
      });
    }
  }
}
