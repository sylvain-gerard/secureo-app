import { IProduct } from '../products/iproduct';
import { IOrder } from './iorder';

export interface IOrderItem {
  id: number;
  quantity: number;
  totalPrice: number;
  order: IOrder;
  product: IProduct;
}
