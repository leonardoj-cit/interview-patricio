import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNotfoundProductModalComponent } from './cart-notfound-product-modal.component';

describe('CartNotfoundProductModalComponent', () => {
  let component: CartNotfoundProductModalComponent;
  let fixture: ComponentFixture<CartNotfoundProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartNotfoundProductModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartNotfoundProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
