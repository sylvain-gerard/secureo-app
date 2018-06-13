import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IEmployees } from '../employees/iemployees';
import { IUser } from '../user/iuser';
import { Observable } from 'rxjs/Observable';
import { IOrder } from '../orders/iorder';
import { EmployeeService } from '../employees/employee.service';
import { PageEvent, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  employee: IEmployees;
  user: IUser;
  id: number;
  order: IOrder;
  myOrders: Observable<IOrder[]>;
  selectedRowIndex = -1;
  dataSourceOrder = new MatTableDataSource();
  displayedColumns = ['createdAt', 'updatedAt', 'total', 'status'];

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
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(sessionStorage.getItem('employee'));
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.id = this.employee.id;
    console.log(this.id);
    this.myOrders = this.employeeService.getOrdersOfEmployee(this.id);
    this.order = {
      id: 0,
      createdAt: null,
      updatedAt: null,
      total: 0,
      status: '',
      items: [],
      employee: null
    };
    this.refreshTab();

  }
  refreshTab() {
    this.employeeService
      .getOrdersOfEmployee(this.id)
      .subscribe((data: IOrder[]) => {
        this.dataSourceOrder = new MatTableDataSource(data);
        this.dataSourceOrder.sort = this.sort;
        this.dataSourceOrder.paginator = this.paginator;
      });
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.order = Object.assign({}, row);
  }
  viewItem(row) {
    this.selectedRowIndex = row.id;
    this.order = Object.assign({}, row);
    this.router.navigate(['/orders', this.order.id, 'items']);
  }
}
