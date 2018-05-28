import { IProduct } from '../products/iproduct';

export interface CartItem {
  added: boolean;
  quantity: number;
  totalPrice: number;
  product: IProduct;
}
