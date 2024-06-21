import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';

import {CartService} from '../services/cart.service';
import {Product} from '../models/product.model';
import {OrderService} from '../services/order.service';
import {AuthService} from '../auth/auth.service';
import {Order} from '../models/order.model';
import {OrderProduct} from "../models/orderproduct.model";
import {ShippingCostsService} from "../services/shippingcosts.service";
import { CouponService } from '../services/coupon.service';
import { Coupon } from '../models/coupon.model';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CurrencyPipe, CommonModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    public cartProducts: OrderProduct[];
    productsPrice: number;
    totalPrice: number;
    shippingCosts: number = this.shippingCostsService.getShippingCosts();
    userIsLoggedIn: boolean;
    order: Order = {
        "products": [],
        "totalPrice": 0
    };
    private coupon : Coupon;

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private authService: AuthService,
        private shippingCostsService: ShippingCostsService,
        private couponService: CouponService
    ) {
    }

    ngOnInit() {
        this.cartProducts = this.cartService.allProductsInCart();
        this.cartService.$productInCart.subscribe((orderProducts: OrderProduct[]) => {
            this.cartProducts = orderProducts;
            this.getTotalPrice();
            this.checkLoginState();
        });
    }

    public removeProductFromCart(product_index: number) {
        this.cartService.removeProductFromCart(product_index);
    }

    getTotalPrice() {
        this.couponCosts = this.coupon ? this.coupon.price : 0;
        this.productsPrice = this.cartProducts.reduce((acc, curr) => acc + curr.productProperties.price, 0)
        this.totalPrice = this.productsPrice + this.shippingCosts - this.couponCosts;

        if (isNaN(this.totalPrice)) {
            console.error("Total price calculation resulted in NaN");
            return 0;
          }
        
          return this.totalPrice; // Return toegevoegd voor gebruik van waarde in applyCoupon functie!

    }

    onPlaceOrder() {
        if (this.cartProducts.length != 0) {
            this.order.products = this.cartProducts;
            this.order.totalPrice = this.totalPrice;
            console.log(this.order);
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
                this.message = 'Coupon applied successfully!';
                console.log('Coupon applied successfully:', response);
                console.log('Discount amount: ' + this.couponCosts);
                console.log('New total price after applying coupon:', this.newTotal);
            } else {
                this.message = 'Coupon response does not contain expected data.'
                console.error('Coupon response does not contain expected data:', response);
            }
        },
        (error) => {
            this.message = 'Error applying coupon.';;
            console.error('Error applying coupon:', error);
        }
    );
  }
}