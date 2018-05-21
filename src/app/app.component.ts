import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Secureo';
  isLoggedIn$: Observable<boolean>; // {1}

  constructor(private authService: AuthService, private router: Router) {}

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
}
