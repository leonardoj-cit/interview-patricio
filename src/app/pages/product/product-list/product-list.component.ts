import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'author', 'genre', 'language', 'actions'];

  loading$: Observable<boolean>;
  productList$: Observable<any>;

  constructor(private productApiService: ProductApiService) {}

  ngOnInit() {
    this.initStore();
  }

  private initStore() {
    this.productApiService.productLoadAll();
    this.loading$ = this.productApiService.select('loading');
    this.productList$ = this.productApiService.select('product');
  }
}
