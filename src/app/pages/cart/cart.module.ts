import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';



@NgModule({
  declarations: [CartComponent, CartListComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
