import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";
import { Order } from "../models/order.model";
import { AuthService } from "../auth/auth.service";
import { CurrencyPipe } from "@angular/common";
import { Customer } from "../models/customer.model";
import { AccountService } from "../services/account.service";
import { ShippingCostsService } from "../services/shippingcosts.service";
import { ReturnRequestService } from "../services/return-request.service";
import { ReturnRequest } from "../models/return-request.model";

declare var bootstrap: any;

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
  customerReturns: ReturnRequest[] = [];

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
    this.accountService.getCustomer().subscribe((customer: Customer) => {
      this.customer = customer;
      console.log(this.customer);
      this.loadCustomerReturns(customer.id);
      this.loadOrders();
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orderList = orders.filter(order => 
        !this.customerReturns.some(returnRequest => returnRequest.orderId === (order.id ?? ""))
      );
      this.returnedOrders = orders.filter(order => 
        this.customerReturns.some(returnRequest => returnRequest.orderId === (order.id ?? ""))
      );
      console.log("Orders loaded:", this.orderList);
      console.log("Returned Orders loaded:", this.returnedOrders);
    });
  }

  loadCustomerReturns(id: string) {
    this.returnRequestService
      .getReturnRequestsByCustomerId(id)
      .subscribe((returns) => {
        this.customerReturns = returns;
        console.log("Customer returns loaded:", this.customerReturns);
      });
  }

  openReturnForm(order: Order) {
    this.selectedOrder = order;
    console.log("selectedOrder" + this.selectedOrder);
    this.productDetails = this.selectedOrder.products
      .map((product) => product.name)
      .join(", ");

    this.reason = "";
    this.preferredHandling = "refund";
    this.showReturnForm = true;
  }

  closeReturnForm() {
    const modalElement = document.getElementById('returnModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    }
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

      this.returnRequestService
        .createReturnRequest(returnRequest)
        .subscribe((response) => {
          console.log("Return request created successfully", response);

          this.closeReturnForm(); // Close modal after successful submission
          this.loadOrders(); // Reload orders after return request submission
          this.showConfirmation();
        });
    }
  }

  showConfirmation() {
    console.log("in confirmation");
    alert("Request submitted, confirmation has been sent to your email");
  }
}
