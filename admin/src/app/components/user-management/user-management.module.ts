import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../../material.module';
import { ViewComponent } from './view/view.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ListClientComponent } from './list-client/list-client.component';
import { ListPartnerComponent } from './list-partner/list-partner.component';
import { MakeNearbyComponent } from './make-nearby/make-nearby.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../../app/shared/shared.module';
import { ListDefaultAgentComponent } from './list-default-agent/list-client.component';
import { EditComponent } from './edit/edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [ListDefaultAgentComponent,ViewComponent, AddEditComponent, ListClientComponent, ListPartnerComponent, ListUsersComponent, EditComponent,MakeNearbyComponent],
  imports: [
    CommonModule,
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
    DragDropModule,
    AgmCoreModule.forRoot({ apiKey: environment.apiKey, libraries: ['places'] }),
  ]
})
export class UserManagementModule { }
