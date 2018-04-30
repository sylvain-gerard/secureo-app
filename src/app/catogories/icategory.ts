import { IProduct } from '../products/iproduct';

export interface ICategory {
    id: number;
    nameCategory: string;
    description: string;
    products: IProduct[];
}
