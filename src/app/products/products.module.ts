import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent} from './product-detail/product-detail.component';

import { ProductService } from './product.service';

import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    MaterialModule
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ],
  providers: [ ProductService ]
})
export class ProductsModule { }
