import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { IUser } from './../iuser';
import { IRole } from '../irole';
import { UserService } from '../user.service';
import {
  MatTableDataSource,
  MatSort,
  MatSnackBar,
  PageEvent,
  MatPaginator
} from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import {catchError, map, startWith, switchMap, mergeMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPagedUsers } from '../IPagedUsers';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  formUser: FormGroup;
  data: IPagedUsers;
  content: IUser[];
  user: IUser;
  role: IRole;
  selectedRowIndex = -1;
  selectedUser: false;
  selectedId: number;
  user$: Observable<IUser>;
  creation = false;
  urlParam: any;
  dataSourceUser = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns = ['userName', 'email', 'active', 'role'];
  // formColumns = ['nom', 'mail', 'actif', 'rôle'];

  // MatPaginator Inputs
  length: IPagedUsers["totalElements"];
  pageSize: IPagedUsers["size"];
  number: IPagedUsers["number"];
  pageSizeOptions = [10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  roles = [
    { value: { id: 3, name: 'EMPLOYEE' }, viewValue: 'Agent' },
    { value: { id: 2, name: 'MANAGER' }, viewValue: 'Manager' },
    { value: { id: 1, name: 'ADMIN' }, viewValue: 'Administrateur' }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.refreshTab();
    this.userService.update$.subscribe(() => this.refreshTab());
    this.formUser = this.fb.group({
      userName: ['', Validators.pattern('^\\w+$')],
      password: ['', Validators.required],
      email: ['', Validators.pattern('^(\\w||\\.)+@\\w+\\.\\w+$')],
      role: ['', Validators.required],
      active: ['true']
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  refreshTab() {
    /*
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return  this.userService.getUsers(
            this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data =>{ this.data = data});
      */
    
    this.userService.getUsers(this.number, this.pageSize).subscribe(data => {
      this.dataSourceUser = new MatTableDataSource(data.content);
      this.dataSourceUser.sort = this.sort;
      //this.dataSourceUser.paginator = this.paginator;
      this.paginator.length = data.totalElements;
      this.dataSourceUser.paginator.pageSize = this.pageSize;
      this.dataSourceUser.paginator.pageIndex = this.number;
      console.log(this.paginator);
      console.log(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUser.filter = filterValue;
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.creation = false;
  }

  afficherMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000
    });
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.user = Object.assign({}, row);
    this.router.navigate(['/users', this.user.id]);
  }

  backTohome() {
    this.router.navigate(['']);
  }

  createUser() {
    this.user = {
      id: 0,
      userName: this.formUser.value.userName,
      password: this.formUser.value.password,
      email: this.formUser.value.email,
      active: this.formUser.value.active,
      role: this.formUser.value.role
    };
    this.userService.createUser(this.user).subscribe(
      result => {
        this.afficherMessage('Création effectuée', '');
      },
      error => {
        this.afficherMessage('', 'Requête invalide ou email déjà utilisé !');
      }
    );
  }

  deleteUser(id) {
    window.alert(
      'Attention ! Cette action supprimera cet utilisateur du système. Continuer ?'
    );
    try {
      this.userService
        .deleteUser(this.urlParam.id)
        .subscribe(response => console.log('deleted'));
      this.showMessage('Suppression effectuée !', '');
      this.router.navigate(['users']);
    } catch {
      this.showMessage('', 'ERREUR lors de la suppression.');
    }
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000
    });
  }

  create() {
    this.clearInput();
    this.creation = true;
  }

  closeForm() {
    this.creation = false;
  }

  clearInput() {
    this.user = {
      id: 0,
      userName: '',
      password: '',
      email: '',
      active: false,
      role: null
    };
  }
}
