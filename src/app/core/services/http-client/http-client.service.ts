import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, takeLast } from 'rxjs/operators';

import { PageHttpError } from './interfaces/page-http-error';
import { PageRequestOptions } from './interfaces/page-request-options';
import { PageResult } from './interfaces/page-result';

export abstract class HttpClientService {
  private readonly baseUrl = environment.host;
  private url: string;
  constructor(public httpClient: HttpClient, public endPointEntry: string) {
    this.url = `${this.baseUrl}/${this.endPointEntry}`;
  }

  get<payloadT, resultT>(
    endPointUrl?: string,
    payload?: payloadT,
    pageRequestOptions?: PageRequestOptions
  ): Observable<PageResult<resultT>> {
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
      headers: new HttpHeaders({
        accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
    return new Observable((observer) => {
      const finalUrl = endPointUrl ? `${this.url}/${endPointUrl}` : `${this.url}`;
      this.httpClient
        .get<resultT>(`${finalUrl}`, httpOptions)
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

  // post<payloadT, resultT>(endPointUrl: string, payload: payloadT): Observable<PageResult<resultT>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };

  //   return new Observable((observer) => {
  //     this.httpClient
  //       .post<PageResult<resultT>>(`${this.url}/${endPointUrl}`, payload, httpOptions)
  //       .pipe(catchError((error) => this.handleError(error)))
  //       .subscribe((res) => {
  //         res.error ? observer.error(res.error) : observer.next(res);
  //         observer.complete();
  //       });
  //   });
  // }

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

  // putJson<payloadT, resultT, totalT>(
  //   endPointUrl: string,
  //   payload: payloadT
  // ): Observable<PageResult<resultT>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };

  //   return new Observable((observer) => {
  //     this.httpClient
  //       .put<PageResult<resultT>>(`${this.url}/${endPointUrl}`, payload, httpOptions)
  //       .pipe(catchError((error) => this.handleError(error)))
  //       .subscribe((res) => {
  //         res.error ? observer.error(res.error) : observer.next(res);
  //         observer.complete();
  //       });
  //   });
  // }

  // patch<payloadT, resultT, totalT>(
  //   endPointUrl: string,
  //   payload: payloadT
  // ): Observable<PageResult<resultT>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };

  //   return new Observable((observer) => {
  //     this.httpClient
  //       .patch<PageResult<resultT>>(`${this.url}/${endPointUrl}`, payload, httpOptions)
  //       .pipe(catchError((error) => this.handleError(error)))
  //       .subscribe((res) => {
  //         res.error ? observer.error(res.error) : observer.next(res);
  //         observer.complete();
  //       });
  //   });
  // }

  // postFormData<payloadT, resultT, totalT>(
  //   endPointUrl: string,
  //   payload: payloadT
  // ): Observable<PageResult<resultT>> {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Content-Type', 'multipart/form-data');
  //   const httpOptions = {
  //     headers,
  //   };

  //   return new Observable((observer) => {
  //     return this.formDataBuilder<payloadT>(payload)
  //       .pipe(
  //         mergeMap((formData) =>
  //           this.httpClient
  //             .post<PageResult<resultT>>(`${this.url}/${endPointUrl}`, formData, httpOptions)
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

  private formDataBuilder<T>(payload: any) {
    const formData = new FormData();
    const keys = Object.keys(payload);
    return from(keys).pipe(
      filter((key) => payload[key] !== null && payload[key] !== undefined),
      map((key) => {
        formData.append(key, payload[key]);
        return formData;
      }),
      takeLast(1)
    );
  }
}
