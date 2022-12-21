import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { RouterTestingModule } from '@angular/router/testing';

import { ProductListComponent } from './product-list/product-list.component';
import {
  ProductOutofstockInfoModalComponent,
} from './product-outofstock-info-modal/product-outofstock-info-modal.component';
import { ProductComponent } from './product.component';
import { ProductStoreService } from './shared/services/product-store.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent, ProductListComponent, ProductOutofstockInfoModalComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
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
      ],
      providers: [ProductStoreService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
