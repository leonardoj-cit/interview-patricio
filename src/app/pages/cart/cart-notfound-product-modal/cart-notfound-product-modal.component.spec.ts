import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogModule } from '@angular/material';

import { CartNotfoundProductModalComponent } from './cart-notfound-product-modal.component';

describe('CartNotfoundProductModalComponent', () => {
  let component: CartNotfoundProductModalComponent;
  let fixture: ComponentFixture<CartNotfoundProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartNotfoundProductModalComponent],
      imports: [MatButtonModule, MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
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
