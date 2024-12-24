import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ValidationsService } from "src/app/shared/services/validations.service";
import { HttpService } from "src/app/shared/services/http.service";
import { ApiUrlService } from "src/app/shared/services/apiUrl.service";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { dateLessThan } from './validation/date.validation';
// import { HighContrastMode } from '@angular/cdk/a11y';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { CropperSettings } from 'ngx-img-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import * as moment from 'moment';
@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.scss']
})
export class AdvertismentComponent implements OnInit {

  advertismentForm;
  submitted = false;
  data;
  data01;
  file;
  cropperSettings: CropperSettings;

  startdate;
  enddate;

  id;
  image = null;
  showImg: any = "";
  imageName;
  code;
  fsa_id = [];
  showHidePass = true;
  autocompletes;


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings01 = {};
  form: FormGroup;
  d1;
  d2;
  c;
  D;
  sDate;
  eDate;
  daterange;
  DBstartDate;
  DBEndDate;
  minDate = new Date();
  deletevalue: "row.id";
  cropper = {
    x1: 100,
    y1: 100,
    x2: 300,
    y2: 200
  }

  constructor(
    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toastr: ToastrService,
    private http: HttpService,
    private apiURL: ApiUrlService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal

  ) {
    this.id = route.snapshot.params.id;

    // console.log("id is:", this.id);
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.form = formBuilder.group({
      url: ['', [Validators.required, Validators.pattern(reg)]]
    });

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.cropperDrawSettings.lineDash = true;
    this.cropperSettings.cropperDrawSettings.dragIconStrokeWidth = 0;
    // this.cropperSettings.croppedWidth = 800;cropperStaticWidth
    // this.cropperSettings.croppedHeight = 800;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.data01 = {};
  }

  ngOnInit() {
    console.log(this.minDate)
    this.getCountryCode();
    // this.getDateRange();
    this.getAdvertisementById();
    // this.getDate();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "fsa_code",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 8,
      allowSearchFilter: true,
    };
    this.startdate = new Date()
    this.advertismentForm = this.formBuilder.group({
      startdate: ''
    });

    this.getFSA();
    if (this.id != 0) this.getAgentById();
    this.createaddEditForm();

  }
  async getAdvertisementById() {
    // console.log("id", this.id)
    let result = await this.http.get(this.apiURL.url.getAdvertisementById + this.id);
    // this.advertismentForm.controls["email"].disable();
    if (result["status"]) {
      this.data = result["data"][0];
      this.advertismentForm.patchValue({
        panel_type: this.data.panelType,
        startdate: new Date(this.data.StartDate),
        enddate: new Date(this.data.EndDate),
        // image: this.data01.image,
        Link: this.data.Link,
        user_type: this.data.Type
      });
      this.advertismentForm.controls['panel_type'].disable();
      this.advertismentForm.controls['user_type'].disable();
      this.data01.image = this.data.profile_img;
      this.url = this.data.profile_img;
    }
    // else this.toastr.error(result["msg"], "", { timeOut: 2000 });
  }

  createaddEditForm() {
    this.advertismentForm = this.formBuilder.group({
      user_type: [2, this.validations.required],
      panel_type: [1, this.validations.required],
      startdate: ['', this.validations.required],
      enddate: ['', this.validations.required],
      image: ["", this.id == 0 ? this.validations.required : ""],
      Link: ['', this.validations.required],
    }, { validators: dateLessThan('startdate', 'enddate') });
  }


  fileUpload(event) {
    this.advertismentForm.value.image = <File>event.target.files;
    this.image = <File>event.target.files[0];
    this.imageName = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        this.showImg = event.target.result;
      };
    }
  }

  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true;
  }

  async getCountryCode() {
    let result = await this.http.get(this.apiURL.url.getCountryCode);
    this.code = result["data"];
  }

  async getFSA() {
    let result = await this.http.get(this.apiURL.url.getFSA);
    this.dropdownList = result["data"];
  }

  async getAgentById() {

  }

  open(modal) {
    if (this.advertismentForm.value.panel_type == 1) {
      this.cropperSettings.croppedWidth = 222;
      this.cropperSettings.croppedHeight = 446;
    } else if (this.advertismentForm.value.panel_type == 2) {
      this.cropperSettings.croppedWidth = 222;
      this.cropperSettings.croppedHeight = 185;
    }
    else if (this.advertismentForm.value.panel_type == 3) {
      this.cropperSettings.croppedWidth = 222;
      this.cropperSettings.croppedHeight = 175;
    } else {
      this.toastr.warning("Select panel type!", "", { timeOut: 2000 });
      return;
    }
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => { }, (reason) => { });
  }
  // async getDateRange() {
  //  // alert("List function")
  //   let result = await this.http.get(this.apiURL.url.getDateRange);
  //   // console.log("getDateRange is:",result)
  //   this.daterange = result["data"][0].DBdateRange;
  //   //  console.log('******',this.daterange)
  //   this.DBstartDate = this.daterange[0].DB_StartDate
  //   this.DBEndDate = this.daterange[0].DB_EndDate
  //   console.log('DBstartDate======', this.DBstartDate)
  //   console.log('DBEndDate======', this.DBEndDate)
  // }

  blanckImg() {
    if (this.data01.image) this.data01.image = "";
  }
  async dataURItoBlob(dataURI) {
    await fetch(dataURI)
      .then(res => { return res.blob() })
      .then(blob => { this.file = blob; })
  }

  async addEditAdvertisement() {
    let result = await this.http.get(this.apiURL.url.getDateRange);
    this.daterange = result["data"][0].DBdateRange;
    this.DBstartDate = this.daterange[0].DB_StartDate;
    this.DBEndDate = this.daterange[0].DB_EndDate;
    // console.log('DBstartDate======', this.DBstartDate)
    // console.log('DBEndDate======', this.DBEndDate)
    // console.log('startDate======', this.startdate)
    // console.log('EndDate======', this.enddate)
    // console.log("Result data is:", result);
    // console.log("Value of the delete row is:", this.deletevalue)


    // this.getDateRange();
    this.submitted = true;
    if (this.advertismentForm.invalid) return;
    this.submitted = false;

    // if (!this.data01.image) {
    //   this.toastr.warning("Image is required", "", { timeOut: 2000 });
    //   return;
    // }

    // if (this.id == 0) await this.dataURItoBlob(this.data01.image);
    // let type = this.data01.image.split(';');
    // type = type[0].split('/');
    // if (this.id != 0 && type[0] == "data:image") await this.dataURItoBlob(this.data01.image);

    //&& new Date(this.advertismentForm.value.startdate) > new Date()
    if (new Date(this.advertismentForm.value.startdate) <= new Date(this.advertismentForm.value.enddate)) {
      //alert('outer if')

      // if (this.advertismentForm.value.startdate <= this.DBstartDate &&  this.advertismentForm.value.enddate < this.DBstartDate ||
      //   this.advertismentForm.value.startdate > this.DBEndDate &&
      //  this.advertismentForm.value.enddate > this.DBEndDate) {
      //  alert('Inner if')
      const formData: any = new FormData();
      formData.append("Type", this.id == 0 ? this.advertismentForm.value.user_type : this.data.Type);
      formData.append("panelType", this.id == 0 ? this.advertismentForm.value.panel_type : this.data.panelType);
      formData.append("StartDate", this.advertismentForm.value.startdate);
      formData.append("EndDate", this.advertismentForm.value.enddate);
      formData.append("Link", this.advertismentForm.value.Link);
      formData.append("profile_img", this.image);

      let result = await this.http.Post(this.apiURL.url.addEditAdvertisement + this.id, formData);
      console.log("Result data is:", result);
      if (result["status"]) {
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
        this.router.navigate(["/advertisement/list"]);
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
      // }
      // else {
      //   alert('This date range is already exist !!')
      // }
    }


    else {
      // alert('Start date can`t be greater than End date !! & Start date should be greater than today')
      this.submitted = false;
    }


    if (new Date(this.advertismentForm.value.startdate) >= new Date(this.advertismentForm.value.enddate)) {
      // alert("can't select the privious date");
    }


    //api is added at
    // let result = await this.http.Post('addAdvertisement/'+0, formData);//by sir

    // while (this.advertismentForm.startdate != 0) {
    //   if (new Date(this.advertismentForm.value.startdate) >= new Date(this.advertismentForm.value.enddate)) {
    //     // alert('if')
    //     alert('Start date can`t be greater than End date')
    //     console.log('while if input=', this.advertismentForm.value.startdate)
    //   }
    //   break;
    // }

  }

  // getDate() {
  //   var date: any = new Date();
  //   var toDate: any = date.getDate();
  //   if (toDate < 10) {
  //     toDate = '0' + toDate;
  //   }
  //   var mounth: any = date.getMonth() + 1;
  //   if (mounth) {
  //     mounth = '0' + mounth;
  //   }
  //   var year = date.getFullYear()
  //   this.minDate = year + "-" + mounth + "-" + toDate;
  // }


  link(arg0: string, link: any) {
    throw new Error("Method not implemented.");
  }

  url = "./assets/images/gallery1.webp";

  onselectFile(deepak) {
    // alert("gnfjb")
    // console.log("fhrg");
    if (deepak.target.files) {
      var render = new FileReader();
      render.readAsDataURL(deepak.target.files[0]);
      render.onload = (event: any) => {
        this.url = event.target.result;
        // console.log("url is",this.url); 
      }
    }
  }
}
