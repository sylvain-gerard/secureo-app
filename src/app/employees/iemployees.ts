import { IPosting } from '../posting/iposting';
import { IOrder } from '../orders/iorder';

export interface IEmployees {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  idRh: string;
  jobTitle: string;
  gender: string;
  grade: string;
  posting: IPosting;
  manager: IEmployees;
  employees: IEmployees[];
  // orders: IOrder[];
}
