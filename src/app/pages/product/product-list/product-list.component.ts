import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CartStoreService } from '../../cart/shared/services/cart-store.service';
import { Product } from '../shared/interfaces/product';
import { ProductStoreService } from '../shared/services/product-store.service';
import { CartItem } from './../../cart/shared/interfaces/cart-item';
import {
  ProductOutofstockInfoModalComponent,
} from './../product-outofstock-info-modal/product-outofstock-info-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'author', 'genre', 'language', 'actions'];

  loading$: Observable<boolean>;
  productList$: Observable<any>;
  selectedProduct!: Product;
  subscription!: Subscription;
  selectedQty: number;

  constructor(
    private productStoreService: ProductStoreService,
    private cartStoreService: CartStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initVars();
    this.initStore();
    this.listenForCartLastAddedItem();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addProductToCart(product: Product, qty: number) {
    this.selectedProduct = product;
    this.selectedQty = qty;
    if (qty > product.quantity) {
      this.openOutOfStockInfoModal();
    } else {
      this.cartStoreService.addProductToCart({ ...product, ...{ quantity: Number(qty) } });
    }
  }
  private initVars() {
    this.subscription = new Subscription();
  }

  private initStore() {
    this.productStoreService.productLoadAll();
    this.loading$ = this.productStoreService.select('loading');
    this.productList$ = this.productStoreService.select('product');
  }

  private openOutOfStockInfoModal() {
    this.dialog.open(ProductOutofstockInfoModalComponent);
  }

  private listenForCartLastAddedItem() {
    this.subscription.add(
      this.cartStoreService
        .select('lastAddedItem')
        .pipe(filter((el) => !!el))
        .subscribe((item: CartItem) => {
          if (this.selectedProduct && this.selectedProduct.id === item.id) {
            console.log(item);

            this.productStoreService.productUpdateOne({
              id: this.selectedProduct.id,
              changes: { quantity: this.selectedProduct.quantity - this.selectedQty },
            });
            this.selectedProduct = null;
          }
        })
    );
  }
}
