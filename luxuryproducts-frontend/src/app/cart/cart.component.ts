import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { AuthService } from '../auth/auth.service';
import { Order } from '../models/order.model';
import { CouponService } from '../services/coupon.service';
import { Coupon } from '../models/coupon.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public cartProducts: Product[];
  private coupon : Coupon;

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
    private authService: AuthService,
    private couponService: CouponService) {}

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

  public getTotalPrice() {
    this.couponCosts = this.coupon ? this.coupon.price : 0;
    this.productsPrice = this.cartProducts.reduce((acc, curr) => acc + curr.price, 0);
    this.totalPrice = this.productsPrice + this.shippingCosts - this.couponCosts;
  
    if (isNaN(this.totalPrice)) {
      console.error("Total price calculation resulted in NaN");
      return 0;
    }
  
    return this.totalPrice;
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

  newTotal: number;
  message: string;
  couponCosts : number = 0;

  public applyCoupon(couponTitle: string) {
    const totalPrice = this.getTotalPrice();
    this.couponService.applyCoupon(couponTitle, totalPrice).subscribe(
        (response) => {
            if (response && response.newTotal !== undefined && response.discount !== undefined) {
                this.newTotal = response.newTotal;
                this.couponCosts = response.discount;
                this.message = response.message;
                console.log('Coupon applied successfully:', response);
                console.log('Discount amount: ' + this.couponCosts);
                console.log('New total price after applying coupon:', this.newTotal);
            } else {
                console.error('Coupon response does not contain expected data:', response);
            }
        },
        (error) => {
            console.error('Error applying coupon:', error);
        }
    );
  }

}

