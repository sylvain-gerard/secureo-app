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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  formEmployee: FormGroup;
  employee: IEmployees;
  // posting: IPosting;
  selectedRowIndex = -1;
  // selectedemployee: false;
  // selectedId: number;
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

  dataSourceEmployee = new MatTableDataSource();

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  jobTitles = [
    {value: 'POSTMAN', viewValue: 'Facteur'},
    {value: 'MAIL_AGENT', viewValue: 'Agent Courrier'},
    {value: 'HANDLER', viewValue: 'Manutentionnaire'},
    {value: 'DELIVERER', viewValue: 'Livreur'},
    {value: 'MANAGER', viewValue: 'Manager'}
  ];

  genders = [
    {value: 'M', viewValue: 'Homme'},
    {value: 'F', viewValue: 'Femme'}
  ];

  grades = [
    {value: 'I2', viewValue: '1.2'},
    {value: 'I3', viewValue: '1.3'},
    {value: 'II1', viewValue: '2.1'},
    {value: 'II1', viewValue: '2.2'},
    {value: 'II3', viewValue: '2.3'},
    {value: 'III1', viewValue: '3.1'},
    {value: 'III2', viewValue: '3.2'},
    {value: 'III3', viewValue: '3.3'},
    {value: 'GROUP_A', viewValue: 'Groupe A'},
    {value: 'GROUP_B', viewValue: 'Groupe B'},
    {value: 'GROUP_C', viewValue: 'Groupe C'}
  ];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
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
      employees: null
      // orders: null
    };
    this.refreshTab();
    this.employeeService.update$.subscribe(() => this.refreshTab());
    this.formEmployee = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      idRh: ['', Validators.required],
      jobTitle: ['', Validators.required],
      gender: ['', Validators.required],
      grade: ['', Validators.required]
    });
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
    this.creation = false;
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.employee = Object.assign({}, row);
    this.router.navigate(['/employees', this.employee.id]);
  }

  createEmployee(employee) {
    console.log('EMPLOYEE INPUT', this.employee);
    this.employee = {
      id: 0,
      firstName: this.formEmployee.value.firstName,
      lastName: this.formEmployee.value.lastName,
      phone: this.formEmployee.value.phone,
      email: this.formEmployee.value.email,
      idRh: this.formEmployee.value.idRh,
      jobTitle: this.formEmployee.value.jobTitle,
      gender: this.formEmployee.value.gender,
      grade: this.formEmployee.value.grade,
      posting: null,
      manager: null,
      employees: null
    };
    this.employeeService.createEmployee(this.employee).subscribe(
      result => {
        this.showMessage('Création effectuée', '');
      },
      error => {
        this.showMessage('', 'Création en echec !');
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

  showMessage(message: string, erreur: string) {
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
      employees: null
    };
  }
}
