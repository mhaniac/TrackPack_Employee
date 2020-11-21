import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadComponent } from './load/load.component';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from './register/register.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard],children: [
    { path: '', component: DashboardComponent },
    { path: 'load', component: LoadComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reports', component: ReportsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
