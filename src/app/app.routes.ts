import {Routes} from '@angular/router';

import {CartComponent} from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {AdminComponent} from "./admin/admin.component";
import {AddproductComponent} from "./admin/addproduct/addproduct.component";
import {RemoveproductComponent} from "./admin/removeproduct/removeproduct.component";
import {StatsComponent} from "./admin/stats/stats.component";
import {ViewproductsComponent} from "./admin/viewproducts/viewproducts.component";

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'cart', component: CartComponent},
    {path: 'orders', component: OrderHistoryComponent},
    {path: 'account/login', component: LoginComponent},
    {path: 'account/register', component: RegisterComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'admin/addproduct', component: AddproductComponent},
    {path: 'admin/removeproduct', component: RemoveproductComponent},
    {path: 'admin/stats', component: StatsComponent},
    {path: 'admin/products', component: ViewproductsComponent}
];
