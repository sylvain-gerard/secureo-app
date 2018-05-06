import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SuppliersService } from './suppliers.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SuppliersRoutingModule,
    MaterialModule
  ],
  declarations: [
    SupplierDetailComponent,
    SupplierListComponent
  ],
  providers: [SuppliersService]
})
export class SuppliersModule { }
