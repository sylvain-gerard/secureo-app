import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// import { ProductsComponent } from './products/products/products.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
// import { ProductDetailComponent } from './products/product-detail/product-detail.component';
// import { ProductService } from './products/product.service';
import { ProductRoutingModule } from './products/product-routing.module';
import { ProductsModule } from './products/products.module';
// import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
// import { SupplierDetailComponent } from './suppliers/supplier-detail/supplier-detail.component';
// import { SuppliersService } from './suppliers/suppliers.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SuppliersRoutingModule } from './suppliers/suppliers-routing.module';
import { SupplierProductsComponent } from './suppliers/supplier-products/supplier-products.component';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    HomeComponent,
    // ProductsComponent,
    UserDetailComponent,
    SupplierProductsComponent,
    // SupplierListComponent,
    // SupplierDetailComponent,
    // ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProductRoutingModule,
    ProductsModule,
    SuppliersModule,
    AppRoutingModule,
    SuppliersRoutingModule

  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    // ProductService,
    // SuppliersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
