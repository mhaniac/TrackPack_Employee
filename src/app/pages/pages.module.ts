import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadComponent } from './load/load.component';
import { SharedModule } from '../shared/shared.module'; 
import { ComponentsModule } from '../components/components.module';
import { RegisterComponent } from './register/register.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [PagesComponent, DashboardComponent, LoadComponent, RegisterComponent, ReportsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule 
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    LoadComponent
  ]
})
export class PagesModule { }
