import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { CartBoxInfoModalComponent } from './cart-box-info-modal.component';

describe('CartBoxInfoModalComponent', () => {
  let component: CartBoxInfoModalComponent;
  let fixture: ComponentFixture<CartBoxInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBoxInfoModalComponent ],
      imports: [MatButtonModule, MatDialogModule, MatIconModule],

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
