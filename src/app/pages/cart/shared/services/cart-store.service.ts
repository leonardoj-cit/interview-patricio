import { Injectable } from '@angular/core';
import { Product } from '@interfaces/product';
import { PageResult } from '@services/http-client/interfaces/page-result';
import { ProductApiService } from '@services/product/product-api.service';
import { BehaviorSubject } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';

import { CartItem } from '../interfaces/cart-item';
import { CartProductId } from '../interfaces/cart-product-id';
import { CartState } from '../interfaces/cart-state';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  SESSION_PRODUCT_ID_KEY = 'cartProductIdList';
  SESSION_CART_CREATED_AT_KEY = 'cartCreatedAt';
  initialState: CartState = {
    product: [],
    productId: [],
    loading: false,
    saveLoading: false,
    loaded: false,
    errors: [],
    checkoutCompleted: false,
  };
  state: CartState = this.initialState;
  dataEmitter = new BehaviorSubject<CartState>(this.initialState);
  onDataChange = this.dataEmitter.asObservable();

  constructor(
    private cartApiService: CartApiService,
    private productApiService: ProductApiService
  ) {
    this.loadCheckoutFromSessionStorage();
    this.validateCartTimeLimit();
  }
  // Actions
  addProductToCart(item: CartItem) {
    this.setCartOpenedDate();
    const targetItem = this.state.productId.find((el) => el.id === item.id);

    if (targetItem && !!targetItem.id) {
      this.changeState({
        productId: [...this.state.productId].map((el) => {
          if (el.id === item.id) {
            return { ...el, quantity: item.quantity };
          }
          return el;
        }),
      });
    } else {
      this.changeState({
        productId: [
          ...this.state.productId,
          { name: item.name, id: item.id, quantity: item.quantity },
        ],
      });
    }
    sessionStorage.setItem(this.SESSION_PRODUCT_ID_KEY, JSON.stringify(this.state.productId));
  }

  loadCheckoutProduct() {
    this.changeState({ loading: true, loaded: false });

    const cartProductList: CartProductId[] = JSON.parse(
      sessionStorage.getItem(this.SESSION_PRODUCT_ID_KEY)
    );

    if (cartProductList && !!cartProductList.length) {
      const idList = cartProductList.map((el) => el.id);

      this.productApiService
        .getMany<Product>({ idList })
        .pipe(delay(1000))
        .subscribe(
          (res) => {
            let errorMsg = [];
            this.changeState({ productId: [], product: [] });

            res.map((el) => {
              if (el.hasError) {
                errorMsg = [...errorMsg, this.mapItemNotFoundErrorMessage(el)];
              } else {
                const buyQuantity = cartProductList.find((val) => val.id === el.data.id).quantity;
                this.changeState({
                  product: [...this.state.product, { ...el.data, quantity: buyQuantity }],
                  productId: [
                    ...this.state.productId,
                    { id: el.data.id, name: el.data.name, quantity: buyQuantity },
                  ],
                });
              }
            });

            this.changeState({
              errors: [...this.state.errors, ...errorMsg],
              loading: false,
              loaded: true,
            });
            sessionStorage.setItem(
              this.SESSION_PRODUCT_ID_KEY,
              JSON.stringify(this.state.productId)
            );
          },
          (error) => {
            this.changeState({ loading: false, errors: error, loaded: true });
          }
        );
    } else {
      this.changeState({ loading: false, product: [], loaded: true });
    }
  }

  checkout() {
    this.changeState({ saveLoading: true });
    const productIdList = this.state.product.map((el) => el.id);
    this.productApiService
      .deleteMany({ idList: productIdList })
      .pipe(
        mergeMap(() => this.cartApiService.createMany({ payloadList: this.state.product })),
        delay(1000) // Simulate server delay
      )
      .subscribe(
        () => {
          this.changeState({
            product: [],
            saveLoading: false,
            productId: [],
            checkoutCompleted: true,
          });
          this.clearUserSessionData();
        },
        (error) => {
          this.changeState({ errors: error, saveLoading: false });
        }
      );
  }

  abandonPurchase() {
    this.changeState({ product: [], productId: [] });
    this.clearUserSessionData();
  }

  clearCheckoutCompleted() {
    this.changeState({ checkoutCompleted: false });
  }

  clearErrors() {
    this.changeState({ errors: [] });
  }

  clearState() {
    this.state = { ...this.initialState };
    this.changeState(this.state);
  }

  // Selector
  select<T>(property: string) {
    return this.onDataChange.pipe(
      map((el) => {
        return el[property] as T;
      })
    );
  }

  // Reducer
  private changeData(state: CartState) {
    this.dataEmitter.next(state);
  }

  private changeState(data: Partial<CartState>) {
    this.state = { ...this.state, ...data };
    this.changeData(this.state);
  }

  private loadCheckoutFromSessionStorage() {
    const cartProductList = sessionStorage.getItem(this.SESSION_PRODUCT_ID_KEY) || '[]';
    this.changeState({ productId: JSON.parse(cartProductList) });
    return cartProductList;
  }

  // Utils
  private mapItemNotFoundErrorMessage(data: PageResult<Product>) {
    if (data.error.status === 404) {
      const urlArray = data.error.url.split('/');
      const id = urlArray[urlArray.length - 1];
      const cartProductList = JSON.parse(sessionStorage.getItem(this.SESSION_PRODUCT_ID_KEY));

      const product = cartProductList.find((val) => val.id == id);
      return `The book "${product.name}" is out of stock and it was removed from the Cart.`;
    } else {
      return data.error.statusText;
    }
  }

  private setCartOpenedDate() {
    if (!sessionStorage.getItem(this.SESSION_PRODUCT_ID_KEY)) {
      sessionStorage.setItem(this.SESSION_CART_CREATED_AT_KEY, new Date().toISOString());
    }
  }

  private validateCartTimeLimit() {
    if (sessionStorage.getItem(this.SESSION_CART_CREATED_AT_KEY)) {
      const createdAt = new Date(sessionStorage.getItem(this.SESSION_CART_CREATED_AT_KEY));
      const finalDate = new Date(new Date(createdAt).getTime() + 60 * 60 * 24 * 1000);

      const today = new Date();
      const isTimeExpired = today.getTime() > finalDate.getTime();
      if (isTimeExpired) {
        this.changeState({ product: [], productId: [] }), this.clearUserSessionData();
      }
    }
  }

  private clearUserSessionData() {
    sessionStorage.removeItem(this.SESSION_PRODUCT_ID_KEY);
    sessionStorage.removeItem(this.SESSION_CART_CREATED_AT_KEY);
  }
}
