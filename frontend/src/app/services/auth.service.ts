import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "src/app/services/http.service";

@Injectable()
export class AuthService {
	login=false;
  user_type:any=null;
  ProfileData:any;
  constructor(private myRoute: Router,private http: HttpService) {
    if(localStorage.getItem('userid') != null){
      this.login= true;
      this.user_type=localStorage.getItem('type');
    }else{
      this.login= false;
      this.user_type=null;

    }
    this.getProfile()
   }
 async sendToken(token: any,loginstatus:any) {
  
    localStorage.setItem("userid", token[0].id)
    localStorage.setItem("email", token[0].email)
    localStorage.setItem("type", token[0].user_type);
    localStorage.setItem("agent_type", token[0].agent_type);
    localStorage.setItem("is_default_agent", token[0].is_default_agent);
    localStorage.setItem("profile_status",token[0].profile_status)
    this.user_type=token[0].user_type;
    this.login=loginstatus;
   this.getProfile();
  }
  async getProfile(){
    this.ProfileData = await   this.http.post('getProfileData/'+localStorage.getItem('userid'),{})
    if(this.ProfileData['data'].length > 0){
     this.ProfileData = this.ProfileData['data'][0];
    }
  }
  getToken() {
    return localStorage.getItem("userid")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem("userid");
    localStorage.removeItem("email");
    this.myRoute.navigate(["/login"]);
  }

  logout1() {
    localStorage.clear();
    localStorage.removeItem("userid");
    localStorage.removeItem("email");
    this.myRoute.navigate(["/login/client"]);
  }
}