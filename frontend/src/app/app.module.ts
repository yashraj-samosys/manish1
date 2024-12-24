import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { HomeComponent } from './components/home/home.component';
import { LayoutsModule } from './components/layout/layouts.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ConsumerRegistrationComponent } from './components/consumer-registration/consumer-registration.component';
import { RealtorRegistrationComponent } from './components/realtor-registration/realtor-registration.component';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SubagentAccountRequestComponent } from './components/subagent-account-request/subagent-account-request.component';
import { RequestComponent } from './components/request/request.component';
import { MyRequestComponent } from './components/my-request/request.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { NgSelectModule } from '@ng-select/ng-select';
// import { MaterialModule} from './material.module';

import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { ApiUrlService } from 'src/app/services/apiUrl.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
    TranslateModule,
    TranslateLoader,
    TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { JoinUsComponent } from './components/join-us/realtor-registration.component';
import { MeetRefferalsComponent } from './components/meet-refferals/meet-refferals.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { UserSubscriptionComponent } from './components/user-subscription/user-subscription.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxMatTagInputModule } from 'ngx-mat-tag-input';
import { ngxToastrConfig } from './components/validations/toaster';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeMapComponent } from './components/home-map/home-map.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// import { NgxTagsModule } from 'ngx-tags';

@NgModule({
    declarations: [
        AppComponent,
        MyRequestComponent,
        JoinUsComponent,
        HomeComponent,
        ContactUsComponent,
        AboutUsComponent,
        LoginComponent,
        UserAgreementComponent,
        TermsConditionsComponent,
        ConsumerRegistrationComponent,
        VerifyComponent,
        RealtorRegistrationComponent,
        ClientRegistrationComponent,
        SubagentAccountRequestComponent,
        RequestComponent,
        CreateRequestComponent,
        MeetRefferalsComponent,
        IdeasComponent,
        EditProfileComponent,
        UnsubscribeComponent,
        UserSubscriptionComponent,
        NotFoundComponent,
        ForgetPassComponent,
        HomeMapComponent
        
    ],
    imports: [
    
        BrowserModule, NgxMatTagInputModule,
        NgbModule,
        AppRoutingModule,
        AngularMultiSelectModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutsModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        ImageCropperModule,
        ToastrModule.forRoot(ngxToastrConfig),
        AgmCoreModule.forRoot({
            apiKey: environment.apiKey,
            libraries: ['places'],
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // providers: [ApiUrlService,CommonService,AuthService,AuthGuard],
    providers: [
        ApiUrlService,
        CommonService,
        AuthService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true },
    ],

    bootstrap: [AppComponent],
})
export class AppModule { }