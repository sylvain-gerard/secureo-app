import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
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
  providers: [CartService]
})
export class CartModule { }
