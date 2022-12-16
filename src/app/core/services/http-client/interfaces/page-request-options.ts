import { PageRequestSort } from './page-request-sort';

export interface PageRequestOptions {
  limit?: number,
  filter?: string,
  sort?: PageRequestSort ;
  s?: string,
  page?: number;
}
