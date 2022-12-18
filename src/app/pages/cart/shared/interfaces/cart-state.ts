import { CartItem } from './cart-item';

export interface CartState {
  product: CartItem[];
  loading: boolean;
  saveLoading: boolean;
  loaded: boolean;
  error: string;
  lastAddedItem?: CartItem;
}
