import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from './../iproduct';
import { ICategory } from '../../catogories/icategory';
import { ProductService } from '../product.service';
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
import { ISupplier } from '../../suppliers/isupplier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit {

  product: IProduct;
  category: ICategory;
  supplier: ISupplier;
  selectedRowIndex = -1;
  edition = false;

  displayedColumns = ['productName', 'model', 'productCode', 'size', 'sizeDescription', 'disabled', 'category', 'supplier'];
  dataSourceProduct = new MatTableDataSource();

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
    private productService: ProductService
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceProduct.filter = filterValue;
  }

  ngAfterViewInit() {
    this.product = {
      id: 0,
      productName: '',
      productCode: '',
      model: '',
      description: '',
      productPrice: 0,
      size: '',
      sizeDescription: '',
      disabled: false,
      category: null,
      supplier: null
    };
    this.refreshTab();
    this.productService.update$.subscribe(() => this.refreshTab());
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  refreshTab() {
    this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.dataSourceProduct = new MatTableDataSource(data);
      this.dataSourceProduct.sort = this.sort;
      this.dataSourceProduct.paginator = this.paginator;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.product = Object.assign({}, row);
    this.edition = true;
  }

  cancelSelect() {
    this.selectedRowIndex = -1;
    this.edition = false;
    this.clearInput();
  }

  clearInput() {
    this.product = {
      id: 0,
      productName: '',
      productCode: '',
      model: '',
      description: '',
      productPrice: 0,
      size: '',
      sizeDescription: '',
      disabled: false,
      category: null,
      supplier: null
    };
  }

}
