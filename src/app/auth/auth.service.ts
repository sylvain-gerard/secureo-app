import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../user/iuser';
import { LogginUser } from '../user/LogginUser';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    if (sessionStorage.getItem('loggedIn')) {
      this.loggedIn.next(true);
      console.log(sessionStorage.getItem('loggedIn'));
    } else {
      this.loggedIn.next(false);
      console.log(sessionStorage.getItem('loggedIn'));
    }
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  login(loggedUser: LogginUser) {
    console.log('loggedUser in login() AUTHSERVICE', loggedUser);
    if (loggedUser.email !== '' && loggedUser.password !== '') {
      this.userService.postUserInfos(loggedUser).subscribe(
        user => {
          console.log('USER FOUND BY AUTH', user);
          console.log('Auth Service accept ', loggedUser.email);
          this.loggedIn.next(true);
          sessionStorage.setItem('loggedIn', JSON.stringify(true));
          sessionStorage.setItem('curentUser', JSON.stringify(user));
          this.router.navigate(['/']);
          this.showMessage('Utilisateur accepté !', '');
        },
        error => {
          console.log(error);
          console.log('Auth Service refuse ', loggedUser.email);
          this.loggedIn.next(false);
          sessionStorage.setItem('loggedIn', JSON.stringify(false)); // {4}
          this.router.navigate(['/login']);
          this.showMessage('', 'Utilisateur rejeté !');
        }
      );
    }
  }

  logout() {
    this.loggedIn.next(false);
    sessionStorage.setItem('loggedIn', JSON.stringify(false)); // {4}
    sessionStorage.removeItem('curentUser');
    sessionStorage.removeItem('cart');
    this.router.navigate(['/login']);
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 3000
    });
  }
}
