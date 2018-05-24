import { Injectable } from '@angular/core';
import { IProduct } from '../products/iproduct';
// TO USE ?
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { of } from 'rxjs/observable/of';

import { CartState } from '../products/CartState';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartService {
  product: IProduct;
  products: IProduct[] = [];

  private cartSubject = new Subject<CartState>();
  CartState = this.cartSubject.asObservable();

  constructor() { }

  addToCart(product) {
    this.products.push(product);
    console.log('products: IProduct[] in cartService:', this.products);
    this.cartSubject.next(<any>{ loaded: true, products: this.products });
    // sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  removeFromCart(id: number) {
    this.products = this.products.filter(item => item.id !== id);
    this.cartSubject.next(<any>{
      loaded: false,
      products: this.products
    });
    // sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  getCart() {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

}
