import { PageMessage } from './page-message';

export interface PageServerError {
  tipo?: string;
  mensagens?: PageMessage[];
  resultado?: string;
  conteudo?: any;
}
