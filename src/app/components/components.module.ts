import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [CardComponent, AlertComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
