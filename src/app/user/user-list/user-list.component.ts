
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IUser } from './../iuser';
import { IRole } from '../irole';
import { UserService } from '../user.service';
import { MaterialModule } from '../../material.module';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
  MatSort,
  MatSnackBar,
  MatSelectModule,
  MatCheckboxModule,
  PageEvent,
  MatPaginator,
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user: IUser;
  role: IRole;
  selectedRowIndex = -1;
  selectedUser: false;
  selectedId: number;
  user$: Observable<IUser>;
  creation = false;

  displayedColumns = ['userName', 'email', 'active', 'role'];
  formColumns = ['nom', 'mail', 'actif', 'rôle'];
  dataSourceUser = new MatTableDataSource();

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  roles = [
    {value: {id: 3, name: 'EMPLOYEE' }, viewValue: 'Agent'},
    {value: {id: 2, name: 'MANAGER' }, viewValue: 'Manager'},
    {value: {id: 1, name: 'ADMIN' }, viewValue: 'Administrateur'}
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUser.filter = filterValue;
  }

  ngOnInit() {
    this.user = {
      id: 0,
      userName: '',
      password: '',
      email: '',
      active: false,
      role: null
    };
    this.refreshTab();
    this.userService.update$.subscribe(() => this.refreshTab());
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  refreshTab() {
    this.userService.getUsers().subscribe((data: IUser[]) => {
      this.dataSourceUser = new MatTableDataSource(data);
      this.dataSourceUser.sort = this.sort;
      this.dataSourceUser.paginator = this.paginator;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.user = Object.assign({}, row);
    console.log(this.user);
    this.creation = false;
  }

  afficherMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000,
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

  createUser(user) {
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(
      result => {this.afficherMessage('Création effectuée', ''); },
     error => {this.afficherMessage('', 'Email déjà utilisé !'); }
    );

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

