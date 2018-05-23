import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IProduct } from '../products/iproduct';
import { CartState } from '../products/CartState';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartService {
  // CART SERVICE ESSAI
  private cartSubject = new Subject<CartState>();
  products: IProduct[] = [];
  product: IProduct;
  CartState = this.cartSubject.asObservable();

  // ITEMS IN CART
  private itemsInCartSubject: BehaviorSubject<IProduct[]>;
  private itemsInCart: IProduct[] = [];

  constructor(private httpclient: HttpClient) {
    // this.itemsInCartSubject.subscribe(_ => this.products = _);
  }

  // METHODS FOR CART
  public addToCart(item: IProduct) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }
  /*
  public getItems(): Observable<IProduct[]> {
    return this.itemsInCartSubject.asObservable();
  }
  */
  // CART SERVICE ESSAI
  public addProduct(_product: any) {
    console.log('in service');
    console.log(' produit choisi :', _product);
    this.products.push(_product);
    console.log('panier en l état :', this.products);
    this.cartSubject.next(<any>{ loaded: true, products: this.products });
  }
  public removeProduct(id: number) {
    this.products = this.products.filter(item => item.id !== id);
    this.cartSubject.next(<any>{
      loaded: false,
      products: this.products
    });
  }

}
