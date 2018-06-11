import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IEmployees } from '../../employees/iemployees';
import { PostingService } from '../posting.service';

@Component({
  selector: 'app-posting-employees',
  templateUrl: './posting-employees.component.html',
  styleUrls: ['./posting-employees.component.css']
})
export class PostingEmployeesComponent implements OnInit {
  employee: IEmployees;
  selectedRowIndex = -1;
  urlParam: any;
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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private postingService: PostingService
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceEmployee.filter = filterValue;
  }

  ngOnInit() {
    this.urlParam = this.route.snapshot.params;
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
    this.postingService.update$.subscribe(() => this.refreshTab());
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  refreshTab() {
    this.postingService.getEmployeesOfPosting(this.urlParam.id).subscribe((data: IEmployees[]) => {
      this.dataSourceEmployee = new MatTableDataSource(data);
      this.dataSourceEmployee.sort = this.sort;
      this.dataSourceEmployee.paginator = this.paginator;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.employee = Object.assign({}, row);
    this.router.navigate(['/employees', this.employee.id]);
  }

  backTohome() {
    this.router.navigate(['']);
  }

  goBackToList() {
    this.router.navigate(['postings', this.urlParam.id]);
  }

}
