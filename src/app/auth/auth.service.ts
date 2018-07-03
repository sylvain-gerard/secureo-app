import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { IUser } from '../user/iuser';
import { LogginUser } from '../user/LogginUser';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../employees/employee.service';
import { IEmployees } from '../employees/iemployees';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  public employeeLogged = new Observable<IEmployees>();

  get isLoggedIn() {
    if (sessionStorage.getItem('loggedIn')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private employeeService: EmployeeService
  ) {}

  login(loggedUser: LogginUser) {
    if (loggedUser.email !== '' && loggedUser.password !== '') {
      this.userService.postUserInfos(loggedUser).subscribe(
        user => {
          this.loggedIn.next(true);
          sessionStorage.setItem('loggedIn', JSON.stringify(true));
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
          this.showMessage('Utilisateur accepté !', '');
          this.employeeService.getEmployeeByEmail(loggedUser.email).subscribe(
            employee => {
              sessionStorage.setItem('employee', JSON.stringify(employee));
              this.showMessage('Employé trouvé !', '');
              this.employeeLogged = new BehaviorSubject<IEmployees>(employee);
              this.employeeLogged.subscribe(console.log);
            },
          error => {
            console.log(error);
            this.showMessage('', 'Employé introuvable !');
          }

          );
        },
        error => {
          console.log(error);
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
