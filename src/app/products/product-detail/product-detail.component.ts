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

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<IProduct>;
  // productsInCarts: Observable<IProduct[]>;
  // product: IProduct;
  // category: ICategory;
  // supplier: ISupplier;
  // edition = false;

  private cart = new BehaviorSubject<any>(this.product$);
  products: IProduct[];
  private subscription: Subscription;
  private cartSubject = new Subject<CartState>();
  CartState = this.cartSubject.asObservable();

  @Input() product: IProduct;

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
    // this.product$.subscribe(product => console.log(product));
    this.subscription = this.productService.CartState.subscribe(
      (state: CartState) => {
        this.products = state.products;
        console.log(this.products, 'subscription on init');
      }
    );
  }

  goBackToList() {
    this.router.navigate(['products']);
  }
  /*
  AddProduct(product) {
    product.added = true;
    this.productService.addProduct(product);
  }
  */

  removeProduct(product) {
    product.added = false;
    this.productService.removeProduct(product.id);
    sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  addProduct(product) {
    this.productService.addProduct(product);
    sessionStorage.setItem('cart', JSON.stringify(this.products));
    // this.cartService.addToCart(product);
    product.added = true;
  }

  // METHOD FOR CART

  public addToCart(item: IProduct) {
    // this.cartService.addToCart(item);
  }
}
