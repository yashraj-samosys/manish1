import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterTextComponent } from './footer-1/footer-text.component';

const routes: Routes = [
  {
    path: 'footer-text',
    component: FooterTextComponent
  },
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterTextRoutingModule { }
