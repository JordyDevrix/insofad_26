import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';
import {OrderProduct} from "../models/orderproduct.model";

const localStorageKey: string = "products-in-cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: OrderProduct[] = [];
  public $productInCart: BehaviorSubject<OrderProduct[]> = new BehaviorSubject<OrderProduct[]>([]);

  constructor() {
    this.loadProductsFromLocalStorage();
  }

  public addProductToCart(orderProduct: OrderProduct) {
    this.productsInCart.push(orderProduct);
    this.saveProductsAndNotifyChange();
  }

  public removeProductFromCart(product_index: number) {
    this.productsInCart.splice(product_index, 1);
    this.saveProductsAndNotifyChange();
  }
  
  public removeAllProductsFromCart() {
    this.productsInCart.splice(0, this.productsInCart.length);
    this.saveProductsAndNotifyChange();
}

  public allProductsInCart(): OrderProduct[] {
    return this.productsInCart.slice();
  }

  private saveProductsAndNotifyChange(): void {
    this.saveProductsToLocalStorage(this.productsInCart.slice());
    this.$productInCart.next(this.productsInCart.slice());
  }

  private saveProductsToLocalStorage(orderProducts: OrderProduct[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(orderProducts))
  }

  private loadProductsFromLocalStorage(): void {
    let productsOrNull = localStorage.getItem(localStorageKey)
    if (productsOrNull != null) {

      let products: OrderProduct[] = JSON.parse(productsOrNull)

      this.productsInCart = products
      this.$productInCart.next(this.productsInCart.slice());
    }
  }

}
