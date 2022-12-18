import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientBaseService } from '@services/http-client/http-client-base.service';
import { forkJoin, Observable } from 'rxjs';

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

  getAll<resultT>({ headers }: { headers?: HttpHeaders } = {}) {
    return this.get<null, resultT>({ url: this.finalUrl, headers });
  }

  getMany(idList: string[]) {}

  getOne(id: string) {}

  updateOne<payloadT, resultT>({ id, changes }: { id: string; changes: payloadT }) {
    return this.patch<payloadT, resultT>({ url: `${this.finalUrl}/${id}`, payload: changes });
  }

  updateMany<T>(payload: { id: string; data: T }) {}

  deleteMany<resultT>({ idList }: { idList: string[] }): Observable<PageResult<resultT>[]> {
    let req: Observable<PageResult<resultT>>[] = [];
    idList.forEach((id) => {
      req = [...req, this.delete<resultT>({ url: `${this.finalUrl}/${id}` })];
    });

    return forkJoin(req);
  }

  deleteOne() {}

  createOne<payloadT, resultT>({ payload }: { payload: payloadT }) {
    return this.post<payloadT, resultT>({ url: this.finalUrl, payload });
  }

  createMany() {}
}
