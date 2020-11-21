import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideBarComponent } from './aside-bar/aside-bar.component';
import { PagesRoutingModule } from '../pages/pages-routing.module';



@NgModule({
  declarations: [AsideBarComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports: [
    AsideBarComponent
  ]
})
export class SharedModule { }
