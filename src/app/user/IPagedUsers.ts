import { IUser } from "./iuser";
import { IPageable } from "../interfaces/IPageable";
import { ISort } from "../interfaces/ISort";

export interface IPagedUsers {
    content: IUser[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: IPageable;
    size: number;
    sort: ISort;
    totalElements: number;
    totalPages: number;
}