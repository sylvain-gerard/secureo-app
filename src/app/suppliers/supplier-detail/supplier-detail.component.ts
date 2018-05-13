import { Component, OnInit, Output, Input } from '@angular/core';
import { ISupplier } from '../isupplier';
import { Observable } from 'rxjs/Observable';
import { IAddress } from '../../addresses/iaddress';
import { IProduct } from '../../products/iproduct';
import { SuppliersService } from '../suppliers.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  supplier$: Observable<ISupplier>;
  products: Observable<IProduct[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private supplierService: SuppliersService
  ) { }

  ngOnInit() {
    this.supplier$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.supplierService.getSupplier(params.get('id'))
    );
  }

  goBackToList() {
    this.router.navigate(['suppliers']);
  }

  showProducts(id: number) {
    this.products = this.route.paramMap.switchMap((params: ParamMap) =>
      this.supplierService.getProductsOfSupplier(params.get('id'))
    );
    this.router.navigate(['suppliers', id, 'products']);
  }
}
