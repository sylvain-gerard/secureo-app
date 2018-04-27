
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './../iuser';
import { UserService } from '../user.service';
import { MaterialModule } from '../../material.module';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
  MatSort,
  MatSnackBar,
  MatSelectModule
} from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  selectedRowIndex = -1;
  edition = false;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  displayedColumns = ['userName', 'email', 'active', 'role'];
  dataSourceUser = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

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
      role: 0
    };
    this.refreshTab();
    this.userService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.dataSourceUser = new MatTableDataSource(data);
      this.dataSourceUser.sort = this.sort;
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
      role: 0
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

  afficherMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000,
       });
  }
/*
  deleteSuspect() {
    this.edition = false;
    this.userService.deleteUser(this.user.id).subscribe();
    this.clearInput();
  }
*/

}
