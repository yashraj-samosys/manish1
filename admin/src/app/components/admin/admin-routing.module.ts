import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditSubAdminComponent } from './addedit-sub-admin/addedit-sub-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { SubAdminListComponent } from './sub-admin-list/sub-admin-list.component';
import { SubAdminViewComponent } from './sub-admin-view/sub-admin-view.component';

const routes: Routes = [
  { path: 'adminlist', component: AdminListComponent },
  { path: 'subadminlist', component: SubAdminListComponent },
  { path: 'editadmin/:id', component: EditAdminComponent },
  { path: 'addeditsubadmin/:id', component: AddeditSubAdminComponent },
  { path: 'adminview/:id', component: AdminViewComponent },
  { path: 'subadminview/:id', component: SubAdminViewComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
