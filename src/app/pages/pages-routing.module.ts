import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadDispatchComponent } from './load-dispatch/load-dispatch.component';
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
    { path: 'update-tracking', component: UpdateTrackingComponent },
    { path: 'load-dispatch', component: LoadDispatchComponent },
    { path: 'bill', component: BillComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
