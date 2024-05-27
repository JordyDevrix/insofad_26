import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

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
  private adminPrivileges : boolean = false;
  userClass = "dropdown-menu dropdown-menu-end"

  constructor(private cartService: CartService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
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
    this.authService.clearUserRole();
    this.router.navigate(['/'])
  }

  onToggleMenu() {
    if (this.userClass == "dropdown-menu dropdown-menu-end") {
      this.userClass = "dropdown-menu dropdown-menu-start"
    } else {
      this.userClass = "dropdown-menu dropdown-menu-end"
    }
  }
}
