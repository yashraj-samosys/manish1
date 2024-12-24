import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgentRoutingModule } from './agent-routing.module';
import { MaterialModule } from '../../material.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [ListComponent, ViewComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MaterialModule,
    AngularEditorModule,
    TagInputModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
      libraries: ['places'],
      }),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AgentModule { }
