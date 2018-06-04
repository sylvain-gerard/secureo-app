
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../auth/auth.guard';

const cartRoutes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cartRoutes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

