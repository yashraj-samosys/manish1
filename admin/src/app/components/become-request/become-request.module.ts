import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeRequestRoutingModule } from './become-request-routing.module';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../app/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../../material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    BecomeRequestRoutingModule,
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
export class BecomeRequestModule { }
