import { IRole } from './irole';

export interface IUser {
    id: number;
    userName: string;
    password: string;
    email: string;
    active: boolean;
    role: IRole;
  }
