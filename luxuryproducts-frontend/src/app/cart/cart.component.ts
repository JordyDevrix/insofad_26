import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { AuthService } from '../auth/auth.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public cartProducts: Product[];
  productsPrice: number;
  totalPrice: number;
  shippingCosts: number = 99.95;
  userIsLoggedIn: boolean;
  order: Order = {
  "products": [], 
  "totalPrice": 0
  };

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService) {}

  ngOnInit() {
    this.cartProducts = this.cartService.allProductsInCart();
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.cartProducts = products;
      this.getTotalPrice();
      this.checkLoginState();
    });
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
  }

  getTotalPrice() {
    this.productsPrice = this.cartProducts.reduce((acc, curr) => acc + curr.price, 0)
    this.totalPrice = this.productsPrice + this.shippingCosts;
  }

  onPlaceOrder() {
    if (this.cartProducts.length != 0) {
      this.order.products = this.cartProducts;
      this.order.totalPrice = this.totalPrice;
      this.orderService.placeOrder(this.order).subscribe();
      this.cartService.removeAllProductsFromCart();
      alert("Thank you for your order!")
    } else {
      alert("Please add items to your cart before placing an order.")
    }

  }

  public checkLoginState() {
    this.authService
    .$userIsLoggedIn
    .subscribe((loginState: boolean) => {
      this.userIsLoggedIn = loginState;
    });
  }
}