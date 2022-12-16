import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Product } from '../interfaces/product';
import { ProductState } from '../interfaces/product-state';
import { ProductApiService } from './product-api.service';

@Injectable()
export class ProductStoreService {
  state: ProductState = {
    product: [],
    loading: false,
    error: '',
  };

  dataEmitter = new BehaviorSubject<ProductState>({
    product: [],
    loading: false,
    error: '',
  });

  onDataChange = this.dataEmitter.asObservable();

  constructor(private productApiService: ProductApiService) {}
  private changeData(state: ProductState) {
    this.dataEmitter.next(state);
  }

  private changeState(newState: Partial<ProductState>) {
    this.state = { ...this.state, ...newState };
    this.changeData(this.state);
  }

  productLoadAll() {
    this.changeState({ loading: true });
    this.productApiService
      .get<null, Product[]>()
      .pipe(delay(2000)) // Simulate server delay
      .subscribe((res) => {
        this.changeState({ loading: false, product: res.data });
      });
  }

  select(property: string) {
    return this.onDataChange.pipe(
      map((el) => {
        return el[property];
      })
    );
  }
}
