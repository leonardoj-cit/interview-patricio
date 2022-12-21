import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { CartListComponent } from './cart-list.component';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartListComponent],
      imports: [
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatButtonModule,
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
