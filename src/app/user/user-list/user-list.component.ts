
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

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {

  user: IUser;
  role: IRole;
  selectedRowIndex = -1;
  edition = false;

  displayedColumns = ['userName', 'email', 'active', 'role'];
  dataSourceUser = new MatTableDataSource();

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceUser.filter = filterValue;
  }

  ngAfterViewInit() {
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
    this.edition = true;
  }

  cancelSelect() {
    this.selectedRowIndex = -1;
    this.edition = false;
    this.clearInput();
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

 /* onSubmit() {
    if (this.edition) {
      this.userService.updateUser(this.user).subscribe(
        result => {this.afficherMessage('Update effectué', ''); },
       error => {this.afficherMessage('', 'Suspect déjà présent'); }
      );
    } else {
      this.userService.createUser(this.user).subscribe(
        result => {this.afficherMessage('Enregistrement effectué', ''); },
       error => {this.afficherMessage('', 'Suspect déjà présent'); }
      );
    }
  }
  */
  /*
    deleteUser() {
      this.edition = false;
      this.userService.deleteUser(this.user.id).subscribe();
      this.clearInput();
    }
  */

  afficherMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000,
       });
  }
}
