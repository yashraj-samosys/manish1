import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LoaderState } from '../services/loader-state.loader.service';
declare let $: any;
@Component({
  selector: 'app-loader',
  template: `
  
<div class="img-loader" *ngIf="show">

<img alt="" src="assets/images/Spinner-2.gif">


</div>

  
  
`,
  styles: [`  
  
  .img-loader{

    display: flex;
    position: fixed;
    background-color: #fffc;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2342435234;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
    right: 0;
    top: 0;
    bottom: 0;


  }

  `]
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewChecked {
  show = false;
  // private subscription: Subscription;
  public subscription: Subscription = new Subscription();
  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.cdRef.detectChanges();
      });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



