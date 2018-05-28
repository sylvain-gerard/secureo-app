import { Injectable, Input } from '@angular/core';
import { IProduct } from '../products/iproduct';
// TO USE ?


import { CartState } from '../products/CartState';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './CartItem';

@Injectable()
export class CartService {
  product: IProduct;
  products: IProduct[] = [];

  // CartItem
  cartItem: CartItem;
  cart: CartItem[] = [];

  constructor() {}

  getCart(): CartItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  addToCart(product) { // BUG efface le cart du storage puis rajoute le produit détaillé
    this.getCart();
    console.log('CARTITEM INPUT', this.cart);
    this.cartItem = {
      added: true,
      product: product,
      quantity: 1,
      totalPrice: product.productPrice,
    };
    this.cartItem.totalPrice = product.productPrice * this.cartItem.quantity;
    this.cart.push(this.cartItem);
    console.log(this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  // method KO
  removeFromCart(id: number) {
    // this.products = this.products.filter(item => item.id !== id);
    this.cart = this.cart.filter(item => item.product.id !== id);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  plusItem(cartItem, id) {
    console.log('Item input in service (+)', cartItem); // la quantity est déjà incrémentée pour le produit pas pour le cartItem
    this.cart = this.cart.filter(item => id !== id); // => ne supprime pas l'item...
    console.log('CART AFTER FILTER', this.cart); // quantity updated mais duplique le cartItem (ancien + nouveau)
    cartItem.quantity++;
    cartItem.totalPrice = cartItem.product.productPrice * cartItem.quantity;
    console.log('ITEM UPDATED (+)', cartItem); // cartItem est bien à jour
    this.cart.push(cartItem);
    console.log('CART UPDATED AFTER (+)', this.cart); // cartItem dupliqué (ancien + nouveau)
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  minusItem(cartItem, id) {
    this.cart = this.cart.filter(item => id !== id); // => ne supprime pas l'item...
    console.log('CART AFTER FILTER', this.cart);
    cartItem.quantity--;
    cartItem.totalPrice = cartItem.product.productPrice * cartItem.quantity;
    console.log('ITEM UPDATED (-)', cartItem);
    this.cart.push(cartItem);
    console.log('CART UPDATED AFTER (-)', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));

  }
}
