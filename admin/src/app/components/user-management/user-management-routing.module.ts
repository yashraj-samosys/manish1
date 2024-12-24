import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListPartnerComponent } from './list-partner/list-partner.component';
import { ListDefaultAgentComponent } from './list-default-agent/list-client.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditComponent } from './edit/edit.component';
import { MakeNearbyComponent } from './make-nearby/make-nearby.component';
const routes: Routes = [
  { path: 'list-client', component: ListClientComponent },
  { path: 'list-default-agent', component: ListDefaultAgentComponent },
  { path: 'list-partner', component: ListPartnerComponent },    
  { path: 'list-users', component: ListUsersComponent },
  { path: 'nearby-agents', component: MakeNearbyComponent },
  { path: 'view/:id/:type', component: ViewComponent },
  // { path: 'view/:id/:type/:is_default', component: ViewComponent },
  { path: 'add-edit/:id/:type/:is_default', component: AddEditComponent },
  { path: 'edit', component: EditComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
