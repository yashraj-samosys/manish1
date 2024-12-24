import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { FooterTextRoutingModule } from './footer-text-routing.module';
import { FooterTextComponent } from './footer-1/footer-text.component';



@NgModule({
  declarations: [FooterTextComponent],
  imports: [
    CommonModule,
    FooterTextRoutingModule,
    ReactiveFormsModule
  ]
})
export class FooterTextModule { }
