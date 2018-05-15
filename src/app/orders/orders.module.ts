import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderService } from './order.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersDetailComponent,
    OrdersListComponent
  ],
  providers: [OrderService]
})
export class OrdersModule { }
