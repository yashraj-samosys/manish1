import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { AdminLayoutSidebarLargeComponent } from './shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboad/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'users',
    loadChildren: () => import('./components/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGaurd]
  },
   {
    path: 'fsa',
    loadChildren: () => import('./components/fsa/agent.module').then(m => m.AgentModule),
    canActivate: [AuthGaurd]
  },

  {
    path: 'advertisement',
    loadChildren: () => import('./components/advertisement/advertisment.module').then(m => m.AdvertismentModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'request',
    loadChildren: () => import('./components/request/request.module').then(m => m.RequestModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'contact',
    loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule),
    canActivate: [AuthGaurd]
  },
 
  {
    path: 'footer',
    loadChildren: () => import('./components/footer/footer-text.module').then(m => m.FooterTextModule),
    // canActivate: [AuthGaurd]
  },
  
  {
    path: 'become-request',
    loadChildren: () => import('./components/become-request/become-request.module').then(m => m.BecomeRequestModule),
    canActivate: [AuthGaurd]
  },

  /////////////////////
  {
    path: 'uikits',
    loadChildren: () => import('./views/ui-kits/ui-kits.module').then(m => m.UiKitsModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./views/inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./views/calendar/calendar.module').then(m => m.CalendarAppModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./views/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./views/contacts/contacts.module').then(m => m.ContactsModule)
  },
  // {
  //   path: 'footer-text',
  //   loadChildren: () => import('./views/footer-text.module').then(m => m.FooterTextModule)
  // },
  {
    path: 'tables',
    loadChildren: () => import('./views/data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'icons',
    loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
  },

  // Components routes

];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'session/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      // {
      //   path: 'sessionsss',
      //   loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule)
      // }
      {
        path: 'session',
        loadChildren: () => import('./components/session/session.module').then(m => m.SessionModule)
      }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutSidebarLargeComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'others/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
