import { Injectable, Input } from '@angular/core';
import { IProduct } from '../products/iproduct';
// TO USE ?

import { CartState } from '../products/CartState';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './CartItem';
import { OrderService } from '../orders/order.service';
import { IOrder } from '../orders/iorder';
import { IUser } from '../user/iuser';
import { EmployeeService } from '../employees/employee.service';
import { IEmployees } from '../employees/iemployees';
import { Observable } from 'rxjs/Observable';
import { IOrderItem } from '../orders/IOrderItem';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CartService {
  product: IProduct;
  products: IProduct[] = [];
  id: number;
  order: IOrder;
  item: IOrderItem;
  user: IUser;
  employee$: Observable<IEmployees>;
  employee: IEmployees;

  // CartItem
  cartItem: CartItem;
  cart: CartItem[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private employeeService: EmployeeService
  ) {}

  getCart(): CartItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  addToCart(product) {
    // BUG efface le cart du storage puis rajoute le produit détaillé
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log('CART IN SERVICE', this.cart);
    console.log('PRODUCT input in service', product);
    this.cartItem = {
      added: true,
      product: product,
      quantity: 1,
      totalPrice: product.productPrice
    };
    this.cartItem.totalPrice = product.productPrice * this.cartItem.quantity;
    this.cart.push(this.cartItem);
    console.log('CART AFTER ADD', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(id: number) {
    console.log(id);
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log('CART IN SERVICE', this.cart);
    this.cart = this.cart.filter(cart => cart.product.id !== id);
    console.log('CART AFTER RM', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  checkout() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.employee = JSON.parse(sessionStorage.getItem('employee'));

    this.order = {
      id: 0,
      createdOn: null,
      shipped: null,
      total: 0,
      status: '',
      items: [],
      employee: null
    };

    this.cart = this.getCart();
    console.log('CART IN CHECKOUT()', this.cart);
    console.log(this.order);
    // iterate items in cart
    for ( let i = 0; i < this.cart.length; i++) {
      console.log(this.cart[i]);
      this.cartItem = this.cart[i];
      this.order.total += this.cart[i].totalPrice;
      console.log(this.order.total);
      this.order.items.push(this.cartItem);
      console.log(this.cartItem);
    }

    this.order.createdOn = new Date();
    this.order.shipped = new Date(0);
    this.order.status = 'CREATED';
    this.order.employee = this.employee;
    console.log(this.order);
    this.orderService.createOrder(this.order).subscribe(
      result => {sessionStorage.removeItem('cart');
                  console.log('success');
                  this.showMessage('Commande créée !', '');
                },
     error => {console.log('failure');
               this.showMessage('', 'Echec de la requête');
              }
    );
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 3000
    });
  }

  plusItem(cartItem, id) {
    console.log('Item input in service (+)', cartItem); // la quantity est déjà incrémentée pour le produit pas pour le cartItem
    this.cart = this.cart.filter(cart => cart.product.id !== id); // => ne supprime pas l'item...
    console.log('CART AFTER FILTER', this.cart); // quantity updated mais duplique le cartItem (ancien + nouveau)
    cartItem.quantity++;
    cartItem.totalPrice = cartItem.product.productPrice * cartItem.quantity;
    console.log('QUANTITY UPDATED (+)', cartItem.quantity);
    console.log('TOTAL PRICE UPDATED (+)', cartItem.totalPrice);
    this.cart.push(this.cartItem);
    console.log('CART UPDATED AFTER (+)', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  minusItem(cartItem, id) {
    cartItem.quantity--;
    cartItem.totalPrice = cartItem.product.productPrice * cartItem.quantity;
    console.log('QUANTITY UPDATED (-)', cartItem.quantity);
    console.log('TOTAL PRICE UPDATED (-)', cartItem.totalPrice);
    console.log('CART UPDATED AFTER (-)', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
