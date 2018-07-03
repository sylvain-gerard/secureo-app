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
import { Observable } from 'rxjs';
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
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    this.cartItem = {
      added: true,
      product: product,
      quantity: 1,
      totalPrice: product.productPrice
    };
    this.cartItem.totalPrice = product.productPrice * this.cartItem.quantity;
    this.cart.push(this.cartItem);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(id: number) {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    this.cart = this.cart.filter(cart => cart.product.id !== id);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.getCart();
  }

  checkout(order) {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.employee = JSON.parse(sessionStorage.getItem('employee'));
    this.cart = this.getCart();

    for ( let i = 0; i < this.cart.length; i++) {
      this.cartItem = this.cart[i];
      this.order.total += this.cart[i].totalPrice;
      this.order.items.push(this.cartItem);
    }

    this.order.status = 'CREATED';
    this.order.employee = this.employee;

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
}
