import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../app/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../../material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ContactViewComponent } from './contact-view/contact-view.component';


@NgModule({
  declarations: [ContactListComponent, ContactViewComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
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
export class ContactModule { }
