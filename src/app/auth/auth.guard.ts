import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn // {1}
      .pipe(
        take(1), // {2}
        map((isLoggedIn: boolean) => {
          // {3}
          if (!JSON.parse(sessionStorage.getItem('loggedIn'))) {
            this.router.navigate(['/login']); // {4}
            return false;
          }
          return true;
        })
      );
  }
}
