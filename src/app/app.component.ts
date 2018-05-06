import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Secureo';
  isLoggedIn$: Observable<boolean>; // {1}

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    console.log(this.isLoggedIn$._subscribe);
  }

  onLogout() {
    this.authService.logout(); // {3}
  }
}
