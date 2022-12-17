import { CartItem } from './cart-item';

export interface CartState {
  product: CartItem[];
  loading: boolean;
  saveLoading: boolean;
  error: string;
  lastAddedItem?: CartItem
}
