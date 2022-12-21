import { Product } from '@interfaces/product';

export interface ProductState {
  product: Product[];
  loading: boolean;
  saveLoading: boolean;
  loaded: boolean;
  error: string;
}
