import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorStreamService } from '@services/http-error-stream/http-error-stream.service';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private httpErrorStreamService: HttpErrorStreamService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
       this.httpErrorStreamService.add(error)
        return throwError(error.statusText);
      }),
      tap((event) => {
        console.log(event);
        if (event instanceof HttpErrorResponse) {
          console.log(event.statusText);
        }
      })
    );
  }
}
