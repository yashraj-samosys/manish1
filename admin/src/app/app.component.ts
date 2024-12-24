import { Component } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { ApiUrlService } from './shared/services/apiUrl.service';
import { HttpService } from './shared/services/http.service';
import { Navbar } from './shared/services/navbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private http: HttpService,
    private apiURL: ApiUrlService,
  ) { }
  title = 'bootDash';
  nav: any;

  async ngOnInit() {
    let result = await this.http.post(this.apiURL.url.getuserroles, { user_id: localStorage.getItem('user_id') });
    if(!result.length) return;
    let page = result['data'][0].page_id.split(',')
    let newara = []
    for (let x of page) {
      newara.push(parseInt(x))
    }
    let nav: any = Navbar.filter((e) => { return newara.includes(e.id) });
    let user_type = localStorage.getItem('user_type')
    this.router.events.subscribe((event: Event) => {
      // if (user_type == '1' || user_type == '5') {
        if (event instanceof NavigationStart) {
          let a = event.url
          let b = a.split('/')[1]
          let isTrue = nav.some((el:any) => el.routeModule == b);
          console.log(isTrue,"isTrue")
          if (event.url != '/users/edit') {
            if (!isTrue) this.router.navigate(['dashboard/v1']);
          }
        }

        if (event instanceof NavigationEnd) {
        }

        if (event instanceof NavigationError) {
          console.log(event.error);
        // }
      }
    });
  }

  async getnavbar(Navbar: any) {
    let result = await this.http.post(this.apiURL.url.getuserroles, { user_id: localStorage.getItem('user_id') });
    let page = result['data'][0].page_id.split(',')
    let newara = []
    for (let x of page) {
      newara.push(parseInt(x))
    }
    this.nav = Navbar.filter((e) => { return newara.includes(e.id) });
    // console.log(this.nav, "navvvvvvvvvvvvvvvvvNavbar")
  }


}
