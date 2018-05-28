import { ICategory } from '../categories/icategory';
import { ISupplier } from '../suppliers/isupplier';

export interface IProduct {
    id: number;
    productCode: string;
    productName: string;
    model: string;
    description: string;
    size: string;
    sizeDescription: string;
    productPrice: number;
    disabled: boolean;
    category: ICategory;
    supplier: ISupplier;
    added: boolean;
  }
