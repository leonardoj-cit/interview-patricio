import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.genAuthToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });

    return next.handle(authReq);
  }

  private genAuthToken() {
    const sixteenDigitsNumber = Math.random().toString().substring(2, 18);
    return sixteenDigitsNumber;
  }
}
