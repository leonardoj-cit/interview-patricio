import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorStreamService {
  private messageStreamEmitter = new BehaviorSubject<HttpErrorResponse>(null);
  onMessageEvent = this.messageStreamEmitter.asObservable();
  constructor() {}

  add(data: HttpErrorResponse) {
    this.messageStreamEmitter.next(data);
  }
}
