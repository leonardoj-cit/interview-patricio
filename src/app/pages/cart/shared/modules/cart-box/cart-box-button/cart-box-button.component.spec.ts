import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule, MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { CartBoxButtonComponent } from './cart-box-button.component';

describe('CartBoxButtonComponent', () => {
  let component: CartBoxButtonComponent;
  let fixture: ComponentFixture<CartBoxButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBoxButtonComponent ],
      imports: [MatButtonModule, MatIconModule, MatBadgeModule, RouterTestingModule, HttpClientModule, MatDialogModule],

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
