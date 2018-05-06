import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../auth/auth.guard';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';

const supplierRoutes: Routes = [
  {
    path: 'suppliers',
    component: SupplierListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'suppliers/:id',
    component: SupplierDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'suppliers/:id/products',
    component: SupplierProductsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(supplierRoutes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
