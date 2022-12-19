import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';

import { ProductListComponent } from './product-list/product-list.component';
import {
  ProductOutofstockInfoModalComponent,
} from './product-outofstock-info-modal/product-outofstock-info-modal.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductStoreService } from './shared/services/product-store.service';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductOutofstockInfoModalComponent],
  entryComponents: [ProductOutofstockInfoModalComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [ ProductStoreService],
})
export class ProductModule {}
