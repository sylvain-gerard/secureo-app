import { Component, OnInit } from '@angular/core';
import { IUser } from '../iuser';
import { Observable } from 'rxjs/Observable';
import { IRole } from '../irole';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: IUser;
  id: number;
  user$: Observable<IUser>;
  role: IRole;
  private selectedId: number;
  urlParam: any;
  // edition: boolean;
  roles = [
    {value: {id: 3, name: 'EMPLOYEE' }, viewValue: 'Agent'},
    {value: {id: 2, name: 'MANAGER' }, viewValue: 'Manager'},
    {value: {id: 1, name: 'ADMIN' }, viewValue: 'Administrateur'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.urlParam = this.route.snapshot.params;
    this.user$ = this.route.paramMap.switchMap((params: ParamMap) =>
    this.userService.getUser(params.get('id'))
  );
    this.user$.subscribe(console.log);
  }

  goBackToList() {
    this.router.navigate(['users']);
  }

  edit(user) {
    this.user = user;
    console.log(this.user);
  this.userService.updateUser(this.user).subscribe(
    result => {this.showMessage('Modification enregistrée !', ''); },
    error => {this.showMessage('', 'ERREUR lors de l\'édition.'); }
  );
  }

  deleteUser(id) {
    window.alert('Attention ! Cette action supprimera cet utilisateur du système. Continuer ?');
    try {
      this.userService.deleteUser(this.urlParam.id).subscribe((response) =>
        console.log('deleted'));
      this.showMessage('Suppression effectuée !', '');
      this.goBackToList();
    } catch {
      this.showMessage('', 'ERREUR lors de la suppression.');
    }
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000,
       });
  }

}
