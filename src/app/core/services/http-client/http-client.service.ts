import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientBaseService } from '@services/http-client/http-client-base.service';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { PageResult } from './interfaces/page-result';

export abstract class HttpClientService extends HttpClientBaseService {
  finalUrl: string;
  constructor(
    public httpClient: HttpClient,
    public baseUrl: string = '',
    public endPointEntry?: string,
    defaultHeader?: HttpHeaders
  ) {
    super(httpClient, baseUrl, defaultHeader);
    this.finalUrl = this.endPointEntry
      ? `${this.baseUrl}/${this.endPointEntry}`
      : `${this.baseUrl}`;
  }

  getAll<resultT>({ headers }: { headers?: HttpHeaders }) {
    return this.get<null, resultT>({ url: this.finalUrl, headers });
  }

  getMany<resultT>({
    idList,
    headers,
  }: {
    idList: string[];
    headers?: HttpHeaders;
  }): Observable<PageResult<resultT>[]> {
    let req: any = [];
    idList.forEach((id) => {
      req = [
        ...req,
        this.getOne<null, resultT>({ id: id, headers }).pipe(catchError((error) => of(error))),
      ];
    });
    return forkJoin(req).pipe(
      catchError((error) => {
        return of(error);
      }),
      map((res: any) => {
        const allData = res.map((el) => {
          return {
            hasError: !!(el.error && el.hasError),
            data: el.data,
            error: el.error && el.error,
          };
        }) as PageResult<resultT>[];

        return allData;
      })
    );
  }

  getOne<payloadT, resultT>({ id, headers }: { id: string; headers?: HttpHeaders }) {
    return this.get<payloadT, resultT>({ url: `${this.finalUrl}/${id}`, headers });
  }
  updateOne<payloadT, resultT>({
    id,
    changes,
    headers,
  }: {
    id: string;
    changes: payloadT;
    headers?: HttpHeaders;
  }) {
    return this.patch<payloadT, resultT>({
      url: `${this.finalUrl}/${id}`,
      payload: changes,
      headers,
    });
  }

  deleteMany<resultT>({
    idList,
    headers,
  }: {
    idList: string[];
    headers?: HttpHeaders;
  }): Observable<PageResult<resultT>[]> {
    let req: Observable<PageResult<resultT>>[] = [];
    idList.forEach((id) => {
      req = [
        ...req,
        this.delete<resultT>({ url: `${this.finalUrl}/${id}`, headers }).pipe(
          catchError((error) => of(error))
        ),
      ];
    });

    return forkJoin(req);
  }
  createMany<payloadT, resultT>({
    payloadList,
    headers,
  }: {
    payloadList: payloadT[];
    headers?: HttpHeaders;
  }): Observable<PageResult<resultT>[]> {
    let req: Observable<PageResult<resultT>>[] = [];
    payloadList.forEach((data) => {
      req = [
        ...req,
        this.post<payloadT, resultT>({ url: this.finalUrl, payload: data, headers }).pipe(
          catchError((error) => of(error))
        ),
      ];
    });

    return forkJoin(req);
  }

  createOne<payloadT, resultT>({ payload, headers }: { payload: payloadT; headers?: HttpHeaders }) {
    return this.post<payloadT, resultT>({ url: this.finalUrl, payload, headers });
  }
}
