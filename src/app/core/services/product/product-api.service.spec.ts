import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProductApiService } from './product-api.service';

/* tslint:disable:no-unused-variable */

describe('Service: ProductApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
  });

  it('should be created', () => {
    const service: ProductApiService = TestBed.get(ProductApiService);
    expect(service).toBeTruthy();
  });
});


 

