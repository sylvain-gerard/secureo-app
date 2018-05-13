import { Component, OnInit } from '@angular/core';
import { ISupplier } from '../../suppliers/isupplier';
import { ICategory } from '../../catogories/icategory';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<IProduct>;
  category: ICategory;
  supplier: ISupplier;
  // edition = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.productService.getProduct(params.get('id'))
    );
    this.product$.subscribe(console.log);
  }

  goBackToList() {
    this.router.navigate(['products']);
  }

}
