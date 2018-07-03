import { Component, OnInit } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
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

  isLoggedIn$: Observable<boolean>; // {1}

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    this.isLoggedIn$.subscribe(console.log);
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
