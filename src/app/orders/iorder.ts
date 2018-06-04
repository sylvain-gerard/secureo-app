import { IEmployees } from '../employees/iemployees';
import { IOrderItem } from './IOrderItem';
import { CartItem } from '../cart/CartItem';

export interface IOrder {
    id: number;
    createdOn: Date;
    shipped: Date;
    total: number;
    status: string;
    items: CartItem[];
    employee: IEmployees;
}
