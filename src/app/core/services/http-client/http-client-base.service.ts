import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { PageHttpError } from './interfaces/page-http-error';
import { PageRequestOptions } from './interfaces/page-request-options';
import { PageResult } from './interfaces/page-result';

export abstract class HttpClientBaseService {
  private url: string;
  private _defaultHeaders!: HttpHeaders;
  constructor(
    public httpClient: HttpClient,
    public baseUrl = '',
    public defaultHeaders: HttpHeaders
  ) {
    this.appendHeaders(defaultHeaders);
  }

  get<payloadT, resultT>({
    url,

    headers,
  }: {
    url: string;
    payload?: payloadT;
    pageRequestOptions?: PageRequestOptions;
    headers: HttpHeaders;
  }): Observable<PageResult<resultT>> {
    const httpOptions = {
      headers: this.appendHeaders(headers),
    };
    return new Observable((observer) => {
      this.httpClient
        .get<resultT>(`${url}`, httpOptions)
        .pipe(
          map((data) => {
            const res: PageResult<resultT> = {
              hasError: false,
              error: null,
              data,
            };
            return res;
          }),
          catchError((error) => {
            const res: PageResult<resultT> = {
              hasError: true,
              error: this.handleError(error),
            };
            return of(res);
          })
        )
        .subscribe((res) => {
          res && res.hasError ? observer.error(res) : observer.next(res);
          observer.complete();
        });
    });
  }

  post<payloadT, resultT>({
    url,
    payload,
    headers,
  }: {
    url: string;
    payload: payloadT;
    headers?: HttpHeaders;
  }): Observable<PageResult<resultT>> {
    const httpOptions = {
      headers: headers,
    };

    return new Observable((observer) => {
      this.httpClient
        .post<resultT>(url, payload, httpOptions)
        .pipe(
          map((data) => {
            const res: PageResult<resultT> = {
              hasError: false,
              error: null,
              data,
            };
            return res;
          }),
          catchError((error) => {
            const res: PageResult<resultT> = {
              hasError: true,
              error: this.handleError(error),
            };
            return of(res);
          })
        )
        .subscribe((res) => {
          res && res.hasError ? observer.error(res) : observer.next(res);
          observer.complete();
        });
    });
  }

  patch<payloadT, resultT>({
    url,
    payload,
    headers,
  }: {
    url: string;
    payload: payloadT;
    headers?: HttpHeaders;
  }): Observable<PageResult<resultT>> {
    const httpOptions = {
      headers: headers,
    };

    return new Observable((observer) => {
      this.httpClient
        .patch<resultT>(url, payload, httpOptions)
        .pipe(
          map((data) => {
            const res: PageResult<resultT> = {
              hasError: false,
              error: null,
              data,
            };
            return res;
          }),
          catchError((error) => {
            const res: PageResult<resultT> = {
              hasError: true,
              error: this.handleError(error),
            };
            return of(res);
          })
        )
        .subscribe((res) => {
          res && res.hasError ? observer.error(res) : observer.next(res);
          observer.complete();
        });
    });
  }

  delete<resultT>({
    url,
    headers,
  }: {
    url: string;
    headers?: HttpHeaders;
  }): Observable<PageResult<resultT>> {
    const httpOptions = {
      headers: headers,
    };

    return new Observable((observer) => {
      this.httpClient
        .delete<resultT>(url, httpOptions)
        .pipe(
          map((data) => {
            const res: PageResult<resultT> = {
              hasError: false,
              error: null,
              data,
            };
            return res;
          }),
          catchError((error) => {
            const res: PageResult<resultT> = {
              hasError: true,
              error: this.handleError(error),
            };
            return of(res);
          })
        )
        .subscribe((res) => {
          res && res.hasError ? observer.error(res) : observer.next(res);
          observer.complete();
        });
    });
  }

  private handleError(error: HttpErrorResponse): PageHttpError {
    const resError: PageHttpError = {
      content: error.error,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    };
    return resError;
  }

  private appendHeaders(headers?: HttpHeaders) {
    if (headers && !!headers.keys().length) {
      headers.keys().forEach((k) => {
        const values = headers.getAll(k);
        if (values) {
          this._defaultHeaders = this._defaultHeaders.set(k, values);
        }
      });
    }

    return this._defaultHeaders;
  }
}
