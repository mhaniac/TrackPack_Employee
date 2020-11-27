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
import { RegisterTrackingComponent } from './register-tracking/register-tracking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [PagesComponent, DashboardComponent, LoadComponent, RegisterComponent, ReportsComponent, RegisterTrackingComponent, CustomerComponent],
  imports: [
    CommonModule, 
    PagesRoutingModule,
    SharedModule, 
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    LoadComponent
  ]
})
export class PagesModule { }
