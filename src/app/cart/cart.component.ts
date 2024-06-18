import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

import {CartService} from '../services/cart.service';
import {Product} from '../models/product.model';
import {OrderService} from '../services/order.service';
import {AuthService} from '../auth/auth.service';
import {Order} from '../models/order.model';
import {OrderProduct} from "../models/orderproduct.model";
import {ShippingCostsService} from "../services/shippingcosts.service";

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CurrencyPipe],
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

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private authService: AuthService,
        private shippingCostsService: ShippingCostsService
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
        this.productsPrice = this.cartProducts.reduce((acc, curr) => acc + curr.productProperties.price, 0)
        this.totalPrice = this.productsPrice + this.shippingCosts;
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
}