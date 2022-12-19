import { TestBed } from '@angular/core/testing';

import { HttpErrorStreamService } from './http-error-stream.service';

describe('HttpErrorStreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpErrorStreamService = TestBed.get(HttpErrorStreamService);
    expect(service).toBeTruthy();
  });
});
