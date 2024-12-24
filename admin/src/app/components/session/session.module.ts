import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionRoutingModule } from './session-routing.module';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [LoginComponent, UpdatePasswordComponent],
  imports: [
    CommonModule,
    SessionRoutingModule, FormsModule, ReactiveFormsModule
  ],
  exports:[]
})
export class SessionModule { }
