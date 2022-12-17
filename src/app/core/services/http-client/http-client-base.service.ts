import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { PageHttpError } from './interfaces/page-http-error';
import { PageRequestOptions } from './interfaces/page-request-options';
import { PageResult } from './interfaces/page-result';

export abstract class HttpClientBaseService {
  // private readonly baseUrl = environment.host;
  private url: string;
  private _defaultHeaders!: HttpHeaders;
  constructor(
    public httpClient: HttpClient,
    public baseUrl = '',
    public defaultHeaders: HttpHeaders
  ) {
    // this.url = `${this.baseUrl}/${this.endPointEntry}`;

    this.appendHeaders(defaultHeaders);
  }

  get<payloadT, resultT>({
    url,
    payload,
    pageRequestOptions,
    headers,
  }: {
    url: string;
    payload?: payloadT;
    pageRequestOptions?: PageRequestOptions;
    headers: HttpHeaders;
  }): Observable<PageResult<resultT>> {
    // let sort = null;
    // let filter = null;

    // if (pageRequestOptions && pageRequestOptions.sort) {
    //   sort = pageRequestOptions.sort ? `${pageRequestOptions.sort.field},${pageRequestOptions.sort?.direction.toUpperCase()}` : pageRequestOptions.sort;
    //   pageRequestOptions = { ...pageRequestOptions, sort: null as any };
    // }

    // if (pageRequestOptions?.filter) {
    //   filter = pageRequestOptions?.filter;
    //   pageRequestOptions = { ...pageRequestOptions, filter: '' as any };
    // }

    // const params = new HttpParams({
    //   fromString: queryString.stringify({ ...payload, ...pageRequestOptions, filter, ...{ sort: sort } }, { skipNull: true , encode: false})

    // });
    const httpOptions = {
      // params,
      headers: this.appendHeaders(headers),

      // new HttpHeaders({
      //   accept: 'application/json',
      //   'Content-Type': 'application/json',
      // }),
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
        .post<resultT>(`${url}`, payload, httpOptions)
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
        .patch<resultT>(`${url}`, payload, httpOptions)
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

  // put<payloadT, resultT, totalT>(
  //   endPointUrl: string,
  //   payload: payloadT
  // ): Observable<PageResult<resultT>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };

  //   return new Observable((observer) => {
  //     return this.formDataBuilder<payloadT>(payload)
  //       .pipe(
  //         mergeMap((formData) =>
  //           this.httpClient
  //             .put<PageResult<resultT>>(`${this.url}/${endPointUrl}`, formData, httpOptions)
  //             .pipe(catchError((error) => this.handleError(error)))
  //         )
  //       )
  //       .subscribe((res) => {
  //         res.error ? observer.error(res.error) : observer.next(res);
  //         observer.complete();
  //       });
  //   });
  // }

  // delete<payloadT, resultT, totalT>(endPointUrl: string): Observable<PageResult<resultT>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };

  //   return new Observable((observer) => {
  //     this.httpClient
  //       .delete<PageResult<resultT>>(`${this.url}/${endPointUrl}`, httpOptions)
  //       .pipe(catchError((error) => this.handleError(error)))
  //       .subscribe((res) => {
  //         res.error ? observer.error(res.error) : observer.next(res);
  //         observer.complete();
  //       });
  //   });
  // }

  private handleError(error: HttpErrorResponse): PageHttpError {
    const resError: PageHttpError = {
      content: error.error,
      status: error.status,
      statusText: error.statusText,
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
