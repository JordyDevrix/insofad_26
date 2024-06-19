import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {Order} from '../models/order.model';
import {AuthService} from '../auth/auth.service';
import {CurrencyPipe} from '@angular/common';
import {Customer} from '../models/customer.model';
import {AccountService} from '../services/account.service';
import {ShippingCostsService} from '../services/shippingcosts.service';

@Component({
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private authService: AuthService,
        private accountService: AccountService,
        private shippingCostsService: ShippingCostsService
    ) {
    }

    public orderList: Order[];
    shippingCosts: number = this.shippingCostsService.getShippingCosts();
    customer: Customer;

    ngOnInit() {
        this.orderService
            .getOrders()
            .subscribe((orders: Order[]) => {
                this.orderList = orders;
                console.log(this.orderList);
            });
        console.log(this.authService.getToken())
        this.accountService.getCustomer().subscribe((customer: Customer) => {
            this.customer = customer;
            console.log(this.customer);
        });
    }
}

