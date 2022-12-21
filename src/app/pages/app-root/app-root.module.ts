import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { CartBoxModule } from '../cart/shared/modules/cart-box/cart-box.module';
import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root.component';

@NgModule({
  declarations: [AppRootComponent],
  imports: [
    CommonModule,
    AppRootRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,

    MatDialogModule,
    CartBoxModule,
  ],
})
export class AppRootModule {}
