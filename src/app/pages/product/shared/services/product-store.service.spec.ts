import { HttpClientModule } from '@angular/common/http';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Product } from '@interfaces/product';
import { ProductApiService } from '@services/product/product-api.service';
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';

import { ProductStoreService } from './product-store.service';

describe('ProductStoreService', () => {
  let service: ProductStoreService;
  let productList: Product[];
  let productApiServiceSpy: { getAll: jasmine.Spy };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductStoreService, ProductApiService],
    });

    productApiServiceSpy = jasmine.createSpyObj('ProductApiService', ['getAll']);
    service = new ProductStoreService(productApiServiceSpy as any);
    productList = [
      {
        id: '7',
        name: 'And Then There Were None',
        author: 'Agatha Christie',
        genre: ['mystery'],
        language: 'English',
        quantity: 1,
      },
    ];
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should load  all product data from server', () => {
    const pageOptions = { page: 1, limit: 1 };

    productApiServiceSpy.getAll.and.returnValue(of({ data: productList }));

    service.productLoadAll(pageOptions);

    service.onDataChange.pipe(skip(1)).subscribe((el) => {
      expect(el.product.length).toEqual(1);
    });
  });
  it('should change the state and set new values on state', fakeAsync(() => {
    service['changeState']({ loading: true, product: productList });
    expect(service.state.loading).toBeTruthy();
    expect(service.state.product.length).toBeGreaterThan(0);
  }));
  it('should change data and emit new values', fakeAsync(() => {
    service['changeData']({
      loading: true,
      product: productList,
      saveLoading: true,
      error: null,
      loaded: true,
    });
    tick();
    service.onDataChange.subscribe((data) => {
      expect(data.loading).toBeTruthy();
      expect(data.product.length).toBeGreaterThan(0);
      expect(data.loaded).toBeTruthy();
      expect(data.saveLoading).toBeTruthy();
    });
  }));
  it('should destroy service and clear subscriptions', fakeAsync(() => {
    service.ngOnDestroy();

    tick();

    expect(service.subscription.closed).toBeTruthy();
  }));
});
