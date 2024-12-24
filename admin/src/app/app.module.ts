import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpService} from './shared/services/http.service';
import { FooterTextModule } from './components/footer/footer-text.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminVerifyComponent } from './components/session/admin-verify/admin-verify.component';
import { ToastrModule } from 'ngx-toastr';
import { ngxToastrConfig } from './validations/toaster';



@NgModule({
  declarations: [
    AppComponent,
    AdminVerifyComponent,
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FooterTextModule,
    ImageCropperModule,
    ToastrModule.forRoot(ngxToastrConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
