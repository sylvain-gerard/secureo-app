import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IProduct } from '../../products/iproduct';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { CartState } from '../../products/CartState';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CartService } from '../cart.service';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product$: Observable<IProduct>;
  // private cart = new BehaviorSubject<any>(this.product$);
  products: IProduct[];
  private subscription: Subscription;
  private cartSubject = new Subject<CartState>();
  CartState = this.cartSubject.asObservable();

  public shoppingCartItems$: Observable<IProduct[]> = of([]);
  public shoppingCartItems: IProduct[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.CartState = this.productService.getCartState();
    // this.shoppingCartItems$ = this.cartService.getItems();
    // his.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
   }

  ngOnInit() {
    console.log('CART COMPONENT INIT');
    this.CartState = this.productService.getCartState();
    console.log(this.CartState, 'subscription on init DU CART');

  }

}
