import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@services/http-client/http-client.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartApiService extends HttpClientService {
  constructor(public httpClient: HttpClient) {
    super(httpClient, environment.host, 'checkout');
  }
}
