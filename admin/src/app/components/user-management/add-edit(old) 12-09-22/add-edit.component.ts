import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ValidationsService } from "src/app/shared/services/validations.service";
import { HttpService } from "src/app/shared/services/http.service";
import { CommonService } from "src/app/shared/services/common.service";
import { ApiUrlService } from "src/app/shared/services/apiUrl.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CropperSettings, ImageCropperComponent } from "ngx-img-cropper";
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: "app-agent-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AddEditComponent implements OnInit, AfterViewInit {


  modifyDate;
  len;
  len1;
  str;
  str1;
  str2;
  Count;
  newstr;
  newstr1;
  maxl;
  isEnabled;

  addEditForm;
  submitted = false;
  id;
  cropperSettings: CropperSettings;
  // image = null;
  // showImg: any = "";
  imageName;
  code;
  fsa_id = [];
  showHidePass = true;
  autocompletes;
  currentDate = new Date();

  dropdownList = [];
  num = 0;
  accountNumber;
  type;
  user_type;
  croppedImage;
  imagePath;
  file;
  fileType;
  addressObj;
  address;
  latitude;
  longitude;
  is_default;
  @ViewChild("addressSearch", { static: false }) addressSearch: ElementRef;
  @ViewChild("BrokerageaddressSearch", { static: false })
  BrokerageaddressSearch: ElementRef;
  data: any = {};
  @ViewChild("cropper ", { static: false }) cropper: ImageCropperComponent;

  constructor(
    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toastr: ToastrService,
    private http: HttpService,
    private apiURL: ApiUrlService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public common: CommonService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
  ) {
    this.id = route.snapshot.params.id;
    this.type = route.snapshot.params.type;
    this.is_default = route.snapshot.params.is_default;
    this.user_type = localStorage.getItem("user_type");
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
    // console.log(this.cropperSettings, "croperSetting");
    this.getDefaultAgent();
    this.getCountryCode();
    this.getFSA();
    this.createaddEditForm();
    if (this.id != 0) this.getAgentById();
    if (this.id == 0) {
      let result = await this.http.get(this.apiURL.url.getLastId);
      this.accountNumber = this.generateAccountNumber(result["data"][0].lastId);
      console.log('acoountNO',this.accountNumber)
      this.addEditForm.patchValue({ account_number: this.accountNumber });
    }

  }
  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);
    this.getAddress1(this.BrokerageaddressSearch.nativeElement);

  }
  geoCoder:any;

  getAddress1(element:any) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('place',place)
          if (place.geometry === undefined || place.geometry === null) return;
          let address = place['formatted_address'].split(',');
          this.addEditForm.patchValue({
            BrokerageCity : address[0],
            BrokerageProvince : address[1]
          })
        });
      });
    });
  }
  generateAccountNumber(n) {
    let string = "" + n;
    let pad = "000000";
    n =
      this.currentDate.getFullYear() +
      pad.substring(0, pad.length - string.length) +
      string;
    return n;
  }

  open(modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          //  if(this.fileType === '' || this.fileType === null || this.fileType === undefined || this.fileType === 'image/webp'){
          //   this.toastr.warning("Please Select  jpg or jpeg or png extension image!"," ",{
          //     timeOut: 2000,
          //   })
          //   return
          // }
        },
        (reason) => { }
      );
  }
  createaddEditForm() {
    this.addEditForm = this.formBuilder.group({
      // first_name: ["", this.validations.required],
      first_name: ["", this.validations.required],
      last_name: ["", this.validations.required],
      email: ["", this.validations.email],
      // password: ["", this.id == 0 ? this.validations.required : ""],
      password: [""],
      country_code_id: [39, this.validations.required],
      mobile: ["", this.validations.required],
      user_type: [this.type, this.validations.required],
      account_number: ["", this.validations.required],
      fsa_id: [
        this.user_type == "2" ? parseInt(localStorage.getItem("fsa_id")) : "",
        this.validations.required,
      ],
      bio: ["", this.validations.required],
      shortBio: ["", this.validations.required ],
      address: ["", this.validations.required],

      shownOnMap: ["Yes", this.validations.required],
      brokerPhoneNo: ["", this.validations.required],
      textNo: ["", this.validations.required],
      whatsapp: [""],
      messenger: [""],
      wechat: [""],
      facebook: [""],
      website: ["", this.validations.required],
      brokerageName: ["", this.validations.required],
      BrokerageStreetAddress: ["", this.validations.required],
      BrokerageCity: ["", this.validations.required],
      BrokerageProvince: ["", this.validations.required],
      BrokeragePostalCode: ["", this.validations.required],
      parent_id: [""],
    });

  }

  fileChangeEvent($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
       this.fileType = file.type
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      image.src = loadEvent.target.result;
    };
    if (this.fileType === '' || this.fileType === null || this.fileType === undefined || this.fileType === 'image/webp') {
      this.toastr.warning("Please Select  jpg or jpeg or png extension image!", " ", {
        timeOut: 2000,
      })
      return
    }

  }

  // imgUpload(event) {
  //   this.image = <File>event.target.files[0];
  //   let type = this.image.type.split('/');
  //   if (type[0] != 'image') {
  //     this.toastr.warning('Yo can not upload ' + this.image.type + ' !', '', { timeOut: 3000 });
  //     this.image = '';
  //     this.showImg = '';
  //     this.addEditForm.value.image = "";
  //     return;
  //   }
  //   this.addEditForm.value.image = <File>event.target.files[0];

  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event) => {
  //       this.showImg = event.target.result;
  //     };
  //   }
  // }

  showHidePassword() {
    if (this.showHidePass) this.showHidePass = false;
    else this.showHidePass = true;
  }

  async getCountryCode() {
    let result = await this.http.get(this.apiURL.url.getCountryCode);
    this.code = result["data"];
  }
  async getFSA() {
    // if(this.type == 2){
    let result = await this.http.get(this.apiURL.url.getFSA);
    this.dropdownList = result["data"];
    if (this.user_type == "2") this.addEditForm.controls["fsa_id"].disable();
    // }
  }
  async changeAgent(v) {
    let result = await this.http.get("FSAByUserIdData/" + v);
    this.dropdownList = result["data"];
  }
  getDefaultAgentData;
  async getDefaultAgent() {
    let result = await this.http.get("getDefaultAgent");
    this.getDefaultAgentData = result["data"];
  }
  finalemail: any = "";
  async getAgentById() {
    let result = await this.http.get(this.apiURL.url.getAgentById + this.id);

    this.modifyDate = result['data'][0].modify_date

    this.finalemail = result["data"][0].email;
    if (result["status"]) {
      this.addEditForm.patchValue({
        first_name: result["data"][0].first_name,
        // last_name: result["data"][0].last_name,
        last_name:result["data"][0].last_name != '' && result["data"][0].last_name != 'undefined' && result["data"][0].last_name != undefined && result["data"][0].last_name != null && result["data"][0].last_name != 'null' ? result["data"][0].last_name : '',
        email: result["data"][0].email,
        account_number: result["data"][0].account_number,
        country_code_id: result["data"][0].country_code_id,
        mobile: result["data"][0].mobile,
        fsa_id: result["data"][0].fsa_id,
        user_type: result["data"][0].user_type,
        bio: result["data"][0].bio,
        shortBio: result["data"][0].shortBio,
        address: result["data"][0].address == "undefined" ? "" : result["data"][0]?.address,
        password: result["data"][0].password,
        shownOnMap: result["data"][0].shownOnMap,
        brokerPhoneNo:
          result["data"][0].brokerPhoneNo == "null"
            ? ""
            : result["data"][0].brokerPhoneNo,
        textNo:
          result["data"][0].textNo == "null" ? "" : result["data"][0].textNo,
        whatsapp:
          result["data"][0].whatsapp == "null"
            ? ""
            : result["data"][0].whatsapp,
        messenger:
          result["data"][0].messenger == "null"
            ? ""
            : result["data"][0].messenger,
        wechat:
          result["data"][0].wechat == "null" ? "" : result["data"][0].wechat,
        facebook:
          result["data"][0].facebook == "null"
            ? ""
            : result["data"][0].facebook,
        website:
          result["data"][0].website == "null" ? "" : result["data"][0].website,
        brokerageName:
          result["data"][0].brokerageName == "null"
            ? ""
            : result["data"][0].brokerageName,
        BrokerageStreetAddress:
          result["data"][0].BrokerageStreetAddress == "null"
            ? ""
            : result["data"][0].BrokerageStreetAddress,

        BrokerageCity:
          result["data"][0].BrokerageCity == "null"
            ? ""
            : result["data"][0].BrokerageCity,

        BrokerageProvince:
          result["data"][0].BrokerageProvince == "null"
            ? ""
            : result["data"][0].BrokerageProvince,
        BrokeragePostalCode:
          result["data"][0].BrokeragePostalCode == "null"
            ? ""
            : result["data"][0].BrokeragePostalCode,
        parent_id: result["data"][0].parent_id,
      });
      // this.showImg = result["data"][0].profile_img;
      this.data.image = result["data"][0].profile_img;
      console.log(this.data, 'IMAGEDATA')
      this.address = result["data"][0].address;
      this.latitude = result["data"][0].latitude;
      this.longitude = result["data"][0].longitude;

      this.common.mainAddress1.address = result["data"][0].BrokerageCity;
      this.common.mainAddress1.latitude =
        result["data"][0].BrokerageAddressLatitude;
      this.common.mainAddress1.longitude =
        result["data"][0].BrokerageAddressLongitute;
      // if(this.type == 3){
      // this.changeAgent(result['data'][0].parent_id)
      // }
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
  // onkeyup($event) {
  //   let str2 = $event.target.value
  //   this.Count = str2.replace(/ /g, '');
  //   let Count2 = this.Count.length
  //   console.log(Count2, "lenght")
  //   if (Count2 > 19) {
  //     console.log(this.maxl, "lakshya")
  //     this.maxl = 20;
  //   }
  //   else {
  //     this.maxl = false
  //   }
  // }


  async addEdit() {

    this.submitted = true;
    this.str = this.addEditForm.value.shortBio;

          let res = [];
          this.str = this.addEditForm.value.shortBio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
         this.str.map((s) => {
            let trimStr = s.trim();
            if (trimStr.length > 0) {
              res.push(trimStr);
            }
          });
      this.len = res.length;



    // this.newstr = this.str.replace(/ /g, "")
    // this.len = this.newstr.length;
    if (this.len > '20') {
      this.isEnabled = true;
      this.toastr.warning("Short Bio should be less than 20 words", "", { timeOut: 2000 });
      return;
    }
    this.str1 = this.addEditForm.value.bio;
    let res1 = [];
    this.str1 = this.addEditForm.value.bio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
   this.str1.map((s) => {
      let trimStr1 = s.trim();
      if (trimStr1.length > 0) {
        res1.push(trimStr1);
      }
    });
this.len1 = res1.length;
    // this.newstr1 = this.str1.replace(/ /g, "")
    // this.len1 = this.newstr1.length
    if (this.len1 < 21 && this.len1 != 0) {
      this.toastr.warning("Long Bio should be more than 20 words", "", { timeOut: 2000 });
      return;
    }
    this.submitted = true;
    if (this.addEditForm.invalid) return;
    this.submitted = false;
    if (!this.data.image) {
      console.log(this.data.image, 'iMAGEififif')
      this.toastr.warning("Profile is required", "", { timeOut: 2000 });
      return;
    }
    if (this.id == 0) await this.dataURItoBlob(this.data.image);

    let type = this.data.image.split(";");
    let isExist = this.data.image.includes(";");
    console.log("isExist", isExist)
    type = type[0].split("/");
    console.log("type", type);
    if (this.id != 0 && type[0] == "data:image")
      await this.dataURItoBlob(this.data.image);

    if (this.common.mainAddress.address) {
      this.address = this.common.mainAddress.address;
      this.latitude = this.common.mainAddress.latitude;
      this.longitude = this.common.mainAddress.longitude;
    }
    const formData: any = new FormData();
    formData.append("first_name", this.addEditForm.value.first_name);
    formData.append("last_name", this.addEditForm.value.last_name);
    if (this.addEditForm.value.email != this.finalemail) {
      formData.append("email", this.addEditForm.value.email);
    }
    if (this.id == 0) {
      formData.append("password", this.addEditForm.value.password);
    } else {
      // if (this.addEditForm.value.password.length > 0)
      //   formData.append("password", this.addEditForm.value.password);
        if (this.addEditForm.value.password != null )
        formData.append("password", this.addEditForm.value.password);
    }
    console.log(this.addEditForm.value.password,'this.addEditForm.value.password')

    formData.append("country_code_id", this.addEditForm.value.country_code_id);
    formData.append("mobile", this.addEditForm.value.mobile);
    // formData.append("profile_img", this.image);
    formData.append("profile_img", this.file);
    formData.append("account_number", this.addEditForm.value.account_number);
    formData.append("user_type", this.addEditForm.value.user_type);
    formData.append("address", this.address);
    formData.append("latitude", this.latitude);
    formData.append("longitude", this.longitude);
    formData.append("shownOnMap", this.addEditForm.value.shownOnMap);
    formData.append("brokerPhoneNo", this.addEditForm.value.brokerPhoneNo);
    formData.append("textNo", this.addEditForm.value.textNo);
    formData.append("whatsapp", this.addEditForm.value.whatsapp);
    formData.append("facebook", this.addEditForm.value.facebook);
    formData.append("website", this.addEditForm.value.website);
    formData.append("messenger", this.addEditForm.value.messenger);
    formData.append("wechat", this.addEditForm.value.wechat);
    formData.append("brokerageName", this.addEditForm.value.brokerageName);
    formData.append("added_by", "Admin")
    formData.append("BrokerageCity", this.addEditForm.value.BrokerageCity);
    formData.append(
      "BrokerageStreetAddress",
      this.addEditForm.value.BrokerageStreetAddress
    );
    formData.append(
      "BrokerageProvince",
      this.addEditForm.value.BrokerageProvince
    );
    formData.append(
      "BrokeragePostalCode",
      this.addEditForm.value.BrokeragePostalCode
    );
    formData.append("is_default_agent", this.is_default);

    if (this.type == 3) {
      formData.append("parent_id", this.addEditForm.value.parent_id);
    } else {
      formData.append("parent_id", parseInt(localStorage.getItem("user_id")));
    }

    if (this.common.mainAddress1.address) {
      formData.append("BrokerageCity", this.common.mainAddress1.address);
      formData.append(
        "BrokerageAddressLatitude",
        this.common.mainAddress1.latitude
      );
      formData.append(
        "BrokerageAddressLongitute",
        this.common.mainAddress1.longitude
      );
    }

    // if (this.user_type == "2") formData.append("fsa_id", parseInt(localStorage.getItem("fsa_id")));
    // else
    formData.append("fsa_id", this.addEditForm.value.fsa_id);
    formData.append("bio", this.addEditForm.value.bio);
    formData.append("shortBio", this.addEditForm.value.shortBio);
    if (this.addEditForm.value.fsa_id.length > 20) {
      this.toastr.warning("You can not select more than 20 FSA");
    } else {

      let result = await this.http.Post(
        this.apiURL.url.addEditAgent + this.id,
        formData
      );
      if (result["status"]) {
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
        this.router.navigate(["/users/list-default-agent"]);

        // if (this.type == 3) this.router.navigate(["/users/list-partner"]);
        if (this.type == 3)
          // this.router.navigate(["/users/list-partner"]);
          this.router.navigate(["/users/list-default-agent"]);

        if (this.type == 2 && this.is_default == 1)
          this.router.navigate(["/users/list-default-agent"]);
        if (this.type == 2 && this.is_default == 0)
          this.router.navigate(["/users/list-client"]);
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
    }
  };
  async Sendlink(){

    // console.log(this.id,"idfasfjdas")
    let result = await this.http.Post(
      this.apiURL.url.Sendlink + this.id,{id:this.id,profile:'edit'} // 2nd parameter
    );
    if(result["status"]){
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
    }
    console.log(result,'result')
    // console.log(this.id,"lakshyafasf")
  }


































}
