import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";
import { Order } from "../models/order.model";
import { AuthService } from "../auth/auth.service";
import { Customer } from "../models/customer.model";
import { AccountService } from "../services/account.service";
import { ShippingCostsService } from "../services/shippingcosts.service";
import { ReturnRequestService } from "../services/return-request.service";
import { ReturnRequest } from "../models/return-request.model";
 
@Component({
    selector: "app-order-history",
    styleUrls: ["./order-history.component.scss"],
    templateUrl: "./order-history.component.html",
})
export class OrderHistoryComponent implements OnInit {
    customer: Customer | undefined;
    selectedOrder: Order | null = null;
    reason: string = "";
    productDetails: string = "";
    preferredHandling: string = "refund";
    showReturnForm: boolean = false;
    orderList: Order[] = [];
    returnedOrders: Order[] = [];
    shippingCosts: number;
    notificationVisible: boolean = false;
 
    constructor(
        private orderService: OrderService,
        private authService: AuthService,
        private accountService: AccountService,
        private shippingCostsService: ShippingCostsService,
        private returnRequestService: ReturnRequestService
    ) {
        this.shippingCosts = this.shippingCostsService.getShippingCosts();
    }
 
    ngOnInit() {
        this.loadOrders();
        this.loadCustomer();
    }
 
    loadOrders() {
        this.orderService.getOrders().subscribe((orders: Order[]) => {
            this.orderList = orders.filter(order => !this.returnedOrders.some(returnedOrder => returnedOrder.id === order.id));
            this.returnedOrders = orders.filter(order => this.returnedOrders.some(returnedOrder => returnedOrder.id === order.id));
        });
    }
 
    loadCustomer() {
        this.accountService.getCustomer().subscribe((customer: Customer) => {
            this.customer = customer;
        });
    }
 
    openReturnForm(order: Order) {
        this.selectedOrder = order;
        if (!this.selectedOrder || !this.selectedOrder.products) {
            console.error("Selected order or its products are undefined");
            return;
        }
        this.productDetails = this.selectedOrder.products.map(product => `${product.brand} ${product.name}`).join(", ");
        this.reason = "";
        this.preferredHandling = "refund";
        this.showReturnForm = true;
    }
 
    closeReturnForm() {
        this.selectedOrder = null;
        this.showReturnForm = false;
    }
 
    submitReturnRequest() {
        if (this.selectedOrder && this.selectedOrder.id && this.customer && this.customer.id) {
            const returnRequest: ReturnRequest = {
                customerId: this.customer.id,
                orderId: this.selectedOrder.id.toString(),
                reason: this.reason,
                preferredHandling: this.preferredHandling,
            };
 
            this.returnRequestService.createReturnRequest(returnRequest).subscribe((response) => {
                console.log("Return request created successfully", response);
                this.closeReturnForm(); // Close modal after successful submission
                this.loadOrders(); // Reload orders after return request submission
                this.showNotification(); // Show success notification
            });
        }
    }
 
    showNotification() {
        this.notificationVisible = true;
        setTimeout(() => {
            this.notificationVisible = false;
        }, 5000); // Hide notification after 5 seconds
    }
}