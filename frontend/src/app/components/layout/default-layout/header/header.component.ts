import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from '../../../../auth.service';
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
import { ApiUrlService } from 'src/app/services/apiUrl.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ProfileData:any;
  b;
  languageType = localStorage.getItem('language');
  userType = localStorage.getItem('type');
  constructor(
    private navService: NavigationService,
    public auth: AuthService, private http: HttpService,
    public apiUrl: ApiUrlService,
    public activatedrout : ActivatedRoute,
    public _router: Router, public translate: TranslateService) {
    translate.setDefaultLang('en');

  }

  ngOnInit() {
    

    this.apiUrl.editProfile = this.apiUrl.nameProfile
    this.getProfileData();
  
    if (this.languageType == null) {
      this.languageType = 'en'
    }
    if (localStorage.getItem('language') == null || localStorage.getItem('language') == 'en') {
      this.translate.use('en');
      var english = document.getElementById('englishId');
      english?.classList.add('active');
      var franch = document.getElementById('FranchId');
      franch?.classList.remove('active');
    } else {
      this.translate.use(this.languageType);
      var english = document.getElementById('englishId');
      english?.classList.remove('active');
      var franch = document.getElementById('FranchId');
      franch?.classList.add('active');
    }   
   this._router.events.subscribe((event: Event) => {  
      if (event instanceof NavigationStart) {
        let a = event.url
       this.b = a.split('/')[1]   
      }
  });
  }
  
  

  async getProfileData(){
    if(localStorage.getItem('userid') != null){
      let  ResData:any= await this.http.post('getProfileData/'+localStorage.getItem('userid'),{})
      console.log(this.apiUrl.nameProfile,'+++++',ResData)
     if(ResData['data'].length > 0){
      this.ProfileData = ResData['data'][0];
      this.apiUrl.editProfile = ResData.data[0].profile_img; 
      this.apiUrl.nameProfile = ResData.data[0]?.first_name+" "+((ResData.data[0]?.last_name == 'null' || ResData.data[0]?.last_name == null || ResData.data[0]?.last_name == 'undefined' || ResData.data[0]?.last_name == undefined) ? '' : ResData.data[0]?.last_name);  
      // this.ProfileData = this.apiUrl.editProfile;
     
      if(localStorage.getItem('agent_type') != 'null' && localStorage.getItem('agent_type') != ResData['data'][0].agent_type){
        Swal.fire({
          // title: 'Please login again',
          text: 'Please login again',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result:any) => {
          this.Logout1();
        })

      }

      if(ResData['data'][0]['SubscriptionEndDate'] != null && ResData['data'][0]['user_type'] == 2 && localStorage.getItem('type') == '3'){
         this.auth.sendToken(ResData['data'],true);
         this._router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/']);
      }); 
      
   }
    }else{
      this.Logout();
    }
    }
  }
  useLanguage(language: string) {

    if(this.languageType == language){
       Swal.fire({
            title: language =="en" ? 'You are already in English language': 'Vous êtes déjà en langue française',
           // text: 'Website will reload',
            icon: 'warning',
           // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
        }
else{

  Swal.fire({
    title: language =="en" ? 'Are you sure want to change in English language?': 'Are you sure want to change in French language?',
    text: 'Website will reload',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result:any) => {
    
    if (result.isConfirmed == true) {
      localStorage.setItem('language', language);
      this.translate.use(language);
      window.location.reload();
    }
  })
} 
}



  Logout() {
    localStorage.removeItem('mapPointerDataPublic') // clear map cache
    localStorage.removeItem('mapPointerDataPrivate')

    this.auth.login = false;
    this.auth.logout();
   
  }

  Logout1() {
    localStorage.removeItem('mapPointerDataPublic') // clear map cache
    localStorage.removeItem('mapPointerDataPrivate')
    this.auth.login = false;
    this.auth.logout1();
  }



  registrationN(num?: number){

if(num == 1){
  this._router.navigate(['/consumer-registration']);
}
if(num == 4){
  this._router.navigate(['/client-registration']);
}
if(num == 2){
  this._router.navigate(['/realtor-registration']);
}
  }



}
