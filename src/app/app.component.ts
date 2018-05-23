import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from './cart/cart.service';
import { IProduct } from './products/iproduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Secureo';
  public shoppingCartItem$: Observable<IProduct[]>;
  isLoggedIn$: Observable<boolean>; // {1}

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
    // this.shoppingCartItem$ = this.cartService.getItems();
    // this.shoppingCartItem$.subscribe(_ => _);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    console.log(this.isLoggedIn$._subscribe);
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
