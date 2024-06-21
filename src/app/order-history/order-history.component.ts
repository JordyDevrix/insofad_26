import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { AuthService } from '../auth/auth.service';
import { CurrencyPipe } from '@angular/common';
import { Customer } from '../models/customer.model';
import { AccountService } from '../services/account.service';
import { ShippingCostsService } from '../services/shippingcosts.service';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
    customer: Customer;
    selectedOrder: Order | null = null;
    reason: string = '';
    productDetails: string = '';
    preferredHandling: string = 'refund';
    showReturnForm: boolean = false;
    public orderList: Order[];
    shippingCosts: number;
    notificationVisible: boolean = false;
 
    public showToaster(): void {
      this.notificationVisible = true;
      setTimeout(() => this.notificationVisible = false, 3000);
    }
  

    constructor(
        private orderService: OrderService,
        private authService: AuthService,
        private accountService: AccountService,
        private shippingCostsService: ShippingCostsService
    ) {
        this.shippingCosts = this.shippingCostsService.getShippingCosts();
    }

    ngOnInit() {
        this.orderService
            .getOrders()
            .subscribe((orders: Order[]) => {
                this.orderList = orders;
                console.log(this.orderList);
            });
        console.log(this.authService.getToken());
        this.accountService.getCustomer().subscribe((customer: Customer) => {
            this.customer = customer;
            console.log(this.customer);
        });
    }

    openReturnForm(order: Order) {
        this.selectedOrder = order;
        console.log("selectedOrder" + this.selectedOrder)
        this.productDetails = this.selectedOrder.products.map(product => product.name).join(', ');

        this.reason = '';
        this.preferredHandling = 'refund';
        this.showReturnForm = true;
    }

    closeReturnForm() {
        this.selectedOrder = null;
        this.showReturnForm = false;
    }

    submitReturnForm() {
        if (this.selectedOrder) {
            const returnRequest = {
                orderId: this.selectedOrder.id,
                reason: this.reason,
                productDetails: this.productDetails,
                preferredHandling: this.preferredHandling
            };
            console.log('Return request submitted:', returnRequest);
            this.closeReturnForm();
            this.showConfirmation();
        }
    }

    showConfirmation() {
        this.showToaster()
        console.log("in confirmation")
        alert('Request submitted, confirmation has been sent to your email');
      }
}
