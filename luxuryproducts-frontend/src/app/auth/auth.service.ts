import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest } from './auth-request.model';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginEndpoint: string =  environment.base_url + '/auth/login';
  private _registerEndpoint: string = environment.base_url + '/auth/register';
  private getUser: string = environment.base_url + '/auth';
  private getAdmin: boolean = false;

  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  private currentUserRoleSubject: BehaviorSubject<string>;
  public currentUserRole: Observable<string>;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.isValid()) {
      this.$userIsLoggedIn.next(true);
      this.checkCurrentUser();
      this.currentUserRoleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || 'USER');
      this.currentUserRole = this.currentUserRoleSubject.asObservable();
    }
  }


  public login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this._loginEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          localStorage.setItem('currentUser', JSON.stringify(authResponse.email));
          this.$userIsLoggedIn.next(true);
          this.currentUser.next(authResponse.email);
        })
      );
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this._registerEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          localStorage.setItem('currentUser', JSON.stringify(authResponse.email));
          this.$userIsLoggedIn.next(true);
        })
      );
  }

  public logOut(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('currentUser');
    this.$userIsLoggedIn.next(false);
  }

  private checkCurrentUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
      this.$userIsLoggedIn.next(true);
    } else {
      this.currentUser.next(null);
      this.$userIsLoggedIn.next(false);
    }
  }

  public getCurrentUser(): Observable<Customer> {
    return this.http.get<Customer>(this.getUser)
  }

  // Call this method when the user logs in
  setUserRole(role: string) {
    localStorage.setItem('userRole', role);
    this.currentUserRoleSubject.next(role);
  }

  // Call this method when the user logs out
  clearUserRole() {
    localStorage.removeItem('userRole');
    this.currentUserRoleSubject.next('USER');
  }

  // Method to check if the current user is an admin
  // isAdmin(): boolean {
  //   if (this.currentUserRoleSubject) {
  //     return this.currentUserRoleSubject.value === 'ADMIN';
  //   } 
  //   else {
  //    this.currentUserRole = this.setUserRole;
  //   } 
    
    
  
}
