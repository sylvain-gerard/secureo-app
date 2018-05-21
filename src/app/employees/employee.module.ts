import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './employee.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeOrdersComponent } from './employee-orders/employee-orders.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeOrdersComponent
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
