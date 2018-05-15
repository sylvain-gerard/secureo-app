import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { IProduct } from './iproduct';
import { CartState } from './CartState';

@Injectable()
export class ProductService {
  private url = environment.REST_API_URL + 'products';
  update$: Subject<any> = new Subject<any>();
  selectedProduct: IProduct;

  // CART SERVICE ESSAI

  private cartSubject = new Subject<CartState>();
  Products: IProduct[] = [];
  CartState = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}`) as Observable<IProduct[]>;
  }

  getProduct(id): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`) as Observable<IProduct>;
  }

  // CART SERVICE ESSAI
  addProduct(product: any) {
    console.log('in service');
    this.Products.push(product);
    this.cartSubject.next(<any>{ loaded: true, products: this.Products });
  }
  removeProduct(id: number) {
    this.Products = this.Products.filter(item => item.id !== id);
    this.cartSubject.next(<any>{
      loaded: false,
      products: this.Products
    });
  }
  /*
  getAllProducts(): Observable<any> {
    return this.httpclient
      .get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
  */
}
