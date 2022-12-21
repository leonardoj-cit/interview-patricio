import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CartApiService } from './cart-api.service';

describe('CartApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientModule] }));

  it('should be created', () => {
    const service: CartApiService = TestBed.get(CartApiService);
    expect(service).toBeTruthy();
  });
});
