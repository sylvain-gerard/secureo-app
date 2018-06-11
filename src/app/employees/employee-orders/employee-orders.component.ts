import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IOrder } from '../../orders/iorder';
import {
  MatTableDataSource,
  PageEvent,
  MatSort,
  MatPaginator
} from '@angular/material';
import { IEmployees } from '../iemployees';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-employee-order',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css']
})
export class EmployeeOrdersComponent implements OnInit {
  urlParam: any;
  orders$: Observable<IOrder[]>;
  order: IOrder;
  employee$: Observable<IEmployees>;
  employee: IEmployees;
  selectedRowIndex = -1;
  dataSourceOrder = new MatTableDataSource();
  displayedColumns = ['createdAt', 'updatedAt', 'total', 'status'];
  id: any;

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
    private employeeService: EmployeeService
  ) {}


  ngOnInit() {
    this.urlParam = this.route.snapshot.params;
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
    this.employeeService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.employeeService
      .getOrdersOfEmployee(this.urlParam.id)
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

  backTohome() {
    this.router.navigate(['']);
  }

  backToEmployee() {
    this.router.navigate(['employees', this.urlParam.id]);
  }

  viewItem(row) {
    this.selectedRowIndex = row.id;
    this.order = Object.assign({}, row);
    this.router.navigate(['/orders', this.order.id, 'items']);
  }

}
