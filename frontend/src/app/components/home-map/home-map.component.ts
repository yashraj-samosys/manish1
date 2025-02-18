import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { MapsAPILoader, AgmZoomControl } from '@agm/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { ClientRegistrationComponent } from '../client-registration/client-registration.component';
import { validationscnfg } from '../validations/validation';
import * as Aos from 'aos';



// ::ng-deep .gm-ui-hover-effect {
//   top: 6px !important;
//   right: 10px !important;
// }

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent implements OnInit {
  cross_btn = ''
  readMore: any = [];
  iframeUrl: any =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22962.969975650245!2d-77.8874007614401!3d43.99305077005489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d675b24186c3fb%3A0x5b6d9b94264026bb!2sColborne%2C%20ON%20K0K%201S0%2C%20Canada!5e0!3m2!1sen!2sin!4v1620636314034!5m2!1sen!2sin';
  // lat:any;
  // lng:any;
  title = 'My first AGM project';
  lat = 55.1304;
  lng = -90.3468;
  zoom = 4;
  submitted = false;
  getFSAIdAndData: [];
  statusDataRequest;
  expireDateStatus;
  validations_cnfg = validationscnfg


  exData;
  ResData;
  statusData;
  // geoJson = './assets/Canadian_FSA.geojson';

  // geoJson="http://localhost/referral/map/Canadian_FSA.geojson"
  // kmljson="https://webixun.com/t2.kml"
  kmljson = 'http://localhost/referral/map/Canadian_FSA.geojson';
  iconData = 'http://localhost/referral/map/1200px-Reddot-small.svg.png';
  new_zoom = 0;
  user_type: any = '';
  changeNetWork: any = 1;
  // mapLoaderDiv:any = true;
  addAgentForm: any;
  receiverData: any;

  validation: any;
  confirmResut: any;
  defaultAgetDetail;
  fsa;
  popupData;
  agentForm: FormGroup;
  agentList;
  refer_type;

  styleFunc(feature: any): any {
    return {
      clickable: true,
      fillColor: 'white',
      strokeWeight: 1,
    };
  }


  @ViewChild('addressSearch', { static: false }) addressSearch: any;
  getCenterLocationData: any = [];
  requestStatus: any;
  requestStatusMap: any;
  x: any;
  userType: any;
  Agent: any;
  showMarker = 2;
  hideLoader = 0;
  getemail;
  advertisment: any = [];
  closeResult: string;
  userId = localStorage.getItem('userid');
  Usertype = localStorage.getItem('type');
  is_default_agent = localStorage.getItem('is_default_agent');
  constructor(
    private _snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private http: HttpService,
    public common: CommonService,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ref: ChangeDetectorRef,
    private router: Router,

    public translate: TranslateService,
    private formbuilder: FormBuilder,
    private validataion: ValidationsService,
    private apiURL: ApiUrlService
  ) {
    // translate.setDefaultLang('en');
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
  get f() { return this.addAgentForm.controls; }
  get f2() { return this.agentForm.controls; }


  async ngOnInit() {


    this.x = localStorage.getItem("profile_status");
    this.userType = localStorage.getItem("type");
    this.getemail = localStorage.getItem("email");
    if (window.location.href.split('home/')[1] != undefined) {
      // this.changeNetWork=atob(window.location.href.split('home/')[1]);
      this.changeNetWork = window.location.href.split('home/')[1];
    }
    if(localStorage.getItem('changeNetWork')){
      this.changeNetWork = localStorage.getItem('changeNetWork')
    }

    this.ResData = await this.http.post('getProfileData/' + localStorage.getItem('userid'), {})

    this.apiURL.editProfile = this.ResData["data"][0]?.profile_img
    this.apiURL.nameProfile = this.ResData["data"][0]?.first_name + ' ' + ((this.ResData["data"][0]?.last_name == 'null' || this.ResData["data"][0]?.last_name == null || this.ResData["data"][0]?.last_name == 'undefined' || this.ResData["data"][0]?.last_name == undefined) ? '' : this.ResData["data"][0]?.last_name)
    this.sendReferralForm();
    this.getAdvertisment();
    this.threeDefaultAgent();
    this.getFSA();
    this.getAllAgentsName();

    if (localStorage.getItem('type') != null) {
      if (
        localStorage.getItem('type') == '2' ||
        localStorage.getItem('type') == '3'
      ) {
        let userData: any = await this.http.post(
          'getProfileData/' + localStorage.getItem('userid'),
          {}
        );
        if (
          userData['data'][0]?.pinMapLat != null &&
          userData['data'][0]?.pinMapLng != null
        ) {
          this.lat = parseFloat(userData['data'][0].pinMapLat);
          this.lng = parseFloat(userData['data'][0].pinMapLng);
          this.zoom = 5;
          this.getCenterLocationData.push({
            lat: this.lat,
            lng: this.lng,
            stype: 'pin',
          });
          this.ref.detectChanges();
        }
      }
    }
    this.addAgentFormValue()

    if (this.x == 0 && this.userType == 3) {
      this.router.navigate(["edit-profile"]);
    }

    // setTimeout(() => {
    this.getCenterLocation();
    // }, 4000);


    this.iframeUrl = environment.MapUrl + localStorage.getItem('userid') + '&address=&name';


    if (this.ResData["data"][0]?.user_type == 4) {
      this.cross_btn = 'cross_BTN'
    }
    if (!this.ResData["data"][0]?.user_type) {
      this.cross_btn = 'cmn_BTN'
 
    }
  }


  mapReady(map: { setOptions: (arg0: { zoomControl: string; zoomControlOptions: { position: google.maps.ControlPosition; }; }) => void; }) {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      }
    });
  }

  async ngOnDestroy() {
    this.http.stopRequest.next();
    this.http.stopRequest.complete();
  }




  async changeMap(status: number) {
    if (status == 2) {

      // var homeId = btoa("2")

      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/2']);
      });

    } else {
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });

    }
    this.http.stopRequest.next();
    this.showMarker = 2;
    let res: any = await this.http.post('checkMapAgentExist', {
      user_id: this.userId,
    });
    if (!res.status && status == 2) {
      this.toastr.warning('', res.msg, { timeOut: 1000 });
    }
    this.getCenterLocationData = [];
    this.changeNetWork = status;
    this.getCenterLocation();
    this.ref.detectChanges();
  }

  async addToMap(id: any, gm: any) {

    let res: any = await this.http.post('addToMap', {
      agent_id: id,
      user_id: this.userId,
    });
    if (res.status) {
      gm.lastOpen.close();
      this.toastr.success('', res.msg, { timeOut: 1000 });

    } else {
      gm.lastOpen.close();
      this.toastr.error('', res.msg, { timeOut: 1000 });
    }
  }

  async DeleteAgent(agentData: any, id: any, gm: any) {
    let res: any = await this.http.post('DeleteAgentFromMap', {
      agent_id: id,
      user_id: this.userId,
      fsa_id: agentData.fsa_id
    });
    if (res.status) {
      this.resetMap()
      // this.ngOnInit();
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/2']);
      });
      gm.lastOpen.close();
      this.toastr.success('', res.msg, { timeOut: 1000 });
    } else {
      gm.lastOpen.close();
      this.toastr.error('', res.msg, { timeOut: 1000 });
    }
  }

  open(url: any) { }

  async getAdvertisment() {
    let res: any = await this.http.get("getAdvertismentByType/" + localStorage.getItem('type'));
    if (res.status) {
      this.advertisment = res.data;
    }
  }

  async updateAdvertismentCount(id: number, count: number, url: any) {
    let res: any = await this.http.post('updateAdvertismentCount', {
      id: id,
      click_count: count,
    });
    const win = window.open(url, '_blank');
  }

  icon = {
    url: 'http://developerdrive.developerdrive.netdna-cdn.com/wp-content/uploads/2013/08/ddrive.png',
  };




  pinMap = 0;
  snackBarRef: any;
  openSnackBar(message: string, action: string) {
    this.snackBarRef = this._snackBar.open(message, action);
    this.pinMap = 1;

    this.toastr.warning("Please Double Click on Map to Pin")
    // this.eventLayer(e);
  }


  ngAfterViewInit() {
    // setTimeout(() => {
    // this.mapLoaderDiv = false;
    // this.changeNetWork = 1;
    // console.log('YES DONEEEEEEEEEEEEEEEEE')
    // }, 10000);
    // this.getNearByAgents(this.lat,this.lng)
    // this.getNearByAgents('47.6114', '-52.722447')
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.addressSearch.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let s: any = place.geometry;

          this.lat = s.location.lat();
          this.lng = s.location.lng();
          this.zoom = 10;


        });
        this.zoomChange(this.zoom);
      });
    });
    this.resetMap()
  }

  async threeDefaultAgent() {
    let agent_data: any = await this.http.post('threeDefaultAgent', {
      loginid: localStorage.getItem('userid'),
    });
    this.Agent = agent_data.data;
    for (let i = 0; i < this.Agent.length; i++) {
      this.statusData = this.Agent[i].statusData;
    }
    // this.statusData = this.Agent[1].statusData;

  }

  async getNearByAgents(lat: any, lng: any) {
    let result: any = await this.http.post('GetDefaultAgentByLatLong', {
      lat: lat,
      lng: lng,
      loginid: localStorage.getItem('userid'),
      isLoaderShow: false,

    });
    this.Agent = result.data;
    this.requestStatus = this.Agent[0]?.requestShowStatus;
    this.statusDataRequest = this.Agent[0]?.statusDataRequest;
    this.ref.detectChanges();
  }

  async getCenterLocationNew() {
    let d2: any = await this.http.post('getDefaultAgentOnMap', {
      isLoaderShow: false,
    });
    this.getCenterLocationData = d2['data'];

    this.ref.detectChanges();
  }



  // async getCenterLocation() {


  //   let activeFSAData;

  //       // If data is not cached, fetch it from the API
  //       let activeFSA: any = await this.http.post1('getActiveFSAForMap', {});
  //       activeFSAData = activeFSA['data'];
  //       // Cache the activeFSAData
  //       localStorage.setItem('activeFSAData', JSON.stringify(activeFSAData));

  //       var a = activeFSA.fsaArr; // activeFSA.fsaArr.length = 1682
  //       var arrays = [], size = Math.round((activeFSA.fsaArr.length)/40);
  //       while (a.length > 0) arrays.push(a.splice(0, size));
  //       // Array to hold all promises for parallel execution
  //       let promises = [];

  //       for (let i = 0; i < arrays.length; i++) {
  //           promises.push(
  //               this.http.post1('getDefaultAgentPost', {
  //                   fsa: arrays[i],
  //                   isLoaderShow: false,
  //                   user_id: this.userId,
  //                   user_type: this.Usertype,
  //                   changeNetWork: this.changeNetWork,
  //               })
  //           );
  //       }
  //       // Execute all promises simultaneously
  //       let responses = await Promise.all(promises);
  //       // Iterate through responses and update data
  //       for (let i = 0; i < 1; i++) {
  //           if (responses[i]['status'] == true) {
  //               this.getCenterLocationData = [
  //                   ...this.getCenterLocationData,
  //                   ...responses[i]['data'],
  //               ];
  //               this.ref.detectChanges();
  //           }
  //       }
  //       console.log(this.getCenterLocationData.length,'getCenterLocationData.length')
  //       this.hideLoader = 1;

  //   this.ref.detectChanges();


  // }
  async getCenterLocation(reset = false) {
    try {
      let activeFSAData;
      // If data is not cached, fetch it from the API
      let activeFSA: any = await this.http.post1('getActiveFSAForMap', {});
      activeFSAData = activeFSA['data'];
      // Cache the activeFSAData
      localStorage.setItem('activeFSAData', JSON.stringify(activeFSAData));
      if (reset == true) {
        if (this.changeNetWork == '2') {
          localStorage.removeItem('mapPointerDataPrivate')
        } else {
          localStorage.removeItem('mapPointerDataPublic')
        }
      }

      // let mapData = await this.common.get('mapPointerDataPublic') // get from cache   

      let mapData = this.changeNetWork == '1' ? localStorage.getItem('mapPointerDataPublic') : localStorage.getItem('mapPointerDataPrivate');
      mapData = JSON.parse(mapData)
      // console.log(mapData,'mapData')
      if (mapData && mapData?.length) {
        this.getCenterLocationData = mapData
      }
      else {
        this.getCenterLocationData = []
        var a = activeFSA.fsaArr; // activeFSA.fsaArr.length = 1682
        var arrays = [], size = Math.round((activeFSA.fsaArr.length) / 40);
        while (a.length > 0) arrays.push(a.splice(0, size));
        // Array to hold all promises for parallel execution
        for (let i = 0; i < arrays.length; i++) {
          let response = await this.http.post1('getDefaultAgentPost', {
            fsa: arrays[i],
            isLoaderShow: false,
            user_id: this.userId,
            user_type: this.Usertype,
            changeNetWork: this.changeNetWork,
          })
          if (response['status'] == true) {
            this.getCenterLocationData.push(...response['data']);
            this.ref.detectChanges(); // Update UI
          }
        }


        this.changeNetWork == '1' ? localStorage.setItem('mapPointerDataPublic', JSON.stringify(this.getCenterLocationData)) : localStorage.setItem('mapPointerDataPrivate', JSON.stringify(this.getCenterLocationData));

        // this.common.set('mapPointerDataPublic', this.getCenterLocationData) // save in service as cache
      }


      this.hideLoader = 1;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  agentData: any;
  gm;
  async openAgentPopup(infoWindow: any, gm: any, agentData: any, event: any) {
    if (agentData.stype == undefined && agentData == 'undefined') infoWindow.close();
    if (agentData != undefined && agentData != 'undefined') {
      this.getNearByAgents(event.latitude, event.longitude);
      agentData.loginid = localStorage.getItem('userid');
      let result: any = await this.http.post(
        'GetNeighbourhoodAgent',
        agentData
      );

      this.defaultAgetDetail = result.PopupDefaultAgent


      this.GetNeighbourhoodAgentData = result['data'];

      this.exData = this.GetNeighbourhoodAgentData[0]?.expireDateStatus;

      this.statusData = this.GetNeighbourhoodAgentData[0]?.statusData;
      this.requestStatusMap = this.GetNeighbourhoodAgentData[0]?.requestShowStatus;



      this.showResult = 1;
      if (result['data'].length == 0) {
        this.showResult = 0;
      }
    }
    this.agentData = agentData;

    this.popupData = agentData;

    setTimeout(() => {
      this.agentForm.patchValue({ fsa_id: this.popupData.fsa_id, receiver_name: this.popupData.userData?.first_name + ' ' + this.popupData.userData?.last_name })
    }, 4000);

    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    this.gm = gm;
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }
  async zoomChange(e: any) {

    this.new_zoom = e;
  }

  async layerINOut(clickEvent: any) {
    //      let sdata = this.getCenterLocationData;
    //      sdata.splice(sdata.findIndex(function(i:any){
    //     return i.properties.CFSAUID != clickEvent.feature.i.CFSAUID;
    // }), 1);
    var arr = [];
    if (this.new_zoom >= 16) {

      this.showMarker = 2;

      // let activeFSA: any = await this.http.post1('getActiveFSAForMap', {});
      // let activeFSAData = activeFSA['data'];

      // let DefaultAgent: any = await this.http.post1('getDefaultAgentPost', { fsa: activeFSA.fsaArr });
      // let defaultAgentData = DefaultAgent['data'];


      // for (var i = 0; i < this.getCenterLocationData.length; ++i) {
      //   let subAgent: any = await this.http.post1('GetSubagentForMap', { id: this.getCenterLocationData[i].userData.id });


      //   this.ref.detectChanges();
      //   arr.push(this.getCenterLocationData[i]);
      //   for (var im = 0; im < subAgent['data'].length; ++im) {
      //     arr.push(subAgent['data'][im]);
      //     this.getCenterLocationData = arr;
      //     this.ref.detectChanges();
      //   }
      // }


      // this.getCenterLocationData = arr;

      if (
        this.Usertype == null ||
        this.Usertype == '4'

      ) {
        this.getCenterLocationData = this.getCenterLocationData;
        this.ref.detectChanges();
      }
    } else {
      if (this.new_zoom <= 4) {

        // this.getCenterLocationData = this.getCenterLocationData?.filter(
        //   function (obj: any) {
        //     return obj.userData?.user_type != 3;
        //   }
        // );
        this.showMarker = 2;
      }
    }
  }
  openPopup() {
    const myElement: any = document.getElementById('popupMainID');
    myElement.classList.toggle('search-block');
    this.ResultData = [];
    this.agentFilterControl = '';
    (document.getElementById('realtorId') as HTMLInputElement).value = '';
    (document.getElementById('searchTextField') as HTMLInputElement).value = '';
    // const Realtor: any = document.getElementById('realtorId');
    // Realtor['value']='';
  }
  ResultData: any = [];
  agentFilterControl = '';
  selectFilter = false;
  async filter(city: any, event: any) {

    this.http.stopRequest.next();
    let agent = event.target.value;
    this.agentFilterControl = agent;
    let result

    if (this.changeNetWork == 2) {
      result = await this.http.post('getAgentsByCityRealtor', {
        id: this.userId,
        a: this.changeNetWork,
        city: city,
        realtor: agent,
        isLoaderShow: false
      });
    }
    else {
      result = await this.http.post('getAgentsByCityRealtor', {
        a: this.changeNetWork,
        city: city,
        realtor: agent.split(' ')[0],
        ak: agent.split(' ')[1],
        isLoaderShow: false
      });
    }

    this.ResultData = result['data'];
    // console.log(this.ResultData,'********************')
    if (agent.length == 0) {
      this.selectFilter = false;
      this.getCenterLocation();

      // this.getCenterLocationNew()
    }
  }
  selectData() {
    this.selectFilter = true;
    this.agentFilterControl = '';
    (document.getElementById('realtorId') as HTMLInputElement).value = '';
    (document.getElementById('searchTextField') as HTMLInputElement).value = '';
  }

  async searchfilter(data: any, a, b) {
    var result
    let DefaultAgent
    this.http.stopRequest.next();

    if (a == undefined) {
      result = await this.http.post1('getAgentsFSA', { id: data['id'] });
      DefaultAgent = await this.http.post('getDefaultAgentPost', {
        fsa: result['data'],
        isLoaderShow: false,
        user_id: this.userId,
        user_type: this.Usertype,
        changeNetWork: this.changeNetWork,
      });
    } else {
      result = await this.http.post1('getAgentsFSA', { id: a, fsa_id: b });
      DefaultAgent = await this.http.post('getDefaultAgentPost', {
        fsa: b,
        isLoaderShow: false,
        user_id: this.userId,
        user_type: this.Usertype,
        changeNetWork: this.changeNetWork,
      });
    }

    this.getCenterLocationData = DefaultAgent['data'];
    this.openPopup();
    this.selectFilter = false;
  }
  clearInput(e: any) {
    if (e.target.value.length == 0) {
      this.lat = 55.1304;
      this.lng = -90.3468;
      this.zoom = 4;
      this.zoomChange(this.zoom);
    }
  }
  showResult = 1;
  GetNeighbourhoodAgentData: any = [];

  // async eventLayer(clickEvent) {

  //   if (this.pinMap == 1) {
  //     Swal.fire({
  //       text: 'Are you sure want to pin this location ?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes',
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         let result: any = await this.http.post('setUserPinMap', {
  //           lat: clickEvent.coords.lat,
  //           lng: clickEvent.coords.lng,
  //           selected:true,
  //           userid: localStorage.getItem('userid'),
  //         });
  //         if (result['status'] == true) {
  //           this.toastr.success(result['msg']);
  //           this.pinMap = 0;
  //           this.snackBarRef.dismiss();
  //           this.router
  //             .navigateByUrl('/login', { skipLocationChange: true })
  //             .then(() => {
  //               this.router.navigate(['home']);
  //             });
  //         } else {
  //           this.toastr.warning(result['msg']);
  //         }
  //       } else {
  //         this.pinMap = 0;
  //         this.snackBarRef.dismiss();
  //       }
  //     });
  //   }

  //   this.getNearByAgents(clickEvent.latLng.lat(), clickEvent.latLng.lng());
  // 
  //   loginid: localStorage.getItem('userid');
  //   // // let result: any = await this.http.post('GetNeighbourhoodAgent', { fsa: clickEvent.feature.i.CFSAUID, loginid: localStorage.getItem('userid'), isLoaderShow: false });
  //  
  //   // // this.GetNeighbourhoodAgentData = result['data'];
  //   // this.showResult = 1;
  //   // if (result['data'].length == 0) {
  //   //   this.showResult = 0;
  //   // }

  //   if (this.Usertype == null || this.Usertype == '4' || this.Usertype == '3') {
  //   } else {
  //     // get sub agent
  //     if (this.new_zoom >= 6) {
  //       this.showMarker = 2;

  //       // let subagent: any = [];
  //       // subagent = await this.http.post('getSubAgentByFSA', {
  //       //   fsa: clickEvent.feature.i.CFSAUID,
  //       //   isLoaderShow: false,
  //       // });
  //       // this.getCenterLocationData = [
  //       //   ...this.getCenterLocationData,
  //       //   ...subagent['data'],
  //       // ];
  //       // this.ref.detectChanges();
  //     } else {
  //       if (this.new_zoom <= 5) {
  //         this.showMarker = 2;
  //       }
  //     }
  //   }
  // }


  async eventLayer(clickEvent) {

    if (this.pinMap == 1) {
      Swal.fire({
        text: 'Are you sure want to pin this location ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result: any = await this.http.post('setUserPinMap', {
            lat: clickEvent.lat,
            lng: clickEvent.lng,
            selected: true,
            userid: localStorage.getItem('userid'),
          });
          if (result['status'] == true) {
            this.toastr.success(result['msg']);
            this.pinMap = 0;
            this.snackBarRef.dismiss();
            this.router
              .navigateByUrl('/login', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['home']);
              });
          } else {
            this.toastr.warning(result['msg']);
          }
        } else {
          this.pinMap = 0;
          this.snackBarRef.dismiss();
        }
      });
    }

    this.getNearByAgents(clickEvent.lat, clickEvent.lng);

    loginid: localStorage.getItem('userid');
    // // let result: any = await this.http.post('GetNeighbourhoodAgent', { fsa: clickEvent.feature.i.CFSAUID, loginid: localStorage.getItem('userid'), isLoaderShow: false });

    // // this.GetNeighbourhoodAgentData = result['data'];
    // this.showResult = 1;
    // if (result['data'].length == 0) {
    //   this.showResult = 0;
    // }

    if (this.Usertype == null || this.Usertype == '4' || this.Usertype == '3') {
    } else {
      // get sub agent
      if (this.new_zoom >= 6) {
        this.showMarker = 2;

        // let subagent: any = [];
        // subagent = await this.http.post('getSubAgentByFSA', {
        //   fsa: clickEvent.feature.i.CFSAUID,
        //   isLoaderShow: false,
        // });
        // this.getCenterLocationData = [
        //   ...this.getCenterLocationData,
        //   ...subagent['data'],
        // ];
        // this.ref.detectChanges();
      } else {
        if (this.new_zoom <= 5) {
          this.showMarker = 2;
        }
      }
    }
  }

  addAgentModel: any;
  async add(content: any, agentData: any) {
    this.addAgentForm.reset();
    this.submitted = false;
    this.addAgentForm.patchValue({ agent_id_replace_to: agentData.userData.id })
    this.addAgentForm.patchValue({ fsa_id: agentData.fsa_id })
    this.addAgentModel = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
    }).result.then((result) => {
      // this.addAmount(data);
      this.agentSubmit()

      this.confirmResut = `Closed with: ${result}`;
    }, (reason) => {
      this.confirmResut = `Dismissed with: ${reason}`;
    });

  }

  gotoBecomeClient() {
    this.router.navigate(['/become-client'])
  }

  addAgentFormValue() {
    this.addAgentForm = this.formbuilder.group({
      first_name: ['', this.validataion.fullname],
      email: ['', this.validataion.email],
      mobile: ['', this.validataion.mobile],
      agent_id_replace_to: ['', this.validataion.required],
      fsa_id: ['', this.validataion.required],
    })
  }


  async agentSubmit() {
    // var nameElement:any = document.getElementById('name');
    // var emailElement:any = document.getElementById('email');
    // var phoneElement:any = document.getElementById('phone');
    // this.addAgentForm.patchValue({ first_name: nameElement.value })
    // this.addAgentForm.patchValue({ mobile: phoneElement.value })
    // this.addAgentForm.patchValue({ email: emailElement.value })

    this.addAgentForm.value.password = "123456";
    this.addAgentForm.value.userId = this.userId;
    this.addAgentForm.value.defaultAgetDetail = this.defaultAgetDetail;

    this.submitted = true;
    // if (this.addAgentForm.invalid) { return; }

    let result: any = await this.http.post(this.apiURL.url.addNewAgent, this.addAgentForm.value);



    if (result.status == false && result.check == false) {
      this.toastr.warning(result["msg"], "", { timeOut: 2000 });
    } else {
      if (result["status"] == true) {
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
        this.ngOnInit();
        if (result.status) {
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/home/' + this.changeNetWork]);
          });
        }
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
      this.addAgentForm.reset();
      this.gm.lastOpen.close();
    }
  }
  //old

  // async addToMyNetwork(content: any,agentData:any){
  //   let newData = {
  //     userId: this.userId,
  //     agent_id_replace_to: agentData.userData.id,
  //     fsa_id:agentData.fsa_id
  //   }
  //   let result:any = await this.http.post(this.apiURL.url.addToMyNetwork,newData);
  //   if (result["status"] == true) {
  //     this.toastr.success(result["msg"], "", { timeOut: 2000 });
  //     // this.ngOnInit();
  //             this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
  //                 this.router.navigate(['home']);
  //               });
  //   } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
  // }

  //new changes-----------------------------------------------------------------------Sourabh+++++++++++++++++++++++++

  async addToMyNetwork(content: any, agentData: any) {
    var AddAgentData;
    var temp

    let newData = {
      userId: this.userId,
      agent_id_replace_to: agentData.userData.id,
      fsa_id: agentData.fsa_id
    }
    let id = localStorage.getItem('userid')
    let Data: any = await this.http.post('myAgentData', { id });
    AddAgentData = Data['data'];

    for (let i = 0; i < AddAgentData.length; i++) {
      if (agentData.fsa_id == AddAgentData[i].FSAData[0].id) {
        temp = AddAgentData[i].FSAData[0].id;
      }
    }

    if (agentData.fsa_id == temp) {
      Swal.fire({
        text: 'This agent is already added for this FSA',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.gm.lastOpen.close();
        }
      });
    }
    else {
      let result: any = await this.http.post(this.apiURL.url.addToMyNetwork, newData);
      if (result["status"] == true) {
        this.gm.lastOpen.close();
        this.toastr.success(result["msg"], "", { timeOut: 2000 });
      } else this.toastr.error(result["msg"], "", { timeOut: 2000 });


    }

  }

  ///old+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Sourabh-------------------
  // async addToMyNetwork(content: any, agentData: any) {
  //   let newData = {
  //     userId: this.userId,
  //     agent_id_replace_to: agentData.userData.id,
  //     fsa_id: agentData.fsa_id
  //   }
  //   let result: any = await this.http.post(this.apiURL.url.addToMyNetwork, newData);
  //   if (result["status"] == true) {
  //     this.gm.lastOpen.close();
  //     this.toastr.success(result["msg"], "", { timeOut: 2000 });
  //   } else this.toastr.error(result["msg"], "", { timeOut: 2000 });

  // }




  clickNeighbourhoodEvent(value: any, z: any, id: any) {
    const myElement: any = document.getElementById(id + z);
    myElement.innerHTML = value.address;
    myElement.setAttribute('style', 'width:100%;');
  }
  payModel: any;
  async pay(content: any) {
    this.payModel = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
    });
  }

  makeFav(agent: any, type: any, indx: number, type_data: string) {
    if (this.userId == null) {
      this.router.navigate(['/login']);
    } else {
      Swal.fire({
        text:
          type == 'blue' ? 'Are you sure want to remove this agent as Favourite ?' : 'Are you sure want to make this agent as Favourite ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(async (result) => {
        if (result.isConfirmed) {
          let resu: any = await this.http.post('MakeFavorite', {
            type: type,
            agent_id: agent.id,
            userid: localStorage.getItem('userid'),
            isLoaderShow: false
          });

          if (resu['status'] == true) {
            this.toastr.success(resu['msg']);

            if (agent.is_favorite == 1 && type_data == 'near_by_agents') {
              this.Agent[indx].is_favorite = 0;
            } else if (agent.is_favorite == 0 && type_data == 'near_by_agents') {
              this.Agent[indx].is_favorite = 1;
            } else if (agent.is_favorite == 1 && type_data == 'GetNeighbourhoodAgent') {
              this.GetNeighbourhoodAgentData[indx].is_favorite = 0;
            } else {
              this.GetNeighbourhoodAgentData[indx].is_favorite = 1;
            }

            // this.router.navigate(['home']);
            // this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            //     this.router.navigate(['home']);
            //   });
          } else {
            this.toastr.warning(resu['msg']);
          }
        }
      });
    }
  }



  Clientagent() {
    var usertype = localStorage.getItem('type')
    var is_default = localStorage.getItem('is_default_agent')
    if (usertype == '2' && is_default == '1') {
      Swal.fire({
        text: "You are a Partner Agent. Do you want to become a Client Agent so you can create your own Map ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/become-client']);
        }
      })
    }
    else {
      this.router.navigate(['/become-client']);
    }

  }



  openModel(content, type) {
    this.refer_type = type;
    this.agentForm.reset();

    if (type == 2) {
      setTimeout(() => {
        this.agentForm.patchValue({ fsa_id: this.popupData?.fsa_id, receiver_name: this.popupData.userData.first_name + ' ' + this.popupData.userData.last_name })
      }, 2000);
    }


    this.submitted = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    // const element = <HTMLElement> document.getElementsByClassName('.gm-ui-hover-effect')[0];
    // // const element = <HTMLElement> document.getElementsByClassName('::ng-deep .gm-ui-hover-effect')[0];

    // element.style.top = '6px !important';
    // element.style.right = '10px !important';

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

  sendReferralForm() {
    this.agentForm = this.formbuilder.group({
      email: ['', this.validataion.email],
      fsa_id: ['', Validators.required],
      name: ['', this.validataion.fullname],
      mobile: ['', this.validataion.mobile],
      message: ['', this.validataion.fsaarea],
      receiver_name: ['', this.validataion.fullname],
      // receiver_email: ['',Validators.required]
    })
  }

  async getFSA() {
    let result = await this.http.get(this.apiURL.url.getAllFSA)
    this.fsa = result["data"];
  }

  async getAllAgentsName() {
    let result = await this.http.get(this.apiURL.url.getAllAgentsName)
    this.agentList = result["data"];
  }


  async Agentmail() {
    let result = await this.http.get(this.apiURL.url.getAgentMail)
    this.fsa = result["data"];
  }

  async SendReferral() {
    this.submitted = true;
    // if(this.agentForm.value.name?.label != undefined) this.agentForm.value.name = this.agentForm.value.name.label;
    if (this.agentForm.invalid) { console.log('Invalid'); return; }
    this.submitted = false;
    this.agentForm.value.referralAgent = this.ResData['data'][0];

    if (this.receiverData != undefined) {
      const [first, last] = this.agentForm.value.receiver_name.split(' ');
      this.agentForm.value.receivingAgent = {
        first_name: first,
        last_name: last,
        email: this.receiverData[0].email,
        id: this.receiverData[0].id
      }
    } else {
      this.agentForm.value.receivingAgent = this.agentData.userData;
    }

    // 1 For Map Location, 2 For Home Page
    this.agentForm.value.referLocation = 1;
    let result = await this.http.post(this.apiURL.url.sendReferral, this.agentForm.value);
    if (result['status'] == true) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
      this.modalService.dismissAll();
      this.router.navigate[('/')]
    } else {
      this.toastr.error(result['msg'], '', { timeOut: 2000 });
    }
  }

  // async change(e: any) {
  //   let result: any = await this.http.post(this.apiURL.url.getAgentMail, { email: this.agentForm.value.email, isLoaderShow: false })
  //   if (result.data?.length == 1) {
  //     this.agentForm.patchValue({
  //       name: result.data[0].first_name + (result.data[0].last_name != null && result.data[0].last_name != 'null' && result.data[0].last_name != undefined && result.data[0].last_name != 'undefined' && result.data[0].last_name != '' ? ' ' + result.data[0].last_name : ''),
  //       mobile: result.data[0].mobile
  //     })
  //   } else {
  //     this.agentForm.patchValue({
  //       name: '',
  //       mobile: ''
  //     });
  //   }
  //   return;
  // }


  async changeReceiver(e: any) {
    let result: any = await this.http.post(this.apiURL.url.getAgentByName, { name: this.agentForm.value.receiver_name, isLoaderShow: false });
    if (result.data?.length) this.receiverData = result['data'];
    return;
  }

  resetMap() {
    this.getCenterLocation(true);
    this.ref.detectChanges();
  }

}
