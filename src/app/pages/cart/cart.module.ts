import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';

import { CartCheckoutSuccessModalComponent } from './cart-checkout-success-modal/cart-checkout-success-modal.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartNotfoundProductModalComponent } from './cart-notfound-product-modal/cart-notfound-product-modal.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';



@NgModule({
  declarations: [CartComponent, CartListComponent, CartCheckoutSuccessModalComponent, CartNotfoundProductModalComponent],
  entryComponents: [CartCheckoutSuccessModalComponent, CartNotfoundProductModalComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class CartModule { }
