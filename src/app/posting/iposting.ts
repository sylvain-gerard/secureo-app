import { IAddress } from '../addresses/iaddress';
import { IEmployees } from '../employees/iemployees';

export interface IPosting {
  id: number;
  postingName: string;
  address: IAddress;
  employees: IEmployees[];
}
