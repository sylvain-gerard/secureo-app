import { Component, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../iorder';
import { IOrderItem } from '../IOrderItem';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  MatSnackBar,
  MatTableDataSource,
  PageEvent,
  MatSort,
  MatPaginator
} from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  order$: IOrder;
  item: IOrderItem;
  items$: Observable<IOrderItem[]>;
  private id: any;
  urlParam: any;
  selectedRowIndex = -1;

  displayedColumns = [
    'productName',
    'productCode',
    'model',
    'quantity',
    'totalPrice'
  ];

  dataSource = new MatTableDataSource();

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private orderService: OrderService
  ) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.urlParam = this.route.snapshot.params;
    this.item = {
      id: 0,
      quantity: 0,
      totalPrice: 0,
      product: null,
      order: null
    };
    this.refreshTab();
    this.orderService.update$.subscribe(() => this.refreshTab());
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  refreshTab() {
    this.orderService
      .getOrderItems(this.urlParam.id)
      .subscribe((data: IOrderItem[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.item = Object.assign({}, row);
    console.log(this.item);
    // this.creation = false;
  }

  backTohome() {
    this.router.navigate(['']);
  }
}
