import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorStreamService } from '@services/http-error-stream/http-error-stream.service';

import { CartBoxModule } from '../cart/shared/modules/cart-box/cart-box.module';
import { AppRootComponent } from './app-root.component';

describe('AppRootComponent', () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture<AppRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppRootComponent],
      imports: [MatToolbarModule, RouterTestingModule, CartBoxModule, HttpClientModule],
      providers: [HttpErrorStreamService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
