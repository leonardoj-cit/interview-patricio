import { Product } from './product';

export interface ProductState {
  product: Product[];
  loading: boolean;
  error: string;
}
