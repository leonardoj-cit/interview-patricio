import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from '@interfaces/product';
import { take } from 'rxjs/operators';

import { CartProductId } from './../../cart/shared/interfaces/cart-product-id';
import { CartStoreService } from './../../cart/shared/services/cart-store.service';
import {
  ProductOutofstockInfoModalComponent,
} from './../product-outofstock-info-modal/product-outofstock-info-modal.component';
import { ProductStoreService } from './../shared/services/product-store.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productList: Product[];
  let productStoreService: ProductStoreService;
  let cartStoreService: CartStoreService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductOutofstockInfoModalComponent],

      imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [ProductStoreService, CartStoreService],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [ProductOutofstockInfoModalComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productStoreService = TestBed.get(ProductStoreService);
    cartStoreService = TestBed.get(CartStoreService);
    cartStoreService.clearState();
    productStoreService.clearState();
    fixture.detectChanges();
    productList = [
      {
        id: '7',
        name: 'And Then There Were None',
        author: 'Agatha Christie',
        genre: ['mystery'],
        language: 'English',
        quantity: 1,
      },
      {
        id: '8',
        name: 'Dream of the Red Chamber',
        author: 'Cao Xueqin',
        genre: ['family saga'],
        language: 'Chinese',
        quantity: 30,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load products from the state', fakeAsync(() => {
    productStoreService['changeState']({ product: productList });

    tick();

    productStoreService.select<Product[]>('product').subscribe((el) => {
      expect(el.length).toEqual(productList.length);
    });
  }));
  it('should add product to cart', fakeAsync(() => {
    const product = productList[0];
    const quantity = 1;
    component.addProductToCart(product, quantity);

    tick();

    cartStoreService.select<CartProductId[]>('productId').subscribe((cartProductList) => {
      const addedProduct = cartProductList.find((el) => el.id === product.id);
      expect(addedProduct).toBeDefined();
      expect(addedProduct.quantity).toEqual(quantity);
    });
  }));

  it('should disable add button when input quantity is less than 1 or undefined', fakeAsync(() => {
    productStoreService['changeState']({ loading: false, product: productList });
    fixture.detectChanges();

    tick();

    const buttonEl = (HTMLElement = fixture.nativeElement.querySelector('.add-product-button'));
    let quantityInputEl = fixture.nativeElement.querySelector('.quantity-input');

    expect(buttonEl.disabled).toBeTruthy();

    quantityInputEl.value = '2';
    fixture.detectChanges();

    expect(buttonEl.disabled).toBeFalsy();
  }));
  it('should not add product to cart  when selected quantity > product stock quantity', fakeAsync(() => {
    const product = productList[0];
    const quantity = 2;
    component.addProductToCart(product, quantity);

    fixture.detectChanges();

    tick();

    cartStoreService.select<CartProductId[]>('productId').subscribe((cartProductList) => {
      const addedProduct = cartProductList.find((el) => el.id === product.id);
      expect(addedProduct).toBeUndefined();
    });
    flush();
  }));
  it('should open the out of stock modal when selected quantity > product stock quantity', fakeAsync(() => {
    const product = productList[0];
    const quantity = 2;
    component['dialog'].closeAll();

    component.addProductToCart(product, quantity);
    fixture.detectChanges();

    tick();

    cartStoreService
      .select<Product[]>('productId')
      .pipe(take(1))
      .subscribe((cartProductList) => {
        const addedProduct = cartProductList.find((el) => el.id === product.id);
        expect(addedProduct).toBeUndefined();
      });

    const doc = document.querySelector('.out-of-stock-modal');
    expect(doc).toBeTruthy();
  }));
});
