import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertismentComponent } from './advertisment/advertisment.component';
import {ListComponent} from './list/list/list.component'
import { ViewComponent } from './view/view/view.component';


const routes: Routes = [
  {        
    path:'add-edit/:id',
    component:AdvertismentComponent
  },
  {
    path: 'list',
    component:ListComponent 
   },

   { path: 'view/:id',
    component:  ViewComponent
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertismentRoutingModule { }
