import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';

import { CartItem } from '../shared/interfaces/cart-item';
import { CartStoreService } from '../shared/services/cart-store.service';
import { CartCheckoutSuccessModalComponent } from './../cart-checkout-success-modal/cart-checkout-success-modal.component';
import { CartNotfoundProductModalComponent } from './../cart-notfound-product-modal/cart-notfound-product-modal.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'author', 'genre', 'language', 'quantity'];

  checkoutProductList$: Observable<CartItem[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  saveLoading$: Observable<boolean>;
  subscription: Subscription;
  constructor(
    private cartStoreService: CartStoreService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.initVars();
    this.initStore();
    this.listenError();
    this.initListenCheckoutSuccess();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  checkout() {
    this.cartStoreService.checkout();
  }

  abandon() {
    this.cartStoreService.abandonPurchase();
  }

  initVars() {
    this.subscription = new Subscription();
  }

  private initStore() {
    this.checkoutProductList$ = this.cartStoreService.select<CartItem[]>('product');
    this.loading$ = this.cartStoreService.select<boolean>('loading');
    this.loaded$ = this.cartStoreService.select<boolean>('loaded');
    this.saveLoading$ = this.cartStoreService.select<boolean>('saveLoading');

    this.cartStoreService.loadCheckoutProduct();
  }

  private listenError() {
    this.subscription.add(
      this.cartStoreService
        .select<string[]>('errors')
        .pipe(
          filter((el) => el && !!el.length),
          take(1),
          mergeMap((errors) =>
            this.dialog.open(CartNotfoundProductModalComponent, { data: errors }).afterClosed()
          )
        )
        .subscribe(() => this.cartStoreService.clearErrors())
    );
  }

  private initListenCheckoutSuccess() {
    this.subscription.add(
      this.cartStoreService
        .select<boolean>('checkoutCompleted')
        .pipe(
          filter((el) => !!el),
          take(1),
          mergeMap(() => {
            this.cartStoreService.clearCheckoutCompleted();
            return this.dialog.open(CartCheckoutSuccessModalComponent).afterClosed();
          })
        )
        .subscribe(() => {
          this.router.navigate(['./']);
        })
    );
  }
}
