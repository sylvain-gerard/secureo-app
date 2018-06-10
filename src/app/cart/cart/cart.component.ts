import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../products/iproduct';
import { CartItem } from '../CartItem';
import { CartService } from '../cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrder } from '../../orders/iorder';
import { MatSnackBar } from '@angular/material';
import { IEmployees } from '../../employees/iemployees';
import { OrderService } from '../../orders/order.service';

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
  employee: IEmployees;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService
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
      createdAt: null,
      updatedAt: null,
      total: 0,
      status: '',
      items: [],
      employee: null
    };
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 3000
    });
  }

  deleteItem(item) {
    item.product.added = false;
    const id = this.items.indexOf(item);
    console.log(id);
    console.log(item);
    console.log(item.product.id);
    this.cartService.removeFromCart(item.product.id);

  }

  checkout() {
    this.employee = JSON.parse(sessionStorage.getItem('employee'));
    this.items = JSON.parse(sessionStorage.getItem('cart'));
    for ( let i = 0; i < this.items.length; i++) {
      this.item = this.items[i];
      this.order.total += this.items[i].totalPrice;
      this.order.items.push(this.item);
    }
    console.log(this.items);
    this.order.status = 'CREATED';
    this.order.employee = this.employee;
    console.log(this.order);
    this.orderService.createOrder(this.order).subscribe(
      result => {sessionStorage.removeItem('cart');
                  console.log('success');
                  this.showMessage('Commande créée !', '');
                  this.id = this.order.id;
                  console.log(this.id);
                },
     error => {console.log('failure');
               this.showMessage('', 'Echec de la requête');
              }
    );
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
