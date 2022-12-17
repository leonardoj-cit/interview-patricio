import { Injectable } from '@angular/core';
import { PageResult } from '@services/http-client/interfaces/page-result';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.changeState({ loading: true });
    this.cartApiService.getAll<CartItem[]>().subscribe(
      (res) => {
        this.changeState({ loading: false, product: res.data });
      },
      (error) => this.changeState({ loading: false, error })
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

  select(property: string) {
    return this.onDataChange.pipe(
      map((el) => {
        return el[property];
      })
    );
  }
}
