import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartItem } from '../shared/interfaces/cart-item';
import { CartStoreService } from '../shared/services/cart-store.service';
import { CartCheckoutSuccessModalComponent } from './../cart-checkout-success-modal/cart-checkout-success-modal.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'author', 'genre', 'language', 'quantity'];

  checkoutProductList$: Observable<CartItem[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  constructor(
    private cartStoreService: CartStoreService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.initStore();
  }

  checkout() {
    this.openOrderPlacedSuccessModal()
      .afterClosed()
      .subscribe(() => this.router.navigate(['./']));
  }

  abandon() {
    this.cartStoreService.abandonPurchase();
  }

  private initStore() {
    this.checkoutProductList$ = this.cartStoreService.select<CartItem[]>('product');
    this.loading$ = this.cartStoreService.select<boolean>('loading');
    this.loaded$ = this.cartStoreService.select<boolean>('loaded');
  }

  private openOrderPlacedSuccessModal() {
    return this.dialog.open(CartCheckoutSuccessModalComponent);
  }
}
