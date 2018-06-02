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
    }

    if (this.cartService.getCart() !== null) {
      this.itemsArray = JSON.parse(sessionStorage.getItem('cart'));

      for (let i = 0; i < this.cartService.getCart().length; i++) {
        this.route.params.subscribe(params => console.log(params)); // => un objet {id: ""}
        // console.log(this.route.params.map(val => val.id)); // => AnonymousSubject
        // console.log(this.itemsArray[i].product.id); // => un number
        /*if (this.itemsArray[i].product.id = this.route.params.map(id => id.json())) {
          console.log('PRODUCT ALREADY ADDED !');
          // console.log(this.itemsArray[i].product); // => AnonymousObjet
          this.product$.subscribe(console.log);
          // this.cartItem.product.added = true;
        }*/
      }
    }
  }

  goBackToList() {
    this.router.navigate(['products']);
  }

  removeProduct(product) {
    product.added = false;
    console.log('PROD to RM from product-detail', product);
    // CART SERVICE
    this.cartService.removeFromCart(product.id);

    // this.productService.removeProduct(product.id);
    // sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  addProduct(product) {
    product.added = true;
    console.log('PROD to ADD from product-detail', product);
    // CART SERVICE
    this.cartService.addToCart(product);
    // this.productService.addProduct(product);
    // sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

}
