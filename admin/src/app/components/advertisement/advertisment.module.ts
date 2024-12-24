import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdvertismentRoutingModule } from './advertisment-routing.module';
import {MaterialModule} from '../../material.module'
import {RouterModule} from '@angular/router'
import {ListComponent} from './list/list/list.component'

import { AdvertismentComponent } from './advertisment/advertisment.component';
//import { ViewComponent } from './view/view/view.component';
import {ViewComponent} from './view/view/view.component'
import { ImageCropperModule } from 'ngx-img-cropper';


@NgModule({
  declarations: [ListComponent,AdvertismentComponent, ViewComponent],
  imports: [
    CommonModule,
    AdvertismentRoutingModule,
    CommonModule,
   
   AdvertismentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MaterialModule,
    AngularEditorModule,
    TagInputModule,
    NgSelectModule,
    RouterModule,
    ImageCropperModule
  ]
})
export class AdvertismentModule { }
