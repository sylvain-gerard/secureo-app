import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from './cart/cart.service';
import { IProduct } from './products/iproduct';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  title = 'Secureo';
  public shoppingCartItem$: Observable<IProduct[]>;
  isLoggedIn$: Observable<boolean>; // {1}
  cartEmpty = new BehaviorSubject<boolean>(true);
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
    // this.shoppingCartItem$ = this.cartService.getItems();
    // this.shoppingCartItem$.subscribe(_ => _);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    console.log(this.isLoggedIn$._subscribe);
    if (sessionStorage.getItem('cart') != null) {
      this.cartEmpty.next(false);
    } else {
      this.cartEmpty.next(true);
    }
  }

  onLogout() {
    this.authService.logout(); // {3}
  }

  goHome() {
    this.router.navigate(['']);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
