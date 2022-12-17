import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBoxInfoModalComponent } from './cart-box-info-modal.component';

describe('CartBoxInfoModalComponent', () => {
  let component: CartBoxInfoModalComponent;
  let fixture: ComponentFixture<CartBoxInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBoxInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBoxInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
