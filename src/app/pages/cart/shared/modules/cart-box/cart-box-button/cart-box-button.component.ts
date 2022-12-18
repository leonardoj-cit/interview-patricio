import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRootRouteLink } from 'src/app/pages/app-root/shared/enums/app-root-route-link.enum';

import { CartItem } from '../../../interfaces/cart-item';
import { CartStoreService } from '../../../services/cart-store.service';
import { CartBoxInfoModalComponent } from './../cart-box-info-modal/cart-box-info-modal.component';

@Component({
  selector: 'app-cart-box-button',
  templateUrl: './cart-box-button.component.html',
  styleUrls: ['./cart-box-button.component.scss'],
})
export class CartBoxButtonComponent implements OnInit {
  cartItemList$: Observable<CartItem[]>;

  constructor(
    private cartStoreService: CartStoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initStore();
  }

  gotoCheckout(cartItemList: CartItem[]) {
    !!cartItemList.length
      ? this.router.navigate([`./${AppRootRouteLink.CHECKOUT}`])
      : this.openCartEmptyInfoModal();
  }

  private initStore() {
    this.cartItemList$ = this.cartStoreService.select('product');
    this.cartStoreService.cartLoadCheckoutAll();
  }

  private openCartEmptyInfoModal() {
    this.dialog.open(CartBoxInfoModalComponent);
  }
}
