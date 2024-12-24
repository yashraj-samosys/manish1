import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { SubAdminListComponent } from './sub-admin-list/sub-admin-list.component';
import { AddeditSubAdminComponent } from './addedit-sub-admin/addedit-sub-admin.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { SubAdminViewComponent } from './sub-admin-view/sub-admin-view.component';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModule } from 'src/app/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from '../user-management/user-management-routing.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminListComponent, 
    EditAdminComponent, 
    SubAdminListComponent, 
    AddeditSubAdminComponent, 
    AdminViewComponent, 
    SubAdminViewComponent
  ],
  imports: [    
    TagInputModule,
    NgSelectModule,
    AngularEditorModule,
    MaterialModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
    ImageCropperModule,
    SharedModule,
    CommonModule,
    AdminRoutingModule, 
    
  ]
})
export class AdminModule { }
