import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IProduct } from '../../products/iproduct';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { CartState } from '../../products/CartState';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CartService } from '../cart.service';
import { ProductService } from '../../products/product.service';
import { MatTableDataSource, PageEvent, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: IProduct[] = [];
  selectedRowIndex = -1;
  product: IProduct;

  displayedColumns = [
    'productName',
    'model',
    'productCode',
    'size',
    'sizeDescription',
    'disabled',
    'category',
    'supplier'
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

  constructor(private cartService: CartService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    console.log('CART COMPONENT INIT');
    this.cart = this.cartService.getCart();
    console.log('CART IN SESSIONSTORAGE', this.cart);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}
