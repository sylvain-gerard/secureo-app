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
  id: number;

  // CartItem
  cartItem: CartItem;
  cart: CartItem[] = [];

  constructor() {}

  getCart(): CartItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  addToCart(product) { // BUG efface le cart du storage puis rajoute le produit détaillé
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log('CART IN SERVICE', this.cart);
    console.log('PRODUCT input in service', product);
    this.cartItem = {
      added: true,
      product: product,
      quantity: 1,
      totalPrice: product.productPrice,
    };
    this.cartItem.totalPrice = product.productPrice * this.cartItem.quantity;
    this.cart.push(this.cartItem);
    console.log('CART AFTER ADD', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  // Pétée de chez pétée ..... supprime tout !!!
  removeFromCart(id: number) {
    console.log(id); // => id de l'item dans le cart
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log('CART IN SERVICE', this.cart);
    this.cart = this.cart.filter(cart => cart.product.id !== id);
    console.log('CART AFTER RM', this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  plusItem(cartItem, id) {
    console.log('Item input in service (+)', cartItem); // la quantity est déjà incrémentée pour le produit pas pour le cartItem
    this.cart = this.cart.filter(item => id === id); // => ne supprime pas l'item...
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
