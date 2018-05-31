import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

const orderRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:id/items',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
