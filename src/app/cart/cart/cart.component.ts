import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../products/iproduct';
import { CartItem } from '../CartItem';
import { CartService } from '../cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrder } from '../../orders/iorder';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // cart: IProduct[] = [];
  items: CartItem[] = [];
  item: CartItem;
  selectedRowIndex = -1;
  product: IProduct;
  id: number;
  order: IOrder;
  cartEmpty: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    console.log('CART COMPONENT INIT');
    this.items = this.cartService.getCart();
    if (this.items == null || this.items.length === 0) {
      this.cartEmpty = true;
    } else {
      this.cartEmpty = false;
    }
    console.log(this.cartEmpty);
    console.log('getCart() :', this.items);
    this.order = {
      id: 0,
      createdOn: null,
      shipped: null,
      total: 0,
      status: '',
      items: [],
      employee: null
    };
  }

  deleteItem(item) {
    item.product.added = false;
    const id = this.items.indexOf(item);
    console.log(id);
    console.log(item);
    console.log(item.product.id);
    this.cartService.removeFromCart(item.product.id);

  }

  checkoutCart() {
    this.cartService.checkout();
    this.router.navigate(['products']);
  }

  backToProducts() {
    this.router.navigate(['products']);
  }

  quantityPlus(item, id) {
    console.log('ITEM IN COMPONENT (+)', item);
    console.log('ITEM ID IN COMPONENT (+)', id);
    this.cartService.plusItem(item, id);
    // item.quantity++;
  }

  quantityMinus(item, id) {
    console.log('ITEM IN COMPONENT (-)', item);
    console.log('ITEM ID IN COMPONENT (-)', id);
    this.cartService.minusItem(item, id);
    // item.quantity--;
  }
}
