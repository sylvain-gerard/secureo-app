import { Injectable } from '@angular/core';
import { IProduct } from '../products/iproduct';
// TO USE ?
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { CartState } from '../products/CartState';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartService {
  private url = environment.REST_API_URL + 'products';
  selectedItems: IProduct[] = [];
  item: Observable<IProduct>;

  // CART SERVICE ESSAI
  private cartSubject = new Subject<CartState>();
  products: IProduct[] = [];
  product: IProduct;
  CartState = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}`) as Observable<IProduct[]>;
  }
  // TO USE ?
  getProduct(id): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`) as Observable<IProduct>;
  }
  /*
  addItem(id: number): void {
    let item = this.http.get<IProduct>(`${this.url}/${id}`);
    if (this.selectedItems.indexOf(item) < 0) {
      this.selectedItems.push(item);
    }
  }
  */
}
