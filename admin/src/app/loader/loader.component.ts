import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';
import { LoaderState } from '../shared/services/loader-state.loader.service';
@Component({
  selector: 'app-loader',
  template: `
  <div class="module-loader" *ngIf="show">
    <div class="spinner spinner-bubble spinner-bubble-primary mr-3"></div>
  </div>
`,
  styles: [``]
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}