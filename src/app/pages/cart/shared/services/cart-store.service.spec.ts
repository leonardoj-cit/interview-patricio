import { HttpClientModule } from '@angular/common/http';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CartItem } from '../interfaces/cart-item';
import { CartApiService } from './cart-api.service';
import { CartStoreService } from './cart-store.service';

describe('CartStoreService', () => {
  let service: CartStoreService;
  let productList: CartItem[];
  let cartApiServiceSpy: { createMany: jasmine.Spy };
  let productApiServiceSpy: { getMany: jasmine.Spy };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CartStoreService, CartApiService],
    });

    cartApiServiceSpy = jasmine.createSpyObj('CartApiService', ['createMany']);
    productApiServiceSpy = jasmine.createSpyObj('ProductApiService', ['getMany']);
    service = new CartStoreService(cartApiServiceSpy as any, productApiServiceSpy as any);
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
  it('should add product to cart and save ids on session storage', fakeAsync(() => {
    expect(service).toBeTruthy();

    service.addProductToCart(productList[0]);
    tick();
    expect(service.state.productId.length).toBeGreaterThan(0);
  }));
  it('should add product to cart and save ids on session storage', fakeAsync(() => {
    expect(service).toBeTruthy();

    service.addProductToCart(productList[0]);
    tick();
    expect(service.state.productId.length).toBeGreaterThan(0);
  }));

  it('should change the state and set new values on state', fakeAsync(() => {
    service['changeState']({ loading: true, product: productList });
    expect(service.state.loading).toBeTruthy();
    expect(service.state.product.length).toBeGreaterThan(0);
  }));
  it('should clear state and session when abandon purchase', fakeAsync(() => {
    service.addProductToCart(productList[0]);

    expect(service.state.productId.length).toEqual(1);
    expect(sessionStorage.getItem(service.SESSION_PRODUCT_ID_KEY)).toBeTruthy();

    service.abandonPurchase();

    tick();

    expect(service.state.product.length).toEqual(0);
    expect(service.state.productId.length).toEqual(0);
    expect(sessionStorage.getItem(service.SESSION_PRODUCT_ID_KEY)).toBeNull();
  }));
  it('should change data and emit new values', fakeAsync(() => {
    service['changeData']({
      loading: true,
      productId: [{ id: productList[0].id, name: productList[0].name, quantity: 1 }],
      saveLoading: true,
      errors: [],
      loaded: true,
      checkoutCompleted: false,
      product: [],
    });
    tick();
    service.onDataChange.subscribe((data) => {
      expect(data.loading).toBeTruthy();
      expect(data.productId.length).toBeGreaterThan(0);
      expect(data.loaded).toBeTruthy();
      expect(data.saveLoading).toBeTruthy();
    });
  }));
  it('should clear checkout complete flag', fakeAsync(() => {
    service['changeState']({
      checkoutCompleted: true,
    });
    expect(service.state.checkoutCompleted).toBeTruthy();
    service.clearCheckoutCompleted();
    tick();
    expect(service.state.checkoutCompleted).toBeFalsy();
  }));
  it('should clear errors', fakeAsync(() => {
    service['changeState']({
      errors: ['Error 1', 'Error 2'],
    });
    expect(service.state.errors.length).toBeGreaterThan(0);
    service.clearErrors();
    tick();
    expect(service.state.errors.length).toEqual(0);
  }));
});
