import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ISupplier } from '../isupplier';
import { IProduct } from '../../products/iproduct';
import { IAddress } from '../../addresses/iaddress';
import { Observable } from 'rxjs/Observable';
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
import { SuppliersService } from '../suppliers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements AfterViewInit {
  supplier: ISupplier;
  products: IProduct[];
  address: IAddress;
  selectedRowIndex = -1;
  selectedSupplier: false;
  selectedId: number;
  supplier$: Observable<ISupplier>;

  displayedColumns = ['supplierName', 'city', 'country'];
  dataSourceSupplier = new MatTableDataSource();

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
    private route: ActivatedRoute,
    private supplierService: SuppliersService
  ) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceSupplier.filter = filterValue;
  }

  ngAfterViewInit() {
    this.supplier = {
      id : 0,
      supplierName: '',
      address: null,
      products: null
    };
    this.refreshTab();
    this.supplierService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.supplierService.getSuppliers().subscribe((data: ISupplier[]) => {
      this.dataSourceSupplier = new MatTableDataSource(data);
      this.dataSourceSupplier.sort = this.sort;
      this.dataSourceSupplier.paginator = this.paginator;
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.supplier = Object.assign({}, row);
    this.router.navigate(['/suppliers', this.supplier.id]);
  }

  backTohome() {
    this.router.navigate(['']);
  }


}
