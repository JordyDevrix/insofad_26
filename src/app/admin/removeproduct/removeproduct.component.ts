import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {ProductProperties} from "../../models/productproperties.model";
import {Product} from "../../models/product.model";
import {Category} from "../../models/category.model";
import {ProductsService} from "../../services/products.service";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-removeproduct',
  standalone: true,
  imports: [
    CurrencyPipe,
    NavComponent
  ],
  templateUrl: './removeproduct.component.html',
  styleUrl: './removeproduct.component.scss'
})
export class RemoveproductComponent implements OnInit {
  public productProperties: ProductProperties[] = [];
  public products: Product[] = [];
  public categories: Category[] = [];

  constructor(
      private productsService: ProductsService,
      private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  onRemoveProduct(id: number) {
    this.productsService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
    window.location.reload();
  }

  onRemoveVariant(id: number) {
    this.productsService.removeVariant(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      console.log(id)
    });
    window.location.reload();
  }
}
