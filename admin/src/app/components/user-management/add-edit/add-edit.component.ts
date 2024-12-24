import {Component, OnInit, AfterViewInit,ViewChild,ElementRef,ChangeDetectorRef} from "@angular/core";
import { ValidationsService } from "src/app/shared/services/validations.service";
import { HttpService } from "src/app/shared/services/http.service";
import { CommonService } from "src/app/shared/services/common.service";
import { ApiUrlService } from "src/app/shared/services/apiUrl.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CropperSettings, ImageCropperComponent } from "ngx-img-cropper";
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { validationscnfg } from "src/app/validations/validation";

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
  getFSAIdAndData;
  search = "";
  addEditForm;
  submitted = false;
  id;
  cropperSettings: CropperSettings;
  // image = null;
  // showImg: any = "";
  imageName;
  code;
  fsaData: any;
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
  address1;
  latitude;
  longitude;
  is_default;
  FSA_ARR = ["fsa1", "fsa2", "fsa3", "fsa4", "fsa5", "fsa6", "fsa7", "fsa8", "fsa9", "fsa11", "fsa10", "fsa12", "fsa13", "fsa14", "fsa15", "fsa16", "fsa17", "fsa18", "fsa19", "fsa20", "fsa21", "fsa22", "fsa23", "fsa24", "fsa25", "fsa26", "fsa27", "fsa28", "fsa29", "fsa30", "fsa31", "fsa32", "fsa33", "fsa34", "fsa35", "fsa36", "fsa37", "fsa38", "fsa39", "fsa40"];
  fsa_id = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n11", "n10", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"];
  FSA_ARR2 = [{ fsa1: '' }, { fsa2: '' }, { fsa3: '' }, { fsa4: '' }, { fsa5: '' }, { fsa6: '' }, { fsa7: '' }, { fsa8: '' }, { fsa9: '' }, { fsa11: '' }, { fsa10: '' }, { fsa12: '' }, { fsa13: '' }, { fsa14: '' }, { fsa15: '' }, { fsa16: '' }, { fsa17: '' }, { fsa18: '' }, { fsa19: '' }, { fsa20: '' }, { fsa21: '' }, { fsa22: '' }, { fsa23: '' }, { fsa24: '' }, { fsa25: '' }, { fsa26: '' }, { fsa27: '' }, { fsa28: '' }, { fsa29: '' }, { fsa30: '' }, { fsa31: '' }, { fsa32: '' }, { fsa33: '' }, { fsa34: '' }, { fsa35: '' }, { fsa36: '' }, { fsa37: '' }, { fsa38: '' }, { fsa39: '' }, { fsa40: '' }];
  @ViewChild("addressSearch", { static: false }) addressSearch: ElementRef;
  @ViewChild("BrokerageaddressSearch", { static: false })
  BrokerageaddressSearch: ElementRef;
  data: any;
  @ViewChild("cropper ", { static: false }) cropper: ImageCropperComponent;
  getfsaCode: any;
  getagent_byiddata: any;
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
    public common: CommonService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private _snackBar: MatSnackBar, private ref: ChangeDetectorRef

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
    this.getActiveFSAIdAndData();
    this.getActiveFSA();
    if (this.id != 0) this.getAgentById();
    if (this.id == 0) {
      let result = await this.http.get(this.apiURL.url.getLastId);
      this.accountNumber = this.generateAccountNumber(result["data"][0].lastId);
      console.log('acoountNO', this.accountNumber)
      this.addEditForm.patchValue({ account_number: this.accountNumber });
    }

  }
  ngAfterViewInit() {
    this.common.getAddress(this.addressSearch.nativeElement);
    this.getAddress1(this.BrokerageaddressSearch.nativeElement);

  }
  geoCoder: any;

  getAddress1(element: any) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('place', place)
          if (place.geometry === undefined || place.geometry === null) return;
          // let address = place['formatted_address'].split(',');
          // this.addEditForm.patchValue({
          //   BrokerageCity: address[0],
          //   BrokerageProvince: address[1]
          this.address1 = place['formatted_address'].split(',');
          var latlng = { lat: (place.geometry.location.lat()), lng: (place.geometry.location.lng()) };
          this.geoCoder.geocode({ 'location': latlng }, (results, status) => {
            if (status === 'OK') {
              console.log(results)
              if (results[0]) {
                var street = "";
                var city = "";
                var state = "";
                var country = "";
                var zipcode = "";
                for (var i = 0; i < results.length; i++) {
                  if (results[i].types[0] === "locality") {
                    city = results[i].address_components[0].long_name;
                    state = results[i].address_components[2].long_name;
                  }
                  if (results[i].types[0] === "postal_code" && zipcode == "") {
                    zipcode = results[i].address_components[0]?.long_name;
                    city = results[i].address_components[2]?.long_name;
                    state = results[i].address_components[3]?.long_name;
                  }

                  if (results[i].types[0] === "country") {
                    country = results[i].address_components[0]?.long_name;

                  }
                  if (results[i].types[0] === "route" && street == "") {

                    for (var j = 0; j < 4; j++) {
                      if (j == 0) {
                        street = results[i].address_components[j]?.long_name;
                      } else {
                        street += ", " + results[i].address_components[j]?.long_name;
                      }
                    }
                  }
                  if (results[i].types[0] === "street_address") {
                    for (var j = 0; j < 4; j++) {
                      if (j == 0) {
                        street = results[i].address_components[j]?.long_name;
                      } else {
                        street += ", " + results[i].address_components[j]?.long_name;
                      }
                    }
                  }
                }
                if (zipcode == "") {
                  if (typeof results[0].address_components[8] !== 'undefined') {
                    zipcode = results[0].address_components[8]?.long_name;
                  }
                }
                if (country == "") {
                  if (typeof results[0].address_components[7] !== 'undefined') {
                    country = results[0].address_components[7]?.long_name;
                  }
                }
                if (state == "") {
                  if (typeof results[0].address_components[6] !== 'undefined') {
                    state = results[0].address_components[6]?.long_name;
                  }
                }
                if (city == "") {
                  if (typeof results[0].address_components[5] !== 'undefined') {
                    city = results[0].address_components[5].long_name;
                  }
                }
                this.addEditForm.patchValue({
                  BrokerageStreetAddress: this.address1,
                  BrokerageCity: city,
                  BrokerageProvince: country,
                  BrokeragePostalCode: zipcode

                })

                //  this.map_address = {
                //    "street": street,
                //    "city": city,
                //    "state": state,
                //    "country": country,
                //    "zipcode": zipcode,
                //  };
              }
            }
          })
        });
      });
    });
  }

  async getActiveFSA() {
    let data: any = await this.http.post('getActiveFSAStatus/', {})
    this.fsaData = data['data'];
    this.ref.detectChanges();
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
  imageChangedEvent: any = '';

  closeResult;
  open(modal) {
    this.modalService
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      if(reason == 'Cross click'){
        this.data.image = ''; this.croppedImage = '';
         this.data.image = this.data.showMyImg; 
      }else{
        this.data.image = ''; this.croppedImage = '';
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

  createaddEditForm() {
    this.addEditForm = this.formBuilder.group({
      // first_name: ["", this.validations.required],
      first_name: ["", this.validations.fisrtname],
      last_name: ["", this.validations.lastname],
      email: ["", this.validations.email],
      // password: ["", this.id == 0 ? this.validations.required : ""],
      password: ["", this.validations.password],
      country_code_id: [39, this.validations.required],
      mobile: ["", this.validations.mobile],
      user_type: [this.type, this.validations.required],
      account_number: ["", this.validations.maxlength],
      bio: ["", this.validations.notRequired_validator],
      shortBio: ["", this.validations.shortbio],
      address: ["", this.validations.address],
      shownOnMap: ["Yes", this.validations.required],
      brokerPhoneNo: ["", this.validations.mobile],
      textNo: ["", this.validations.textno],
      title: ["", this.validations.fisrtname],
      whatsapp: [""],
      messenger: [""],
      wechat: [""],
      facebook: [""],
      website: ["", this.validations.website],
      brokerageName: ["", this.validations.fullname],
      BrokerageStreetAddress: ["",this.validations.address],
      BrokerageCity: ["", this.validations.postal],
      BrokerageProvince: ["", this.validations.postal],
      BrokeragePostalCode: ["", this.validations.postal],
      parent_id: [""],

      fsa1: [this.user_type == "2" ? parseInt(localStorage.getItem("fsa1")) : "",
      this.validations.fsacode],

      fsa2: [''], fsa3: [''], fsa4: [''], fsa5: [''], fsa6: [''], fsa7: [''], fsa8: [''], fsa9: [''], fsa11: [''],
      fsa10: [''], fsa12: [''], fsa13: [''], fsa14: [''], fsa15: [''], fsa16: [''], fsa17: [''], fsa18: [''],
      fsa19: [''], fsa20: [''], fsa21: [''], fsa22: [''], fsa23: [''], fsa24: [''], fsa25: [''], fsa26: [''],
      fsa27: [''], fsa28: [''], fsa29: [''], fsa30: [''], fsa31: [''], fsa32: [''], fsa33: [''], fsa34: [''],
      fsa35: [''], fsa36: [''], fsa37: [''], fsa38: [''], fsa39: [''], fsa40: [''],
    });

  }
  get f() { return this.addEditForm.controls; }
  fileChangeEvent($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    this.fileType = file.type
    console.log(this.fileType, 'this.fileType')
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
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
    if (this.user_type == "2") this.addEditForm.controls["fsa1"].disable();
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
    this.getagent_byiddata = result
    this.data = result['data'][0]
    // this.addEditForm.controls["email"].disable();
    this.modifyDate = result['data'][0].modify_date

    this.finalemail = result["data"][0].email;

    if (result["status"]) {
      this.addEditForm.patchValue({
        first_name: result["data"][0].first_name,
        // last_name: result["data"][0].last_name,
        last_name: result["data"][0].last_name != '' && result["data"][0].last_name != 'undefined' && result["data"][0].last_name != undefined && result["data"][0].last_name != null && result["data"][0].last_name != 'null' ? result["data"][0].last_name : '',
        email: result["data"][0].email,
        account_number: result["data"][0].account_number != '' && result["data"][0].account_number != null && result["data"][0].account_number != 'null' && result["data"][0].account_number != undefined && result["data"][0].account_number != 'undefined' ? result["data"][0].account_number : '',
        country_code_id: result["data"][0].country_code_id,
        mobile: result["data"][0].mobile,
        user_type: result["data"][0].user_type,
        bio: result["data"][0].bio != null && result["data"][0].bio != 'null' ? result["data"][0].bio : '',
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
        title:
          result["data"][0].title == "null" ? "" : result["data"][0].title,  
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



        fsa1: this.data?.FSAData[0] == undefined ? '' : this.data?.FSAData[0].fsa_code,
        fsa2: this.data?.FSAData[1] == undefined ? '' : this.data?.FSAData[1].fsa_code,
        fsa3: this.data?.FSAData[2] == undefined ? '' : this.data?.FSAData[2].fsa_code,
        fsa4: this.data?.FSAData[3] == undefined ? '' : this.data?.FSAData[3].fsa_code,
        fsa5: this.data?.FSAData[4] == undefined ? '' : this.data?.FSAData[4].fsa_code,
        fsa6: this.data?.FSAData[5] == undefined ? '' : this.data?.FSAData[5].fsa_code,
        fsa7: this.data?.FSAData[6] == undefined ? '' : this.data?.FSAData[6].fsa_code,
        fsa8: this.data?.FSAData[7] == undefined ? '' : this.data?.FSAData[7].fsa_code,
        fsa9: this.data?.FSAData[8] == undefined ? '' : this.data?.FSAData[8].fsa_code,
        fsa10: this.data?.FSAData[9] == undefined ? '' : this.data?.FSAData[9].fsa_code,
        fsa11: this.data?.FSAData[10] == undefined ? '' : this.data?.FSAData[10].fsa_code,
        fsa12: this.data?.FSAData[11] == undefined ? '' : this.data?.FSAData[11].fsa_code,
        fsa13: this.data?.FSAData[12] == undefined ? '' : this.data?.FSAData[12].fsa_code,
        fsa14: this.data?.FSAData[13] == undefined ? '' : this.data?.FSAData[13].fsa_code,
        fsa15: this.data?.FSAData[14] == undefined ? '' : this.data?.FSAData[14].fsa_code,
        fsa16: this.data?.FSAData[15] == undefined ? '' : this.data?.FSAData[15].fsa_code,
        fsa17: this.data?.FSAData[16] == undefined ? '' : this.data?.FSAData[16].fsa_code,
        fsa18: this.data?.FSAData[17] == undefined ? '' : this.data?.FSAData[17].fsa_code,
        fsa19: this.data?.FSAData[18] == undefined ? '' : this.data?.FSAData[18].fsa_code,
        fsa20: this.data?.FSAData[19] == undefined ? '' : this.data?.FSAData[19].fsa_code,
        fsa21: this.data?.FSAData[20] == undefined ? '' : this.data?.FSAData[20].fsa_code,
        fsa22: this.data?.FSAData[21] == undefined ? '' : this.data?.FSAData[21].fsa_code,
        fsa23: this.data?.FSAData[22] == undefined ? '' : this.data?.FSAData[22].fsa_code,
        fsa24: this.data?.FSAData[23] == undefined ? '' : this.data?.FSAData[23].fsa_code,
        fsa25: this.data?.FSAData[24] == undefined ? '' : this.data?.FSAData[24].fsa_code,
        fsa26: this.data?.FSAData[25] == undefined ? '' : this.data?.FSAData[25].fsa_code,
        fsa27: this.data?.FSAData[26] == undefined ? '' : this.data?.FSAData[26].fsa_code,
        fsa28: this.data?.FSAData[27] == undefined ? '' : this.data?.FSAData[27].fsa_code,
        fsa29: this.data?.FSAData[28] == undefined ? '' : this.data?.FSAData[28].fsa_code,
        fsa30: this.data?.FSAData[29] == undefined ? '' : this.data?.FSAData[29].fsa_code,
        fsa31: this.data?.FSAData[30] == undefined ? '' : this.data?.FSAData[30].fsa_code,
        fsa32: this.data?.FSAData[31] == undefined ? '' : this.data?.FSAData[31].fsa_code,
        fsa33: this.data?.FSAData[32] == undefined ? '' : this.data?.FSAData[32].fsa_code,
        fsa34: this.data?.FSAData[33] == undefined ? '' : this.data?.FSAData[33].fsa_code,
        fsa35: this.data?.FSAData[34] == undefined ? '' : this.data?.FSAData[34].fsa_code,
        fsa36: this.data?.FSAData[35] == undefined ? '' : this.data?.FSAData[35].fsa_code,
        fsa37: this.data?.FSAData[36] == undefined ? '' : this.data?.FSAData[36].fsa_code,
        fsa38: this.data?.FSAData[37] == undefined ? '' : this.data?.FSAData[37].fsa_code,
        fsa39: this.data?.FSAData[38] == undefined ? '' : this.data?.FSAData[38].fsa_code,
        fsa40: this.data?.FSAData[39] == undefined ? '' : this.data?.FSAData[39].fsa_code,

      })
      if (this.data?.FSAData[0]) (document.getElementById('n1') as HTMLInputElement).value = this.data.FSAData[0].address;
      if (this.data?.FSAData[1]) (document.getElementById('n2') as HTMLInputElement).value = this.data.FSAData[1].address;
      if (this.data?.FSAData[2]) (document.getElementById('n3') as HTMLInputElement).value = this.data.FSAData[2].address;
      if (this.data?.FSAData[3]) (document.getElementById('n4') as HTMLInputElement).value = this.data.FSAData[3].address;
      if (this.data?.FSAData[4]) (document.getElementById('n5') as HTMLInputElement).value = this.data.FSAData[4].address;
      if (this.data?.FSAData[5]) (document.getElementById('n6') as HTMLInputElement).value = this.data.FSAData[5].address;
      if (this.data?.FSAData[6]) (document.getElementById('n7') as HTMLInputElement).value = this.data.FSAData[6].address;
      if (this.data?.FSAData[7]) (document.getElementById('n8') as HTMLInputElement).value = this.data.FSAData[7].address;
      if (this.data?.FSAData[8]) (document.getElementById('n9') as HTMLInputElement).value = this.data.FSAData[8].address;
      if (this.data?.FSAData[9]) (document.getElementById('n10') as HTMLInputElement).value = this.data.FSAData[9].address;
      if (this.data?.FSAData[10]) (document.getElementById('n11') as HTMLInputElement).value = this.data.FSAData[10].address;
      if (this.data?.FSAData[11]) (document.getElementById('n12') as HTMLInputElement).value = this.data.FSAData[11].address;
      if (this.data?.FSAData[12]) (document.getElementById('n13') as HTMLInputElement).value = this.data.FSAData[12].address;
      if (this.data?.FSAData[13]) (document.getElementById('n14') as HTMLInputElement).value = this.data.FSAData[13].address;
      if (this.data?.FSAData[14]) (document.getElementById('n15') as HTMLInputElement).value = this.data.FSAData[14].address;
      if (this.data?.FSAData[15]) (document.getElementById('n16') as HTMLInputElement).value = this.data.FSAData[15].address;
      if (this.data?.FSAData[16]) (document.getElementById('n17') as HTMLInputElement).value = this.data.FSAData[16].address;
      if (this.data?.FSAData[17]) (document.getElementById('n18') as HTMLInputElement).value = this.data.FSAData[17].address;
      if (this.data?.FSAData[18]) (document.getElementById('n19') as HTMLInputElement).value = this.data.FSAData[18].address;
      if (this.data?.FSAData[19]) (document.getElementById('n20') as HTMLInputElement).value = this.data.FSAData[19].address;
      if (this.data?.FSAData[20]) (document.getElementById('n21') as HTMLInputElement).value = this.data.FSAData[20].address;
      if (this.data?.FSAData[21]) (document.getElementById('n22') as HTMLInputElement).value = this.data.FSAData[21].address;
      if (this.data?.FSAData[22]) (document.getElementById('n23') as HTMLInputElement).value = this.data.FSAData[22].address;
      if (this.data?.FSAData[23]) (document.getElementById('n24') as HTMLInputElement).value = this.data.FSAData[23].address;
      if (this.data?.FSAData[24]) (document.getElementById('n25') as HTMLInputElement).value = this.data.FSAData[24].address;
      if (this.data?.FSAData[25]) (document.getElementById('n26') as HTMLInputElement).value = this.data.FSAData[25].address;
      if (this.data?.FSAData[26]) (document.getElementById('n27') as HTMLInputElement).value = this.data.FSAData[26].address;
      if (this.data?.FSAData[27]) (document.getElementById('n28') as HTMLInputElement).value = this.data.FSAData[27].address;
      if (this.data?.FSAData[28]) (document.getElementById('n29') as HTMLInputElement).value = this.data.FSAData[28].address;
      if (this.data?.FSAData[29]) (document.getElementById('n30') as HTMLInputElement).value = this.data.FSAData[29].address;
      if (this.data?.FSAData[30]) (document.getElementById('n31') as HTMLInputElement).value = this.data.FSAData[30].address;
      if (this.data?.FSAData[31]) (document.getElementById('n32') as HTMLInputElement).value = this.data.FSAData[31].address;
      if (this.data?.FSAData[32]) (document.getElementById('n33') as HTMLInputElement).value = this.data.FSAData[32].address;
      if (this.data?.FSAData[33]) (document.getElementById('n34') as HTMLInputElement).value = this.data.FSAData[33].address;
      if (this.data?.FSAData[34]) (document.getElementById('n35') as HTMLInputElement).value = this.data.FSAData[34].address;
      if (this.data?.FSAData[35]) (document.getElementById('n36') as HTMLInputElement).value = this.data.FSAData[35].address;
      if (this.data?.FSAData[36]) (document.getElementById('n37') as HTMLInputElement).value = this.data.FSAData[36].address;
      if (this.data?.FSAData[37]) (document.getElementById('n38') as HTMLInputElement).value = this.data.FSAData[37].address;
      if (this.data?.FSAData[38]) (document.getElementById('n39') as HTMLInputElement).value = this.data.FSAData[38].address;
      if (this.data?.FSAData[39]) (document.getElementById('n40') as HTMLInputElement).value = this.data.FSAData[39].address;

      this.data.showMyImg = result["data"][0].profile_img;
      this.data.image = result["data"][0].profile_img;
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
    }
    else this.toastr.error(result["msg"], "", { timeOut: 2000 });
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


  async addEdit() {

    this.submitted = true;

    this.str = this.addEditForm.value.shortBio;
    this.newstr = this.str?.replace(/ /g, "")
    this.len = this.newstr?.length
    if (this.len > 20) {
      this.isEnabled = true;
      this.toastr.warning("Short Bio should be less than 20 characters", "", { timeOut: 2000 });
      return;
    }

// **************************************************************************
    // this.str = this.addEditForm.value.shortBio;

    // let res = [];
    // this.str = this.addEditForm.value.shortBio.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    // this.str.map((s) => {
    //   let trimStr = s.trim();
    //   if (trimStr.length > 0) {
    //     res.push(trimStr);
    //   }
    // });
    // this.len = res.length;
    //  console.log(this.len, "this.length")

// ******************************************************************************

    if (this.len > 20) {
      this.isEnabled = true;
      this.toastr.warning("Short Bio should be less than 20 words", "", { timeOut: 2000 });
      return;
    }
    this.str1 = this.addEditForm.value?.bio;
    let res1 = [];
    let charLen = this.str1?.length;
    this.str1 = this.addEditForm.value?.bio?.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
    this.str1?.map((s) => {
      let trimStr1 = s?.trim();
      if (trimStr1.length > 0) {
        res1.push(trimStr1);
      }
    });
    this.len1 = res1.length;

    if(charLen > 0){
      if ( this.len1 < 21){
        this.toastr.warning("Long Bio should be more than 20 words", "", { timeOut: 2000 });
      return;
    }
      else if (this.len1 >200) {
        this.toastr.warning("Long Bio should not be more than 200 words", "", { timeOut: 2000 });
      return
      }

    }

    this.addEditForm.value.email = this.addEditForm.value.email.toLowerCase();

    this.submitted = true;
    if (this.addEditForm.invalid) return;
    this.submitted = false;

    if (!this.data.image) {
      // console.log(this.data.image, 'iMAGEififif')
      this.toastr.warning("Profile is required", "", { timeOut: 2000 });
      return;
    }
    if (this.id == 0) await this.dataURItoBlob(this.data.image);

    let type = this.data.image.split(";");
    let isExist = this.data.image.includes(";");
    type = type[0].split("/");
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

    // if (this.addEditForm.value.email != this.finalemail) {
      formData.append("email", this.addEditForm.value.email);
    // }
    if (this.id == 0) {
      formData.append("password", this.addEditForm.value.password);
    } else {

      if (this.addEditForm.value.password != null)
        formData.append("password", this.addEditForm.value.password);
    }


    formData.append("country_code_id", this.addEditForm.value.country_code_id);
    formData.append("mobile", this.addEditForm.value.mobile);

    formData.append("profile_img", this.file);
    formData.append("account_number", this.addEditForm.value.account_number);
    formData.append("user_type", this.addEditForm.value.user_type);
    formData.append("address", this.address);
    formData.append("latitude", this.latitude);
    formData.append("longitude", this.longitude);
    formData.append("shownOnMap", this.addEditForm.value.shownOnMap);
    formData.append("brokerPhoneNo", this.addEditForm.value.brokerPhoneNo);
    formData.append("textNo", this.addEditForm.value.textNo);
    formData.append("title", this.addEditForm.value.title);
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



    let arr: any = [];
    if (this.addEditForm.value.fsa1) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa1.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa2) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa2.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa3) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa3.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa4) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa4.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa5) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa5.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa6) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa6.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa7) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa7.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa8) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa8.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa9) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa9.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa10) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa10.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa11) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa11.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa12) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa12.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa13) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa13.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa14) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa14.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa15) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa15.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa16) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa16.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa17) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa17.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa18) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa18.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa19) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa19.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa20) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa20.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa21) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa21.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa22) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa22.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa23) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa23.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa24) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa24.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa25) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa25.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa26) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa26.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa27) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa27.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa28) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa28.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa29) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa29.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa30) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa30.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa31) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa31.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa32) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa32.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa33) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa33.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa34) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa34.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa35) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa35.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa36) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa36.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa37) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa37.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa38) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa38.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa39) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa39.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }
    if (this.addEditForm.value.fsa40) { let fsaId = this.getFSAIdAndData.filter(item => item.fsa_code == this.addEditForm.value.fsa40.toUpperCase()); if (fsaId.length != 0) arr.push(fsaId[0].id); }

    formData.append("fsa_id", arr);
    formData.append("bio", this.addEditForm.value.bio != null && this.addEditForm.value.bio != 'null' && this.addEditForm.value.bio != undefined ? this.addEditForm.value.bio : '');
    formData.append("shortBio", this.addEditForm.value.shortBio);

    if (this.addEditForm.value.fsa1.length > 20) {
      this.toastr.warning("You can not select more than 20 FSA");
    } else {

      let result = await this.http.Post(
        this.apiURL.url.addEditAgent + this.id,
        formData
      );
      if (result["status"]) {
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
        this.router.navigate(["/users/list-default-agent"]);


        if (this.type == 3)

          this.router.navigate(["/users/list-default-agent"]);

        if (this.type == 2 && this.is_default == 1)
          this.router.navigate(["/users/list-default-agent"]);
        if (this.type == 2 && this.is_default == 0)
          this.router.navigate(["/users/list-client"]);
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
    }
  };
  async Sendlink() {
    let result = await this.http.Post(
      this.apiURL.url.Sendlink + this.id, { id: this.id, profile: 'edit' }
    );
    if (result["status"]) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
    }
  }


  fsaCodeArr = [];

  async getFsaCodeAndNeighborhood(fsaValue: any, inputId, message: string, action: string) {
    let arr = []
    let duplicates = []
    this.FSA_ARR.forEach(el => {
      if (this.addEditForm.value[`${el}`].toUpperCase()) {
        arr.push(this.addEditForm.value[`${el}`].toUpperCase());
        duplicates = Array.from(new Set(arr.filter((eg, i, ar) => i !== ar.indexOf(eg))))
      }
    });
    this.search = fsaValue;
    let result = await this.http.post(this.apiURL.url.getFsaCodeAndNeighborhood, { fsa_code: this.search, fsaArr: duplicates, isLoaderShow: false });
    if (result['status']) {
      this.getfsaCode = result["data"][0];
      let value = (document.getElementById(inputId) as HTMLInputElement).value = this.getfsaCode.nieghborhood;
    } else {
      let value = (document.getElementById(inputId) as HTMLInputElement).value = '';
      let fsaCodeLength = fsaValue.length;
      if (result['alreadyEntered'] == 1) message = 'This FSA Already Entered';
      if (fsaCodeLength == 3) {
        this._snackBar.open(message, action, { duration: 5000 });
        for (let i = 0; i <= this.fsa_id.length; i++) {
          if (this.fsa_id[i] == inputId) {
            this.addEditForm.patchValue(
              this.FSA_ARR2[i]
            )
          }
        }
      }

    }
    inputId = "";
  }


  async getActiveFSAIdAndData() {
    let data: any = await this.http.post('getActiveFSAIdAndData/', {})
    this.getFSAIdAndData = data['data'];
    console.log(this.getFSAIdAndData, 'this.getFSAIdAndData')

  }




}
