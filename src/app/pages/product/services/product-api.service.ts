import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/services/http-client/http-client.service';
import { BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Product } from '../interfaces/product';
import { ProductState } from '../interfaces/product-state';

@Injectable()
export class ProductApiService extends HttpClientService {
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

  constructor(public httpClient: HttpClient) {
    super(httpClient, 'stock');
  }

  private changeData(state: ProductState) {
    console.log(state);
    this.dataEmitter.next(state);
  }

  private changeState(newState: Partial<ProductState>) {
    this.state = { ...this.state, ...newState };
    console.log(this.state )
    this.changeData(this.state);
  }

  productLoadAll() {
    this.changeState({ loading: true });
    this.get<null, Product[]>()
      .pipe(delay(2000)) // Simulate server delay
      .subscribe((res) => {
        console.log(res)
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
