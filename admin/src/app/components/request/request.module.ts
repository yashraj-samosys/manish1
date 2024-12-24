import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestViewComponent } from './request-view/request-view.component';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../app/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../../material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [RequestListComponent, RequestViewComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    TagInputModule,
    NgSelectModule,
    AngularEditorModule,
    MaterialModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RequestModule { }
