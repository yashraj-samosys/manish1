import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import {
  NavigationService,
  IMenuItem,
  IChildItem
} from '../../../../services/navigation.service';
import { Router, NavigationEnd, NavigationStart, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { filter } from 'rxjs/operators';
import { Utils } from '../../../../utils';
import { HttpService } from 'src/app/shared/services/http.service';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { Navbar } from 'src/app/shared/services/navbar';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.scss']
})
export class SidebarLargeComponent implements OnInit {
  selectedItem: IMenuItem;
  nav: IMenuItem[];
  @ViewChildren(PerfectScrollbarDirective) psContainers: QueryList<PerfectScrollbarDirective>;
  psContainerSecSidebar: PerfectScrollbarDirective;

  constructor(
    public router: Router,
    public navService: NavigationService,
    private http: HttpService,
    private apiURL: ApiUrlService,
    private arote: ActivatedRoute
  ) {
    setTimeout(() => {
      this.psContainerSecSidebar = this.psContainers.toArray()[1];
    });
  }

  async ngOnInit() {
    console.log("---")
    this.updateSidebar();
    // CLOSE SIDENAV ON ROUTE CHANGE
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sidenavOpen = false;
        }
      });

    // this.navService.menuItems$.subscribe(items => {
    //   this.nav = items;
    //   console.log(this.nav, "again lakshya is on fire")
    //   this.setActiveFlag();
    // });
    this.navService.menuItems$.subscribe(items => {
      this.getnavbar(items)
      this.nav = items;
      this.setActiveFlag();
    });

    let result = await this.http.post(this.apiURL.url.getuserroles, { user_id: localStorage.getItem('user_id') });
    let page = result['data'][0].page_id.split(',')
    let newara = []
    for (let x of page) {
      newara.push(parseInt(x))
    }


    let nav: any = Navbar.filter((e) => { return newara.includes(e.id) });
    let user_type = localStorage.getItem('user_type')
    // on projetc load start
    let a = this.router.url
    let b = a.split('/')[1]
    let isTrue = nav.some((el: any) => el.routeModule == b);
    // console.log(isTrue, "isTrue")
    if (this.router.url != '/users/edit') {
      if (!isTrue) this.router.navigate(['dashboard/v1']);
    }
    // on projetc load ends

    this.router.events.subscribe((event: Event) => {
      // if (user_type == '1' || user_type == '5') {
      if (event instanceof NavigationStart) {
        // console.log(event.url, "lahyssssssss in nav start")
        let a = event.url
        let b = a.split('/')[1]
        let isTrue = nav.some((el: any) => el.routeModule == b);
        console.log(isTrue, "isTrue")
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
  }

  selectItem(item) {
    this.navService.sidebarState.childnavOpen = true;
    this.navService.selectedItem = item;
    this.setActiveMainItem(item);

    // Scroll to top secondary sidebar
    setTimeout(() => {
      this.psContainerSecSidebar.update();
      this.psContainerSecSidebar.scrollToTop(0, 400);
    });
  }
  closeChildNav() {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }
  setActiveMainItem(item) {
    this.nav.forEach(i => {
      i.active = false;
    });
    item.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      // console.log(this.nav, "navvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
      this.nav.forEach(item => {
        item.active = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.navService.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach(subItem => {
            subItem.active = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.navService.selectedItem = item;
              item.active = true;
            }
            if (subItem.sub) {
              subItem.sub.forEach(subChildItem => {
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.navService.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

  updateSidebar() {
    if (Utils.isMobile()) {
      this.navService.sidebarState.sidenavOpen = false;
      this.navService.sidebarState.childnavOpen = false;
    } else {
      this.navService.sidebarState.sidenavOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSidebar();
  }
}
