import { Component, OnInit, AfterViewInit, ViewChild, Input, Output } from '@angular/core';
import { IProduct } from '../../products/iproduct';
import { ICategory } from '../../catogories/icategory';
import { ISupplier } from '../isupplier';
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
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.css']
})
export class SupplierProductsComponent implements AfterViewInit {
  supplier: ISupplier;
  product: IProduct;
  category: ICategory;
  supplier$: ISupplier;
  selectedRowIndex = -1;
  selectedProduct = false;
  id: number;

  products$: Observable<IProduct[]>;
  selectedId: number;

  displayedColumns = [
    'productName',
    'model',
    'productCode',
    'size',
    'sizeDescription',
    'disabled',
    'category'
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
    private supplierService: SuppliersService,
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
      disabled: false,
      category: null,
      supplier: null
    };
    this.refreshTab();
    this.supplierService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.supplierService
      .getProductsOfSupplier(this.supplier.id)
      .subscribe((data: IProduct[]) => {
        this.dataSourceProduct = new MatTableDataSource(data);
        this.dataSourceProduct.sort = this.sort;
        this.dataSourceProduct.paginator = this.paginator;
      });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.product = Object.assign({}, row);
    console.log(this.product);
    console.log(this.selectedRowIndex);
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.product = Object.assign({}, row);
    this.router.navigate(['/products', this.product.id]);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
