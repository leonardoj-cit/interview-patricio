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
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';



@NgModule({
  declarations: [CartComponent, CartListComponent, CartCheckoutSuccessModalComponent],
  entryComponents: [CartCheckoutSuccessModalComponent],
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
