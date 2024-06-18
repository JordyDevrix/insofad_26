import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {NavComponent} from "../nav/nav.component";
import {CurrencyPipe} from "@angular/common";
import {ProductProperties} from "../../models/productproperties.model";

@Component({
  selector: 'app-viewproducts',
  standalone: true,
  imports: [
    NavComponent,
    CurrencyPipe
  ],
  templateUrl: './viewproducts.component.html',
  styleUrl: './viewproducts.component.scss'
})
export class ViewproductsComponent implements OnInit {
    public products: Product[] = [];
    public sellableProducts: Product[] = [];
    public totalStock: number = 0;
    constructor(
        private productsService: ProductsService
    ) {}

    ngOnInit(): void {
      this.productsService.getProducts().subscribe((products) => {
        this.products = products;
        this.sellableProducts = products.filter(product => product.productProperties.length > 0);
        this.totalStock = this.sellableProducts.map(product => product.productProperties.map(property => property.stock).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
      });
    }

  public addStock(product: Product, property: ProductProperties) {
    property.stock++;
    this.productsService.updateProductProperties(property.id, property).subscribe(() => {
      console.log('Stock updated');
    });
  }

    public addStockAmount(product: Product, property: ProductProperties) {
        const amount: number = 10;
        property.stock += amount;
        this.productsService.buyProductWithAmount(property.id, amount, property).subscribe(() => {
            console.log('Stock updated');
        });
    }
}
