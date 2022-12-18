import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutSuccessModalComponent } from './cart-checkout-success-modal.component';

describe('CartCheckoutSuccessModalComponent', () => {
  let component: CartCheckoutSuccessModalComponent;
  let fixture: ComponentFixture<CartCheckoutSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCheckoutSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckoutSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
