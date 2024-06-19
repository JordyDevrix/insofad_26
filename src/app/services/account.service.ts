import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Customer } from "../models/customer.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private baseUrl: string = environment.base_url + "/account";
    products: Customer[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {}

    public getCustomer(): Observable<Customer> {
        const token = "Bearer " + this.authService.getToken();
        if (!token) {
            throw new Error('Authentication token not found');
        }
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.get<Customer>(this.baseUrl, { headers });
    }

    // public getOrders(): Observable<Customer[]> {
    //     return this.http.get<Customer[]>(this.baseUrl)
    // }
}
