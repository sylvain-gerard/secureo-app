import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../products/iproduct';
import { CartItem } from '../CartItem';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: IProduct[] = [];
  items: CartItem[] = [];
  item: CartItem;
  selectedRowIndex = -1;
  product: IProduct;
  id: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log('CART COMPONENT INIT');
    this.items = this.cartService.getCart();
    console.log('ITEMS IN SESSIONSTORAGE', this.items);
  }

  deleteItem(item) {
    item.product.added = false;
    const id = this.items.indexOf(item);
    console.log(id);
    console.log(item);
    console.log(item.product.id);
    this.cartService.removeFromCart(item.product.id);
    this.ngOnInit();
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
