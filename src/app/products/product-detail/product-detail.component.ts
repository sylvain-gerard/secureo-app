import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ISupplier } from '../../suppliers/isupplier';
import { ICategory } from '../../categories/icategory';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CartState } from '../CartState';
import { Subject } from 'rxjs/Subject';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/CartItem';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<IProduct>;
  // private cart = new BehaviorSubject<any>(this.product$);
  products: IProduct[];
  product: IProduct;
  private subscription: Subscription;
  private cartSubject = new Subject<CartState>();
  Cart = this.cartSubject.asObservable();

  // CartItem
  cartItem: CartItem;
  cartItems: CartItem[];
  itemsArray: CartItem[];
  id: number;
  index: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.product$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.productService.getProduct(params.get('id'))
    );

    if (sessionStorage.getItem('cart') == null) {
      this.cartItems = [];
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
      console.log(this.cartItems);
    }

    if (this.cartService.getCart() !== null) {
      this.cartItems = JSON.parse(sessionStorage.getItem('cart'));
      console.log(this.cartItems);
    }
  }

  goBackToList() {
    this.router.navigate(['products']);
  }

  removeProduct(product) {
    product.added = false;
    this.cartService.removeFromCart(product.id);
  }

  addProduct(product) {
    product.added = true;
    this.cartService.addToCart(product);
  }

}
