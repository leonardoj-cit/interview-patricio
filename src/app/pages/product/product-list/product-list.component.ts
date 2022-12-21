import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { Product } from '@interfaces/product';
import { Observable, Subscription } from 'rxjs';

import { CartStoreService } from '../../cart/shared/services/cart-store.service';
import { PageConfig } from '../shared/enums/page-config.enum';
import { ProductStoreService } from '../shared/services/product-store.service';
import {
  ProductOutofstockInfoModalComponent,
} from './../product-outofstock-info-modal/product-outofstock-info-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  PageConfig = PageConfig;
  displayedColumns: string[] = ['name', 'author', 'genre', 'language', 'actions'];

  loading$: Observable<boolean>;
  productList$: Observable<any>;
  selectedProduct!: Product;
  subscription!: Subscription;
  selectedQty: number;
  error$: Observable<any>;

  constructor(
    private productStoreService: ProductStoreService,
    private cartStoreService: CartStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initVars();
    this.initStore();
    this.loadProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageEvent(event: PageEvent) {
    this.productStoreService.productLoadAll({ page: event.pageIndex, limit: event.pageSize });
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
    this.loading$ = this.productStoreService.select<boolean>('loading');
    this.productList$ = this.productStoreService.select<Product>('product');
  }

  private loadProducts() {
    this.productStoreService.productLoadAll({ page: 0, limit: PageConfig.ITEMS_PER_PAGE });
  }
  private openOutOfStockInfoModal() {
    this.dialog.open(ProductOutofstockInfoModalComponent);
  }
}
