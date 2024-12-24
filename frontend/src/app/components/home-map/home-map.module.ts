import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMapComponent } from './home-map.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';

@NgModule({
  // declarations: [HomeMapComponent],
  imports: [
    CommonModule,
    // RouterModule.forChild([{ path: '', component: HomeMapComponent }]),
    AgmCoreModule.forRoot({
        apiKey: environment.apiKey,
        libraries: ['places'],
    }),
  ]
})
export class HomeMapModule { }