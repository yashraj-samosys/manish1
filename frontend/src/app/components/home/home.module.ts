// home.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HomeMapComponent } from '../home-map/home-map.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: HomeMapComponent }
];

@NgModule({
  // declarations: [HomeMapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }