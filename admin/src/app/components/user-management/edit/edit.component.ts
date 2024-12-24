import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperModule } from 'ngx-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ValidationsService } from 'src/app/shared/services/validations.service';
import { VariableService } from 'src/app/shared/services/variable.service';
import { CropperSettings, ImageCropperComponent } from "ngx-img-cropper";
import { validationscnfg } from "src/app/validations/validation";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id;
  code;
  EditForm;
  fileType;
  showImg: any = {};
  showHidePass = true;
  submitted;
  image;
  file;
  files;
  imageName;
  cropperSettings: CropperSettings;
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
    public variable: VariableService
  ) {
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
    this.showImg = {};
  }

  ngOnInit(): void {

    this.createaddEditForm();
    this.getCountryCode();
    this.getUserById();
  }

  createaddEditForm() {
    this.EditForm = this.formBuilder.group({
      first_name: ["", this.validations.fisrtname],
      last_name: ["", this.validations.lastname],
      email: ["", this.validations.email],
      password: ["", this.id == 0 ? this.validations.password : ""],
      country_code_id: ["", this.validations.required],
      mobile: ["", this.validations.mobile],
      // profile_img: ["", this.id == 0 ? this.validations.required : ""],
    });
  }
  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true;
  }


  async getCountryCode() {
    let result = await this.http.get(this.apiURL.url.getCountryCode);
    this.code = result["data"];
  }

  closeResult;
  open(modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title" })
      .result.then((result) => {
          // console.log(this.fileType, 'this.fileeeeeeeeeeeMODAL')
          if (this.fileType === '' || this.fileType === null || this.fileType === undefined || this.fileType === 'image/webp') {
            this.toastr.warning("Please Select jpg or jpeg or png extension image!", " ", {
              timeOut: 2000,
            })
            return
          }
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => { 
          if(reason == 'Cross click'){
            this.showImg.image = '';
             this.showImg.image = this.showImg.showMyImg; 
          }else{
            this.showImg.image = ''; 
            if(reason == 0){ this.showImg.image = this.showImg.showMyImg } 
          }
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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


  fileChangeEvent($event) {
    // console.log('filechangeddddddd', $event)
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
      // image.src = loadEvent.target.result;
      // that.cropper.setImage(image);
    };
    // myReader.readAsDataURL(file);

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

  // fileUpload(event) {
  //   this.EditForm.value.profile_img = <File>event.target.files;
  //   this.image = <File>event.target.files[0];
  //   console.log(this.image,"kjhkjhkjhkjh")
  //   this.imageName = event.target.files[0].name;
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event) => {
  //       this.showImg = event.target.result;
  //     };
  //   }
  // }
  // Edit(){}
  async Edit() {
    this.submitted = true;
    if (this.EditForm.invalid) return;
    this.submitted = false;

    if (!this.showImg.image) {
      // console.log(this.showImg.image,'iMAGEififif')
      this.toastr.warning("Profile is required", "", { timeOut: 2000 });
      return;
    }
    if (this.id == 0) await this.dataURItoBlob(this.showImg.image);

    let type = this.showImg.image.split(";");
    let isExist = this.showImg.image.includes(";");
    // console.log("isExist", isExist)
    type = type[0].split("/");
    // console.log("type", type);
    if (this.id != 0 && type[0] == "data:image")
      await this.dataURItoBlob(this.showImg.image);





    const formData: any = new FormData();
    formData.append("first_name", this.EditForm.value.first_name);
    formData.append("last_name", this.EditForm.value.last_name);
    if (this.id == 0) {
      formData.append("password", this.EditForm.value.password);
      formData.append("email", this.EditForm.value.email);
    }
    formData.append("country_code_id", this.EditForm.value.country_code_id);
    formData.append("mobile", this.EditForm.value.mobile);
    formData.append("profile_img", this.file);
    formData.append("added_by", "Admin")
    // formData.append("user_type", );
    let result = await this.http.Post(this.apiURL.url.admineditProfile + this.id, formData);
    // console.log(result, "result")
    if (result["status"]) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
      let localdata = [];
      let localuser_id = localStorage.getItem('user_id');
      localdata.push(JSON.parse(localuser_id));
      this.id = localdata;
      let data = await this.http.get(this.apiURL.url.getUserById + this.id);
      // console.log(data, "data")

      if (this.route.snapshot.queryParams.s) {
        this.router.navigate(['/admin/adminlist'])
      }
      else {
        this.router.navigate(['/dashboard/v1'])
      }

      this.variable.image = data?.data[0]?.profile_img;
      this.variable.adminName = data?.data[0]?.first_name + ' ' + data?.data[0]?.last_name;
    } else this.toastr.error(result["msg"], "", { timeOut: 2000 });

  }

  async getUserById() {
    let localdata = [];
    let localuser_id = localStorage.getItem('user_id');
    localdata.push(JSON.parse(localuser_id));
    this.id = localdata;
    let result = await this.http.get(this.apiURL.url.getUserById + this.id);
    // console.log(result, "result")
    this.EditForm.controls["email"].disable();
    if (result["status"]) {
      this.EditForm.patchValue({
        first_name: result["data"][0].first_name,
        last_name: result["data"][0].last_name,
        email: result["data"][0].email,
        country_code_id: result["data"][0].country_code_id,
        mobile: result["data"][0].mobile,
      });
      this.showImg.image = result["data"][0].profile_img;
      this.showImg.showMyImg = result["data"][0].profile_img;
    } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
  }

  onback() {
    if (this.route.snapshot.queryParams.s) {
      this.router.navigate(['/admin/adminlist'])
    }
    else {
      this.router.navigate(['/dashboard/v1'])
    }
  }
}

