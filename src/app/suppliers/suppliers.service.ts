import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { ISupplier } from './isupplier';
import { IProduct } from '../products/iproduct';

@Injectable()
export class SuppliersService {
  private url = environment.REST_API_URL + 'suppliers';
  update$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>(`${this.url}`) as Observable<ISupplier[]>;
  }

  getSupplier(id): Observable<ISupplier> {
    return this.http.get<ISupplier>(`${this.url}/${id}`) as Observable<ISupplier>;
  }

  getProductsOfSupplier(id): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/${id}/products`) as Observable<IProduct[]>;
  }
}
