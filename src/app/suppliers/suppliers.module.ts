import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SuppliersService } from './suppliers.service';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SuppliersRoutingModule,
    MaterialModule
  ],
  declarations: [
    SupplierDetailComponent,
    SupplierListComponent,
    SupplierProductsComponent
  ],
  providers: [SuppliersService]
})
export class SuppliersModule { }
