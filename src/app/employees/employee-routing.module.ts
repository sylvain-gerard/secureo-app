import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../auth/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeOrdersComponent } from './employee-orders/employee-orders.component';
import { OrdersDetailComponent } from '../orders/orders-detail/orders-detail.component';

const employeeRoutes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id/orders',
    component: EmployeeOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:id/items',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
