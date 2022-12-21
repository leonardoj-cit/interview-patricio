import { CartItem } from './cart-item';
import { CartProductId } from './cart-product-id';

export interface CartState {
  product: CartItem[];
  loading: boolean;
  saveLoading: boolean;
  loaded: boolean;
  errors: string[];
  productId: CartProductId[],
  checkoutCompleted: boolean;
}
