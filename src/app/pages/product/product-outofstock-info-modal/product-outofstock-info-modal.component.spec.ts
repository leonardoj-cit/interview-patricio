import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutofstockInfoModalComponent } from './product-outofstock-info-modal.component';

describe('ProductOutofstockInfoModalComponent', () => {
  let component: ProductOutofstockInfoModalComponent;
  let fixture: ComponentFixture<ProductOutofstockInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOutofstockInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOutofstockInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
