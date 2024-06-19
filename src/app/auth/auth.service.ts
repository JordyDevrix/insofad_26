import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest } from './auth-request.model';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { AccountService } from "../services/account.service";
import {authGuard} from "./auth.guard";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginEndpoint: string =  environment.base_url + '/account/login';
  private _registerEndpoint: string = environment.base_url + '/account/register';
  private getUser: string = environment.base_url + '/account'

  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.isValid()) {
      this.$userIsLoggedIn.next(true);
      this.checkCurrentUser();
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

  public getToken(): string | null {
    return this.tokenService.loadToken();
  }
}
