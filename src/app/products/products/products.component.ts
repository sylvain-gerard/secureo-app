import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from './../iproduct';
import { ICategory } from '../../categories/icategory';
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
  MatPaginator
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ISupplier } from '../../suppliers/isupplier';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  // edition = false;
  selectedProduct = false;

  products$: Observable<IProduct[]>;
  selectedId: number;

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
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

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
      imageUrl: '',
      disabled: false,
      category: null,
      supplier: null,
      added: false
    };
    this.refreshTab();
    this.productService.update$.subscribe(() => this.refreshTab());
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.product = Object.assign({}, row);
    this.router.navigate(['/products', this.product.id]);
  }

  backTohome() {
    this.router.navigate(['']);
  }

  refreshTab() {
    this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.dataSourceProduct = new MatTableDataSource(data);
      this.dataSourceProduct.sort = this.sort;
      this.dataSourceProduct.paginator = this.paginator;
    });
  }
  /*
  cancelSelect() {
    this.selectedRowIndex = -1;
    // this.edition = false;
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
  */
}
