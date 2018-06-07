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
  MatPaginator
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  formUser: FormGroup;

  user: IUser;
  role: IRole;
  selectedRowIndex = -1;
  selectedUser: false;
  selectedId: number;
  user$: Observable<IUser>;
  creation = false;
  urlParam: any;

  dataSourceUser = new MatTableDataSource();

  displayedColumns = ['userName', 'email', 'active', 'role'];
  // formColumns = ['nom', 'mail', 'actif', 'rôle'];

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

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
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
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
    this.userService.getUsers().subscribe((data: IUser[]) => {
      this.dataSourceUser = new MatTableDataSource(data);
      this.dataSourceUser.sort = this.sort;
      this.dataSourceUser.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUser.filter = filterValue;
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.user = Object.assign({}, row);
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
    console.log(this.formUser);
    this.user = {
      id: 0,
      userName: this.formUser.value.userName,
      password: this.formUser.value.password,
      email: this.formUser.value.email,
      active: this.formUser.value.active,
      role: this.formUser.value.role
    };
    console.log(this.user);
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
