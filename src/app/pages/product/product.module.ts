import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';

import { ProductListComponent } from './product-list/product-list.component';
import {
  ProductOutofstockInfoModalComponent,
} from './product-outofstock-info-modal/product-outofstock-info-modal.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductApiService } from './shared/services/product-api.service';
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
    MatDialogModule
  ],
  providers: [ProductApiService, ProductStoreService],
})
export class ProductModule {}
