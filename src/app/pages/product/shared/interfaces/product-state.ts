import { Product } from './product';

export interface ProductState {
  product: Product[];
  loading: boolean;
  saveLoading: boolean;
  loaded: boolean;
  error: string;
}
