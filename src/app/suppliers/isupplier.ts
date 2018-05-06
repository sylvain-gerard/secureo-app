
import { IProduct } from '../products/iproduct';
import { IAddress } from '../addresses/iaddress';

export interface ISupplier {
    id: number;
    supplierName: string;
    address: IAddress;
    products: IProduct[];
}
