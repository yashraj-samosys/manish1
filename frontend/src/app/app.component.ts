import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public href: any = "";

  constructor(private route: ActivatedRoute) {

   }

  ngOnInit() {
    var currentUrl = window.location.href;
    this.href = currentUrl.search('verify') != -1 ? 'hide' : currentUrl.search('partner-agent') != -1 ? 'hide' : currentUrl.search('unsubscribe') != -1 ? 'hide' : '';


    this.startHourlyFunction(() => {
      localStorage.removeItem('mapPointerDataPublic')
      localStorage.removeItem('mapPointerDataPrivate')

      // console.log('remove item in every one second')
    });
  }
 
  async ngAfterViewInit() {
    this.disableAosMobile();
  }

  attempt = 0
  maxAttempt = 10
  disableAosMobile() {
    this.attempt++
    setTimeout(() => {
      console.log(this.attempt);
      AOS.init({
        disable: 'mobile'
      });
      if (this.attempt < this.maxAttempt) {
        this.ngAfterViewInit()
      }
    }, 1000);

  }
  onActivate(event: any) {

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  private intervalId: any;
  private readonly oneHour = 3600000; // 1 hour in milliseconds
  private destroy$ = new Subject<void>();



  startHourlyFunction(callback: () => void) {
    this.stopHourlyFunction(); // Clear any existing interval
    this.intervalId = setInterval(callback, this.oneHour);
  }

  stopHourlyFunction() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    this.stopHourlyFunction();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
