import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CouponsComponent } from './coupons/coupons.component';
import { AdminComponent } from './auth/admin/admin.component';
import { AdminAuthGuard } from './auth/admin/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent },
  {path: 'orders', component: OrderHistoryComponent},
  {path: 'auth/login', component: LoginComponent },
  {path: 'auth/register', component: RegisterComponent},
  {path: 'coupons', component: CouponsComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]}
];
