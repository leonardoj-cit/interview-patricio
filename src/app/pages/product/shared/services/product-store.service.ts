import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '@interfaces/product';
import { ProductApiService } from '@services/product/product-api.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ProductState } from '../interfaces/product-state';

@Injectable()
export class ProductStoreService implements OnDestroy {
  subscription: Subscription;
  initialState: ProductState = {
    product: [],
    loading: false,
    saveLoading: false,
    loaded: false,
    error: '',
  };
  state: ProductState = this.initialState;

  dataEmitter = new BehaviorSubject<ProductState>(this.initialState);

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
  productLoadAll({ page, limit }: { page: number; limit: number }) {
    this.changeState({ loading: true, loaded: false });
    this.subscription.add(
      this.productApiService
        .getAll<Product[]>({
          requestOptionsUrlFragment: `_page=${page + 1}&_limit=${limit}`,
        })
        .pipe(delay(1000)) // Simulate server delay
        .subscribe(
          (res) => {
            this.changeState({ loading: false, product: res.data, loaded: true });
          },
          (error) => this.changeState({ loading: false, error, loaded: true })
        )
    );
  }

  clearState() {
    this.state = { ...this.initialState };
    this.changeState(this.state);
  }

  select<T>(property: string) {
    return this.onDataChange.pipe(
      map((el) => {
        return el[property] as T;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
