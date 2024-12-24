import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;

  constructor(private store: LocalStoreService, private router: Router, private toastr: ToastrService) {
    this.checkAuth();
  }


  public isAuthenticated(): boolean {
    const id = localStorage.getItem('user_id');
    const user_type = localStorage.getItem('user_type');
    if (id && user_type) return true;
    else return false;
  }

  checkAuth() {
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getuser() {
    return of({});
  }

  signin(credentials) {
    // this.authenticated = true;
    // this.store.setItem("demo_login_status", true);
    // return of({}).pipe(delay(1500));
  }
  signout() {
    // this.authenticated = false;
    // this.store.setItem("demo_login_status", false);
    localStorage.clear();
    this.toastr.success('Sign out successfully!', '', { timeOut: 2000 });
    setTimeout(() => {
      window.location.reload();
    }, 500)
    // this.router.navigateByUrl("/session/login");
  }
}
