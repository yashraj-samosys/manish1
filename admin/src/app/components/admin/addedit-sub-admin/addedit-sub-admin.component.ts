import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropperSettings } from 'ngx-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ValidationsService } from 'src/app/shared/services/validations.service';
import { Navbar } from '../../../shared/services/navbar';
import { validationscnfg } from "src/app/validations/validation";

@Component({
  selector: 'app-addedit-sub-admin',
  templateUrl: './addedit-sub-admin.component.html',
  styleUrls: ['./addedit-sub-admin.component.scss']
})
export class AddeditSubAdminComponent implements OnInit {

  id;
  code;
  addEditForm;
  showImg: any = "";
  showHidePass = true;
  submitted;
  image;
  imageName;
  navbar = [];
  dropdownList = [];
  selectedItems = [];
  settings = {};
  data1;
  filtered1;
  fileType;
  file;
  data: any;
  cropperSettings: CropperSettings;
  image_file;
  validations_cnfg = validationscnfg



  constructor(
    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toastr: ToastrService,
    private http: HttpService,
    private apiURL: ApiUrlService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,



  ) {
    this.id = route.snapshot.params.id
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.cropperDrawSettings.lineDash = true;
    this.cropperSettings.cropperDrawSettings.dragIconStrokeWidth = 0;
    // this.cropperSettings.width = 700;
    // this.cropperSettings.height = 700;
    this.cropperSettings.croppedWidth = 800;
    this.cropperSettings.croppedHeight = 800;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    // this.cropperSettings.noFileInput = true;
    this.data = {};

  }

  async ngOnInit() {

    this.createaddEditForm();
    this.getCountryCode();
    this.getNavbar();
    if (this.id != 0) this.getUserById();

    this.settings = {
      singleSelection: false,
      text: "Select Page",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass custom-class"
    };
  }

  createaddEditForm() {
    this.addEditForm = this.formBuilder.group({
      user_name: ["", this.validations.fullname],
      email: ["", this.validations.email],
      password: ["", this.id == 0 ? this.validations.password : ""],
      country_code_id: [39],
      mobile: ["", this.validations.mobile],
      pageselect: [[1], this.validations.required],
      // profile_img: ["", this.id == 0 ? this.validations.required : ""],
    });
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true;
  }
  get f() { return this.addEditForm.controls; }

  async getNavbar() {
    let result = [...Navbar]
    result.splice(2, 1)
    this.navbar = result;
  }

  async getCountryCode() {
    let result = await this.http.get(this.apiURL.url.getCountryCode);
    this.code = result["data"];
  }

  fileUpload(event) {
    this.addEditForm.value.profile_img = <File>event.target.files;
    this.image = <File>event.target.files[0];
    this.imageName = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.showImg = event.target.result;
      };
    }
  }
  async addEdit() {
    // console.log(this.addEditForm.value.pageselect);return
    this.submitted = true;
    if (this.addEditForm.invalid) return;
    this.submitted = false;
    const formData: any = new FormData();
    if (!this.data.image) {
      this.toastr.warning("Profile is required", "", { timeOut: 2000 });
      return;
    }
    if (this.id == 0) await this.dataURItoBlob(this.data.image);

    let type = this.data.image.split(";");
    let isExist = this.data.image.includes(";");

    type = type[0].split("/");

    if (this.id != 0 && type[0] == "data:image")
      await this.dataURItoBlob(this.data.image);


    const [first, last] = this.addEditForm.value.user_name.split(' ');
    formData.append("first_name", first);
    formData.append("last_name", last);
    if (this.id == 0) {
      formData.append("password", this.addEditForm.value.password);
      formData.append("email", this.addEditForm.value.email);
    }
    formData.append("country_code_id", this.addEditForm.value.country_code_id);
    formData.append("mobile", this.addEditForm.value.mobile);
    // if (!this.addEditForm.value.pageselect.includes(1)) { this.addEditForm.value.pageselect.push(1) } // Default Deshboard Selection
    formData.append("page_id", this.addEditForm.value.pageselect);

    formData.append("profile_img", this.file);

    formData.append("user_type", 5);
    formData.append("status", 1);
    let result = await this.http.Post(this.apiURL.url.addEditsubadmin + this.id, formData);

    if (result["status"]) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
      this.router.navigate(["/admin/subadminlist"]);
    } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
  }
  async dataURItoBlob(dataURI) {
    await fetch(dataURI)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        this.file = blob;
      });
  }
  async getUserById() {
    let result = await this.http.get(this.apiURL.url.getadminById + this.id);
    let page = result['data'].page_id.split(',')
    let newara = []
    for (let x of page) {
      newara.push(parseInt(x))
    }
    this.addEditForm.controls["email"].disable();
    if (result["status"]) {
      this.addEditForm.patchValue({
        user_name: result["data"].first_name + (result["data"].last_name ? ' ' + result["data"].last_name : ''),
        email: result["data"].email,
        country_code_id: result["data"].country_code_id,
        mobile: result["data"].mobile,
        pageselect: newara,

      });
      this.data.showMyImg = result["data"].profile_img;
      this.data.image = result["data"].profile_img;
    } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
  }


  // fileChangeEvent($event) {
  //   // console.log('filechangeddddddd',$event)
  //   var image: any = new Image();
  //   var file: File = $event.target.files[0];
  //   this.image_file = File = $event.target.files[0];
  //   this.fileType = file.type
  //   var myReader: FileReader = new FileReader();
  //   var that = this;
  //   myReader.onloadend = function (loadEvent: any) {
  //     image.src = loadEvent.target.result;
  //     // console.log(image.src, 'image')
  //     // this.data.image = image.src;
  //     image.src = loadEvent.target.result;
  //     // that.cropper.setImage(image);
  //   };
  //   if (this.fileType === '' || this.fileType === null || this.fileType === undefined || this.fileType === 'image/webp') {
  //     this.toastr.warning("Please Select  jpg or jpeg or png extension image!", " ", {
  //       timeOut: 2000,
  //     })
  //     return
  //   }

  // }

  fileChangeEvent($event) {
    // console.log('filechangeddddddd',$event)
    var image: any = new Image();
    var file: File = $event.target.files[0];
    // console.log(file, 'fileeeeeeee')
    // console.log(file.type, 'fileSELCTED')
    this.fileType = file.type
    // console.log(this.fileType, 'this.fileType')
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // console.log(image.src, 'image')
      // this.data.image = image.src;
      image.src = loadEvent.target.result;
      // that.cropper.setImage(image);
    };
    if (this.fileType === '' || this.fileType === null || this.fileType === undefined || this.fileType === 'image/webp') {
      this.toastr.warning("Please Select  jpg or jpeg or png extension image!", " ", {
        timeOut: 2000,
      })
      return
    }
  }

  closeResult;
  open(modal) {
    this.modalService
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      if(reason == 'Cross click'){
        this.data.image = '';
        this.data.image = this.data.showMyImg;
      }else{
        this.data.image = '';
        if(reason == 0){ this.data.image = this.data.showMyImg } 
      }
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


}
