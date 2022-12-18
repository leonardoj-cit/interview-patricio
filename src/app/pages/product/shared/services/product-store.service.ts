import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Product } from '../interfaces/product';
import { ProductState } from '../interfaces/product-state';
import { ProductApiService } from './product-api.service';

@Injectable()
export class ProductStoreService implements OnDestroy {
  subscription: Subscription;
  state: ProductState = {
    product: [],
    loading: false,
    saveLoading: false,
    loaded: false,
    error: '',
  };

  dataEmitter = new BehaviorSubject<ProductState>(this.state);

  onDataChange = this.dataEmitter.asObservable();

  constructor(private productApiService: ProductApiService) {
    this.subscription = new Subscription();
  }

  // Reducer
  private changeData(state: ProductState) {
    this.dataEmitter.next(state);
  }

  private changeState(newState: Partial<ProductState>) {
    this.state = { ...this.state, ...newState };
    this.changeData(this.state);
  }

  // Side effects
  productLoadAll() {
    this.changeState({ loading: true, loaded: false });
    this.subscription.add(
      this.productApiService
        .getAll<Product[]>()
        .pipe(delay(1000)) // Simulate server delay
        .subscribe(
          (res) => {
            this.changeState({ loading: false, product: res.data, loaded: true });
          },
          (error) => this.changeState({ loading: false, error, loaded: true })
        )
    );
  }

  productUpdateOne({ id, changes }: { id: string; changes: Partial<Product> }) {
    this.changeState({ saveLoading: true });
    this.subscription.add(
      this.productApiService.updateOne<Partial<Product>, Product>({ id, changes }).subscribe(
        (res) => {
          const updatedProductList = [...this.state.product].map((el) =>
            el.id == res.data.id ? res.data : el
          );
          this.changeState({ saveLoading: false, product: updatedProductList });
        },
        (error) => this.changeState({ saveLoading: false, error })
      )
    );
  }

  // Selector
  select(property: string) {
    return this.onDataChange.pipe(
      map((el) => {
        return el[property];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
