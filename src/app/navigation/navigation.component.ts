import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

import {CartService} from '../services/cart.service';
import {Product} from '../models/product.model';
import {CommonModule, DOCUMENT} from '@angular/common';
import {AuthService} from '../auth/auth.service';
import {OrderProduct} from "../models/orderproduct.model";
import {AccountService} from "../services/account.service";
import {Customer} from "../models/customer.model";

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
    public amountOfProducts: number = 0;
    public userIsLoggedIn: boolean = false;
    public customer: Customer;
    public admin: string;
    userClass = "dropdown-menu dropdown-menu-end"

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private router: Router,
        private accountService: AccountService,
    ) {}

    ngOnInit() {
        this.cartService.$productInCart.subscribe((products: OrderProduct[]) => {
            this.accountService.getCustomer().subscribe((customer: Customer) => {
                this.customer = customer;
                this.admin = this.customer.role;
                console.log(this.customer.role);
            });
            this.amountOfProducts = products.length;
            this.checkLoginState();
        })
    }

    public checkLoginState() {
        this.authService
            .$userIsLoggedIn
            .subscribe((loginState: boolean) => {
                this.userIsLoggedIn = loginState;
            });
    }

    public onLogout() {
        this.authService.logOut();
        this.router.navigate(['/']).then(r => window.location.reload());
    }

    onToggleMenu() {
        if (this.userClass == "dropdown-menu dropdown-menu-end") {
            this.userClass = "dropdown-menu dropdown-menu-start"
        } else {
            this.userClass = "dropdown-menu dropdown-menu-end"
        }
    }
}
