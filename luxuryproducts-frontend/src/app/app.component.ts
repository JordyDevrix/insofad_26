import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { ProductsModule } from './products/products.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsModule, NavigationComponent, FooterComponent, AuthModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit() {
    // this.isAdmin = this.authService.isAdmin();

    this.authService.currentUserRole.subscribe(role => {
      this.isAdmin = role === "ADMIN";
    })
  }
}
