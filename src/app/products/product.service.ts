import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { IProduct } from './iproduct';
import { CartState } from './CartState';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {
  private url = environment.REST_API_URL + 'products';
  update$: Subject<any> = new Subject<any>();
  // CART SERVICE ESSAI
  private cartSubject = new Subject<CartState>();
  products: IProduct[] = [];
  product: IProduct;
  CartState = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}`) as Observable<IProduct[]>;
  }

  getProduct(id): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`) as Observable<IProduct>;
  }

  addProduct(product) {
    this.products.push(product);
    this.cartSubject.next(<any>{ loaded: true, products: this.products });
    this.cartSubject.subscribe(console.log);
    this.CartState.subscribe(console.log);
  }

  removeProduct(id: number) {
    this.products = this.products.filter(item => item.id !== id);
    this.cartSubject.next(<any>{
      loaded: false,
      products: this.products
    });
  }

  getCartState(): Observable<CartState> {
    return this.cartSubject.asObservable();
  }
}
