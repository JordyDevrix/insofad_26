import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    OrderHistoryComponent,
    ProductThumbnailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ProductsComponent
  ]

})
export class ProductsModule { }
