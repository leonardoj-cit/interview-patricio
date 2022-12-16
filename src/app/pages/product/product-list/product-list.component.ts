import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../shared/interfaces/product';
import { ProductStoreService } from '../shared/services/product-store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'author', 'genre', 'language', 'actions'];

  loading$: Observable<boolean>;
  productList$: Observable<any>;

  constructor(private productStoreService: ProductStoreService) {}

  ngOnInit() {
    this.initStore();
  }

  private initStore() {
    this.productStoreService.productLoadAll();
    this.loading$ = this.productStoreService.select('loading');
    this.productList$ = this.productStoreService.select('product');
  }

  addProductToCart(product: Product, qty: number) {}
}
