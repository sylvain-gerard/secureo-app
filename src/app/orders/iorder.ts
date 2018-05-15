import { IEmployees } from '../employees/iemployees';

export interface IOrder {
    id: number;
    createdOn: Date;
    shipped: Date;
    total: number;
    status: string;
    employee: IEmployees;
}
