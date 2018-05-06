import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../user/iuser';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    if (sessionStorage.getItem('loggedIn').valueOf) {
     this.loggedIn.next(true);
     console.log(sessionStorage.getItem('loggedIn'));
    } else {
     this.loggedIn.next(false);
     console.log(sessionStorage.getItem('loggedIn'));
    }
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  login(user: IUser) {
    if (user.userName !== '' && user.password !== '') { // {3}

      this.loggedIn.next(true);
      sessionStorage.setItem('loggedIn', JSON.stringify(true));
      this.router.navigate(['/']);

    }
  }

  logout() {
    // this.loggedIn = new BehaviorSubject(false);
    sessionStorage.setItem('loggedIn', JSON.stringify(false));
    // sessionStorage.removeItem('loggedIn');                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
