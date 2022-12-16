import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/services/http-client/http-client.service';

@Injectable()
export class ProductApiService extends HttpClientService {

  constructor(public httpClient: HttpClient) {
    super(httpClient, 'stock');
  }
}
