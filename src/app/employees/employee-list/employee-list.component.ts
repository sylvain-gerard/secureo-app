import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { IEmployees } from '../iemployees';
import { IPosting } from '../../posting/iposting';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employee: IEmployees;
  // posting: IPosting;
  selectedRowIndex = -1;
  selectedemployee: false;
  selectedId: number;
  employee$: Observable<IEmployees>;
  creation = false;

  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'idRh',
    'jobTitle',
    'gender',
    'grade'
  ];
  formColumns = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'idRh',
    'jobTitle',
    'gender',
    'grade'
  ];
  dataSourceEmployee = new MatTableDataSource();

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceEmployee.filter = filterValue;
  }

  ngOnInit() {
    this.employee = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idRh: '',
      jobTitle: '',
      gender: '',
      grade: '',
      posting: null,
      manager: null,
      employees: null,
      orders: null
    };
    this.refreshTab();
    this.employeeService.update$.subscribe(() => this.refreshTab());
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  refreshTab() {
    this.employeeService.getEmployees().subscribe((data: IEmployees[]) => {
      this.dataSourceEmployee = new MatTableDataSource(data);
      this.dataSourceEmployee.sort = this.sort;
      this.dataSourceEmployee.paginator = this.paginator;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.employee = Object.assign({}, row);
    console.log(this.employee);
    this.creation = false;
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.employee = Object.assign({}, row);
    this.router.navigate(['/employees', this.employee.id]);
  }

  createEmployee(employee) {
    console.log(this.employee);
    this.employeeService.createEmployee(this.employee).subscribe(
      result => {
        this.afficherMessage('Création effectuée', '');
      },
      error => {
        this.afficherMessage('', 'Email déjà utilisé !');
      }
    );
  }

  backTohome() {
    this.router.navigate(['']);
  }

  create() {
    this.clearInput();
    this.creation = true;
  }

  closeForm() {
    this.creation = false;
  }

  afficherMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000
    });
  }

  clearInput() {
    this.employee = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idRh: '',
      jobTitle: '',
      gender: '',
      grade: '',
      posting: null,
      manager: null,
      employees: null,
      orders: null
    };
  }
}
