import { inject, TestBed } from '@angular/core/testing';

import { HttpClientBaseService } from './http-client-base.service';

/* tslint:disable:no-unused-variable */

describe('Service: HttpClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientBaseService]
    });
  });

  it('should ...', inject([HttpClientBaseService], (service: HttpClientBaseService) => {
    expect(service).toBeTruthy();
  }));
});
