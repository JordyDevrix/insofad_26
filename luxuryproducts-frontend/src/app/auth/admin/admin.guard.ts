import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return true;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.$userIsLoggedIn) {
      return true;
    } else {
      // Redirect to login page or unauthorized page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
