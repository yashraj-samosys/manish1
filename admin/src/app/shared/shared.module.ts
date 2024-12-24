import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from './components/search/search.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { ApiUrlService } from './services/apiUrl.service'
import { CommonService } from './services/common.service';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SearchModule,
    ToastrModule.forRoot(),
    NgbModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    RouterModule,
    AgmCoreModule.forRoot({ apiKey: environment.apiKey, libraries: ['places'] }),
  ],
  providers: [ApiUrlService, CommonService],
  declarations: []
})
export class SharedModule { }
