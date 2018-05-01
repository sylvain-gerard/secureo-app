import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { IProduct } from './iproduct';

@Injectable()
export class ProductService {

  private url =  environment.REST_API_URL + 'products';
  update$: Subject<any> = new Subject<any>();
  selectedProduct: IProduct;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}`) as Observable<IProduct[]>;
  }

  getProduct(id): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`) as Observable<IProduct>;
  }

}
