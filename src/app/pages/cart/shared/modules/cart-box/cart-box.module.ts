import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule, MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { CartBoxButtonComponent } from './cart-box-button/cart-box-button.component';
import { CartBoxInfoModalComponent } from './cart-box-info-modal/cart-box-info-modal.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatBadgeModule, MatIconModule],
  declarations: [CartBoxButtonComponent, CartBoxInfoModalComponent],
  exports: [CartBoxButtonComponent, CartBoxInfoModalComponent],
  entryComponents: [CartBoxInfoModalComponent],
})
export class CartBoxModule {}
