import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBoxButtonComponent } from './cart-box-button.component';

describe('CartBoxButtonComponent', () => {
  let component: CartBoxButtonComponent;
  let fixture: ComponentFixture<CartBoxButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBoxButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBoxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
