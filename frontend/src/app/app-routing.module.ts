import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { DefaultLayoutComponent } from './components/layout/default-layout/default-layout.component';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ConsumerRegistrationComponent } from './components/consumer-registration/consumer-registration.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { VerifyComponent } from './components/verify/verify.component';
import { RequestComponent } from './components/request/request.component';
import { MyRequestComponent } from './components/my-request/request.component';
import { SubagentAccountRequestComponent } from './components/subagent-account-request/subagent-account-request.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { RealtorRegistrationComponent } from './components/realtor-registration/realtor-registration.component';
import { JoinUsComponent } from './components/join-us/realtor-registration.component';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MeetRefferalsComponent } from './components/meet-refferals/meet-refferals.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { UserSubscriptionComponent } from './components/user-subscription/user-subscription.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
const mainRoutes: Routes = [
  // {path  : 'home',component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent,
  children: [
    { 
      path: '', 
      loadChildren: () => new Promise(resolve => {
        setTimeout(() => {
          import('./components/home-map/home-map.module').then(m => resolve(m.HomeMapModule));
        }, 1000); // Adjust the timeout value as needed
      })
    }
  ]
  },
  { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { 
        path: '', 
        loadChildren: () => new Promise(resolve => {
          setTimeout(() => {
            import('./components/home-map/home-map.module').then(m => resolve(m.HomeMapModule));
          }, 1000); // Adjust the timeout value as needed
        })
      }
    ]
  },
  { path: 'join-us', component: JoinUsComponent },
  { path: 'join-us/:agentId', component: JoinUsComponent },
  { path: 'verification/:agentId', component: JoinUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'user-agreement', component: UserAgreementComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'request/:request_id/:status', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'my-request', component: MyRequestComponent, canActivate: [AuthGuard] },
  // {path  : 'create-request/:id',component: CreateRequestComponent,canActivate : [AuthGuard]},
  { path: 'create-request/:id/:fsa_id', component: CreateRequestComponent, canActivate: [AuthGuard] },
  {
    path: '', component: HomeComponent,
    children: [
      { 
        path: '', 
        loadChildren: () => new Promise(resolve => {
          setTimeout(() => {
            import('./components/home-map/home-map.module').then(m => resolve(m.HomeMapModule));
          }, 1000); // Adjust the timeout value as needed
        })
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login/realtor', component: LoginComponent },
  { path: 'login/client', component: LoginComponent },
  { path: 'client-registration', component: ClientRegistrationComponent },
  { path: 'consumer-registration', component: ConsumerRegistrationComponent },
  { path: 'realtor-registration', component: RealtorRegistrationComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'verify/:id', component: VerifyComponent },
  { path: 'become-client', component: SubagentAccountRequestComponent, canActivate: [AuthGuard] },
  { path: 'meet-referal', component: MeetRefferalsComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'forget-pass/:token', component:ForgetPassComponent},

  // { path : 'unsubscribe/:id', component: UnsubscribeComponent, canActivate:[AuthGuard]}
  // { path: 'unsubscribe/:id', component: UnsubscribeComponent },
  { path: 'unsubscribe/:id/:reqId', component: UnsubscribeComponent },
  { path: 'payment-ok', component: UserSubscriptionComponent },
  { path: 'not-found', component: NotFoundComponent },

  { path: '**', redirectTo: 'not-found' },

];


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: AuthLayoutComponent,
    children: mainRoutes
  },
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  //   canActivate: [AuthGaurd],
  //   children: mainRoutes
  // },
  // {
  //   path: '',
  //   component: HomeComponent
  // }
  // {
  //   path: '**',
  //   redirectTo: 'others/404'
  // }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
