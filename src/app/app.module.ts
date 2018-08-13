import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './interfaces/counter';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

import { UserRoutingModule } from './user/user-routing.module';
import { UsersModule } from './user/users.module';

import { ProductRoutingModule } from './products/product-routing.module';
import { ProductsModule } from './products/products.module';

import { SuppliersModule } from './suppliers/suppliers.module';
import { SuppliersRoutingModule } from './suppliers/suppliers-routing.module';

import { EmployeeModule } from './employees/employee.module';
import { EmployeeRoutingModule } from './employees/employee-routing.module';

import { OrdersRoutingModule } from './orders/orders-routing.module';
import { OrdersModule } from './orders/orders.module';

import { PostingsModule } from './posting/postings.module';
import { PostingsRoutingModule } from './posting/postings-routing.module';

import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';
import { MeComponent } from './me/me.component';
import { MeModule } from './me/me.module';
import { MeRoutingModule } from './me/me-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MeComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ProductsModule,
    ProductRoutingModule,
    SuppliersModule,
    SuppliersRoutingModule,
    UsersModule,
    UserRoutingModule,
    EmployeeModule,
    EmployeeRoutingModule,
    OrdersRoutingModule,
    OrdersModule,
    PostingsModule,
    PostingsRoutingModule,
    CartModule,
    HomeModule,
    MeModule,
    MeRoutingModule,
    StoreModule.forRoot({ count: counterReducer }),

  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
