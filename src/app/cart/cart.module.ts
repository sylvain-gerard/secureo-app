import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { OrderService } from '../orders/order.service';
import { EmployeeService } from '../employees/employee.service';
// import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
    // CartRoutingModule
  ],
  declarations: [
    CartComponent
  ],
  providers: [CartService, OrderService, EmployeeService]
})
export class CartModule { }
