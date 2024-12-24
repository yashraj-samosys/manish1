import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { ClientRegistrationComponent } from '../client-registration/client-registration.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
  // geoJson="http://localhost/referral/map/Canadian_FSA.geojson"
  geoJson = './assets/Canadian_FSA.geojson';
  // kmljson="https://webixun.com/t2.kml"
  kmljson = 'http://localhost/referral/map/Canadian_FSA.geojson';
  iconData = 'http://localhost/referral/map/1200px-Reddot-small.svg.png';
  new_zoom = 0;
  user_type: any = '';
  changeNetWork: number = 1;
  addAgentForm:any;
  validation: any;
  confirmResut: any;
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
  Agent: any;
  showMarker = 2;
  hideLoader = 0;
  advertisment: any = [];
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
  async ngOnInit() {
    let  ResData:any= await this.http.post('getProfileData/'+localStorage.getItem('userid'),{})

    this.apiURL.editProfile = ResData["data"][0]?.profile_img
     this.apiURL.nameProfile = ResData["data"][0]?.first_name+ ' ' +ResData["data"][0]?.last_name 
    this.getAdvertisment();
    this.threeDefaultAgent();
  
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

    

    this.getCenterLocation();
    // this.getCenterLocationNew()
    this.iframeUrl =
      environment.MapUrl + localStorage.getItem('userid') + '&address=&name';
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     // this.zoom = 16;
    //     console.log("position", position)
    //     this.getNearByAgents(this.lat,this.lng)
    //   });
    // }else{
    // alert('Please alow location')
    // }
    
    // let MapCLose = document.getElementsByClassName('gm-ui-hover-effect');
    // console.log('MapCLose',MapCLose[0])
  }


  mapReady(map: { setOptions: (arg0: { zoomControl: string; zoomControlOptions: { position: google.maps.ControlPosition; }; }) => void; }) {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    });
  }

  
  // asads: any = 2
  async changeMap(status: number) {
    // console.log(this.changeMap, this.showMarker, '0000');
    this.showMarker = 2;
    this.http.stopRequest.next();
    let res: any = await this.http.post('checkMapAgentExist', {
      user_id: this.userId,
    });
    if (!res.status) {
      this.toastr.warning('', res.msg, { timeOut: 1000 });
      // return;
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

  async DeleteAgent(agentData:any,id: any, gm: any) {
    let res: any = await this.http.post('DeleteAgentFromMap', {
      agent_id: id,
      user_id: this.userId,
      fsa_id:agentData.fsa_id
    });
    if (res.status) {
      this.ngOnInit();
      gm.lastOpen.close();
      this.toastr.success('', res.msg, { timeOut: 1000 });
    } else {
      gm.lastOpen.close();
      this.toastr.error('', res.msg, { timeOut: 1000 });
    }
  }

  open(url: any) {}

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
  }

  ngAfterViewInit() {
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
          // console.log('ddddddddddddd',s.location.lat())
          this.lat = s.location.lat();
          this.lng = s.location.lng();
          this.zoom = 10;
        });
        this.zoomChange(this.zoom);
      });
    });
  }

  async threeDefaultAgent() {
    let agent_data: any = await this.http.post('threeDefaultAgent', {
      loginid: localStorage.getItem('userid'),
    });
    this.Agent = agent_data.data;
    // console.log(agent_data, 'agentData');
  }

  async getNearByAgents(lat: any, lng: any) {
    let result: any = await this.http.post('GetDefaultAgentByLatLong', {
      lat: lat,
      lng: lng,
      loginid: localStorage.getItem('userid'),
      isLoaderShow: false,
    });
    this.Agent = result.data;
    // console.log(this.Agent,'agentDatwa1111');
    console.log(this.Agent, 'agentDatwa1111');
    this.requestStatus = this.Agent[0]?.requestShowStatus;
    // console.log(this.requestStatus,'requestStatus')
    // debugger
    this.ref.detectChanges();
  }

  async getCenterLocationNew() {
    let d2: any = await this.http.post('getDefaultAgentOnMap', {
      isLoaderShow: false,
    });
    this.getCenterLocationData = d2['data'];
    console.log('getCenterLocationData', this.getCenterLocationData);
    this.ref.detectChanges();
  }
  async getCenterLocation() {
    // let result:any = await this.http.post1('getCenterLocation',{});
    // let fileFsaData=result['data'];

    let activeFSA: any = await this.http.post1('getActiveFSAForMap', {});
    let activeFSAData = activeFSA['data'];

    var a = activeFSA.fsaArr;
    var arrays = [],
      size = 100;
    while (a.length > 0) arrays.push(a.splice(0, size));

    let DefaultAgent: any = await this.http.post1('getDefaultAgentPost', {
      fsa: arrays[0],
      user_type: this.Usertype,
      changeNetWork: this.changeNetWork,
      user_id: this.userId,
    });
    if (DefaultAgent.status == true) {
      // this.changeNetWork = DefaultAgent.changeNetWork;
      this.getCenterLocationData = [
        ...this.getCenterLocationData,
        ...DefaultAgent['data'],
      ];
      this.ref.detectChanges();
      this.hideLoader = 1;
      // if (this.changeNetWork == 2) {
      //   this.getCenterLocationData = DefaultAgent['data'];
      //   return;
      // }
      let d2: any = await this.http.post1('getDefaultAgentPost', {
        fsa: arrays[1],
        isLoaderShow: false,
        user_id: this.userId,
      });
      if (d2['status'] == true) {
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d2['data'],
        ];
        this.ref.detectChanges();

        let d3: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[2],
          isLoaderShow: false,
          user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d3['data'],
        ];
        this.ref.detectChanges();

        let d4: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[3],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d4['data'],
        ];
        this.ref.detectChanges();

        let d5: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[4],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d5['data'],
        ];
        this.ref.detectChanges();

        let d6: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[5],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d6['data'],
        ];
        this.ref.detectChanges();

        let d7: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[6],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d7['data'],
        ];
        this.ref.detectChanges();

        let d8: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[7],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d8['data'],
        ];
        this.ref.detectChanges();

        let d9: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[8],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d9['data'],
        ];
        this.ref.detectChanges();

        let d10: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[9],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d10['data'],
        ];
        this.ref.detectChanges();

        let d11: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[10],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d11['data'],
        ];
        this.ref.detectChanges();

        let d12: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[11],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d12['data'],
        ];
        this.ref.detectChanges();

        let d13: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[12],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d13['data'],
        ];
        this.ref.detectChanges();

        let d14: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[13],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d14['data'],
        ];
        this.ref.detectChanges();

        let d15: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[14],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d15['data'],
        ];
        this.ref.detectChanges();

        let d16: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[15],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d16['data'],
        ];
        this.ref.detectChanges();

        let d17: any = await this.http.post1('getDefaultAgentPost', {
          fsa: arrays[16],
          isLoaderShow: false,user_id: this.userId,
        });
        this.getCenterLocationData = [
          ...this.getCenterLocationData,
          ...d17['data'],
        ];
        this.ref.detectChanges();

        // let d18:any = await this.http.post1('getDefaultAgentPost',{fsa:arrays[17]});
        // this.getCenterLocationData= [ ...this.getCenterLocationData, ...d18['data'] ]
        // this.ref.detectChanges();
      }
    }

    this.ref.detectChanges();

    // let mainArr=[]
    //          for (var i = 0; i < fileFsaData.length; i++) {
    //            for (var m = 0; m < DefaultAgent['data'].length; m++) {
    //              if (fileFsaData[i].properties.CFSAUID == DefaultAgent['data'][m].fsa_code) {
    //                  fileFsaData[i].agent=DefaultAgent['data'][m];
    //                mainArr.push(fileFsaData[i]);
    //              }
    //            }
    //          }
    // this.getCenterLocationData=DefaultAgent['data'];
    // console.log('getCenterLocationData-----------',this.getCenterLocationData);
  }
  agentData: any;
  async openAgentPopup(infoWindow: any, gm: any, agentData: any, event: any) {
    if (agentData != undefined) {
      this.getNearByAgents(event.latitude, event.longitude);
      agentData.loginid = localStorage.getItem('userid');
      let result: any = await this.http.post(
        'GetNeighbourhoodAgent',
        agentData
      );
      this.GetNeighbourhoodAgentData = result['data'];
      console.log(this.GetNeighbourhoodAgentData,'Data22222')
      this.showResult = 1;
      if (result['data'].length == 0) {
        this.showResult = 0;
      }
    }
    this.agentData = agentData;
    //  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa',this.agentData);
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }
  async zoomChange(e: any) {
    console.log(e, 'e00000000');
    this.new_zoom = e;
  }

  async layerINOut(clickEvent: any) {
    //      let sdata = this.getCenterLocationData;
    //      sdata.splice(sdata.findIndex(function(i:any){
    //     return i.properties.CFSAUID != clickEvent.feature.i.CFSAUID;
    // }), 1);
    //      console.log('sdata',sdata)
    var arr = [];
    if (this.new_zoom >= 16) {
      console.log(this.new_zoom, 'new');
      this.showMarker = 2;

      // let activeFSA: any = await this.http.post1('getActiveFSAForMap', {});
      // let activeFSAData = activeFSA['data'];

      // let DefaultAgent: any = await this.http.post1('getDefaultAgentPost', { fsa: activeFSA.fsaArr });
      // let defaultAgentData = DefaultAgent['data'];
      // console.log('1', defaultAgentData)

      // for (var i = 0; i < this.getCenterLocationData.length; ++i) {
      //   let subAgent: any = await this.http.post1('GetSubagentForMap', { id: this.getCenterLocationData[i].userData.id });
      //   console.log('subAgent', subAgent['data'])

      //   this.ref.detectChanges();
      //   arr.push(this.getCenterLocationData[i]);
      //   for (var im = 0; im < subAgent['data'].length; ++im) {
      //     arr.push(subAgent['data'][im]);
      //     this.getCenterLocationData = arr;
      //     this.ref.detectChanges();
      //   }
      // }

      // console.log('2', arr)
      // this.getCenterLocationData = arr;

      if (
        this.Usertype == null ||
        this.Usertype == '4' ||
        this.Usertype == '3'
      ) {
        this.getCenterLocationData = this.getCenterLocationData;
        this.ref.detectChanges();
      }
    } else {
      if (this.new_zoom <= 4) {
        console.log(this.new_zoom, 'new Zoome else');
        this.getCenterLocationData = this.getCenterLocationData.filter(
          function (obj: any) {
            return obj.userData.user_type != 3;
          }
        );
        this.showMarker = 2;
      }
    }
  }
  openPopup() {
    const myElement: any = document.getElementById('popupMainID');
    myElement.classList.toggle('search-block');
    this.ResultData = [];
    // const Realtor: any = document.getElementById('realtorId');
    // Realtor['value']='';
  }
  ResultData: any = [];
  agentFilterControl = '';
  async filter(city: any, event: any) {
    this.http.stopRequest.next();
    let agent = event.target.value;
    this.agentFilterControl = agent;
    let result: any = await this.http.post('getAgentsByCityRealtor', {
      city: city,
      realtor: agent,
    });
    this.ResultData = result['data'];
    console.log(this.ResultData,'resulrrrrrrrrrr')
    if (agent.length == 0) {
      this.getCenterLocation();
      // this.getCenterLocationNew()
    }
  }

  async searchfilter(data: any) {
    // cancel the request
    this.http.stopRequest.next();
    let result: any = await this.http.post1('getAgentsFSA', { id: data['id'] });
    let DefaultAgent: any = await this.http.post('getDefaultAgentPost', {
      fsa: result['data'],
    });
    this.getCenterLocationData = DefaultAgent['data'];
    this.openPopup();
  }
  clearInput(e: any) {
    console.log('this,.........',e)
    if (e.target.value.length == 0) {
      this.lat = 55.1304;
      this.lng = -90.3468;
      this.zoom = 4;
      this.zoomChange(this.zoom);
    }
  }
  showResult = 1;
  GetNeighbourhoodAgentData: any = [];
  async eventLayer(clickEvent: any) {
    console.log('fsa_code', clickEvent.feature.i.CFSAUID);

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
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng(),
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

    this.getNearByAgents(clickEvent.latLng.lat(), clickEvent.latLng.lng());
    // console.log(clickEvent.latLng.toString());
    // console.log(clickEvent.feature.i.CFSAUID);
    loginid: localStorage.getItem('userid');
    // // let result: any = await this.http.post('GetNeighbourhoodAgent', { fsa: clickEvent.feature.i.CFSAUID, loginid: localStorage.getItem('userid'), isLoaderShow: false });
    // // // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa',result);
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
  async add(content: any,agentData:any) {
    console.log('test',agentData)
    this.addAgentForm.patchValue({agent_id_replace_to:agentData.userData.id})
    this.addAgentForm.patchValue({fsa_id:agentData.fsa_id})
    this.addAgentModel = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
    }).result.then((result) => {
      // this.addAmount(data);
      this.agentSubmit()
      console.log(result,'result')
      this.confirmResut = `Closed with: ${result}`;
    }, (reason) => {
      this.confirmResut = `Dismissed with: ${reason}`;
    });
  }

  gotoBecomeClient(){
    this.router.navigate(['/become-client'])
  }

  addAgentFormValue(){
    this.addAgentForm = this.formbuilder.group({
        first_name:['',this.validataion.name],
        email: ['',this.validataion.email],
        mobile: ['',this.validataion.required],
        agent_id_replace_to: ['',this.validataion.required],
        fsa_id: ['',this.validataion.required],
    })
}


async agentSubmit(){
  this.addAgentForm.value.password = "123456";
  this.addAgentForm.value.userId =  this.userId; 
  console.log('.test', this.addAgentForm.value);

  this.submitted = true;
  if (this.addAgentForm.invalid) {return;}

  let result:any = await this.http.post(this.apiURL.url.addNewAgent,this.addAgentForm.value);
  console.log(result["status"],'staus')
  console.log(result,'.............')
  if (result["status"] == true) {
    console.log(result["msg"],'dddd');
    this.toastr.success(result["msg"], "", { timeOut: 2000 });
    // this.ngOnInit();
            this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
                this.router.navigate(['home']);
              });
  } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
}



  


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

  makeFav(agent: any, type: any, indx: number,type_data: string) {
    if (this.userId == null) {
      this.router.navigate(['/login']);
    } else {
      Swal.fire({
        text:
          type == 'blue'
            ? 'Are you sure want to remove this agent as Favorite ?'
            : 'Are you sure want to make this agent as Favorite ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(result.isConfirmed, 'va Confirmed');
          let resu: any = await this.http.post('MakeFavorite', {
            type: type,
            agent_id: agent.id,
            userid: localStorage.getItem('userid'),
            isLoaderShow:false
          });
          
          // console.log(agent, type_data,'type_data')
          if (resu['status'] == true) {
            this.toastr.success(resu['msg']);
            // console.log("agent",agent)
            // console.log(this.Agent[indx])

            if(agent.is_favorite == 1 && type_data == 'near_by_agents'){
              this.Agent[indx].is_favorite = 0;
            }else if(agent.is_favorite == 0 && type_data == 'near_by_agents') {
              this.Agent[indx].is_favorite = 1;
            }else if(agent.is_favorite == 1 && type_data == 'GetNeighbourhoodAgent'){
              this.GetNeighbourhoodAgentData[indx].is_favorite = 0;
            }else{
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



Clientagent(){
 var usertype = localStorage.getItem('type')
 var is_default = localStorage.getItem('is_default_agent')
if(usertype == '2' && is_default == '1'){
Swal.fire({
  text: "You are Default Agent. Are you want to Change Default Agent to Client Agent ?",
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
else{
  this.router.navigate(['/become-client']);  
}




}
}

// type == 2

// <agm-marker *ngFor="let s of getCenterLocationData" [agmFitBounds]="true" [latitude]="s.lat"
// [longitude]="s.lng" [iconUrl]="
//       s.stype != undefined
//         ? {
//             url: './assets/images/currentmap.png',
//             scaledSize: { height: 30, width: 30 }
//           }
//         : showMarker == 2
//         ? $any(icon)
//         : {
//             url:s?.userData.user_type == 2 ? s?.userData.profile_img : './assets/images/partner.png' ,
//             scaledSize: s?.userData.user_type == 2 ? { height: 40, width: 40 } :  { height: 20, width: 20 }
//           }
//     " (markerClick)="openAgentPopup(infoWindow, gm, s, $event)">
// <agm-info-window [disableAutoPan]="false" #infoWindow>