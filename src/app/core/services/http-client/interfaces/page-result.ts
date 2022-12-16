import { PageHttpError } from './page-http-error';

export interface PageResult<ContentT> {
  error?: PageHttpError;
  hasError: boolean;
  data?: ContentT;
  statusCode?: number;
  message?: string;
  count?: number;
  total?: number;
  page?: number;
  pageCount?: number;
}
