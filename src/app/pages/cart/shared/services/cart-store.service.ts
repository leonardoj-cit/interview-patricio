import { Injectable } from '@angular/core';
import { PageResult } from '@services/http-client/interfaces/page-result';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { CartItem } from '../interfaces/cart-item';
import { CartState } from '../interfaces/cart-state';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  state: CartState = {
    product: [],
    loading: false,
    saveLoading: false,
    loaded: false,
    error: '',
  };

  dataEmitter = new BehaviorSubject<CartState>(this.state);

  onDataChange = this.dataEmitter.asObservable();

  constructor(private cartApiService: CartApiService) {}
  private changeData(state: CartState) {
    this.dataEmitter.next(state);
  }

  private changeState(data: Partial<CartState>) {
    this.state = { ...this.state, ...data };
    this.changeData(this.state);
  }

  cartLoadCheckoutAll() {
    this.changeState({ loading: true, loaded: false });
    this.cartApiService
      .getAll<CartItem[]>()
      .pipe(delay(1000))
      .subscribe(
        (res) => {
          this.changeState({ loading: false, product: res.data, loaded: true });
        },
        (error) => this.changeState({ loading: false, error, loaded: true })
      );
  }

  addProductToCart(item: CartItem) {
    const targetItem = this.state.product.find((el) => el.id === item.id);
    let source!: Observable<PageResult<CartItem>>;
    if (targetItem && !!targetItem.id) {
      // Update the item quantity on state
      this.changeState({
        product: [...this.state.product].map((el) => {
          if (el.id === item.id) {
            return { ...el, quantity: el.quantity + item.quantity };
          }
          return el;
        }),
        loading: true,
      });
      source = this.cartApiService.updateOne<Partial<CartItem>, CartItem>({
        id: item.id,
        changes: { quantity: item.quantity + targetItem.quantity },
      });
    } else {
      this.changeState({ product: [...this.state.product, item], loading: true });
      source = this.cartApiService.createOne<CartItem, CartItem>({ payload: item });
    }
    source.subscribe(
      (res) => this.changeState({ lastAddedItem: res.data, loading: false }),
      (error) => this.changeState({ error, loading: false })
    );
  }

  abandonPurchase() {
    this.changeState({ product: [], saveLoading: true });
    const idList = this.state.product.map((el) => el.id);
    this.cartApiService.deleteMany({ idList }).subscribe(
      (res) => this.changeState({ product: [], saveLoading: false }),
      (error) => this.changeState({ error, saveLoading: false })
    );
  }

  select<T>(property: string) {
    return this.onDataChange.pipe(
      map((el) => {
        return el[property] as T;
      })
    );
  }
}
