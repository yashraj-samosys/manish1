import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminVerifyComponent } from './admin-verify/admin-verify.component';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'update-pass/:token', component: UpdatePasswordComponent },
  { path: 'adminVerify', component: AdminVerifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
