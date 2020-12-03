import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadComponent } from './load/load.component';
import { PagesComponent } from './pages.component';
import { RegisterTrackingComponent } from './register-tracking/register-tracking.component';
import { RegisterComponent } from './register/register.component';
import { ReportsComponent } from './reports/reports.component';
import { UpdateTrackingComponent } from './update-tracking/update-tracking.component';

const routes: Routes = [
  { path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard],children: [
    { path: '', component: DashboardComponent },
    { path: 'load', component: LoadComponent},
    { path: 'register-tracking', component: RegisterTrackingComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'update-tracking', component: UpdateTrackingComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
