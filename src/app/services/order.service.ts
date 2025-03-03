import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = environment.base_url + "/orders";
  products: Product[] = [];
  private finalTotalPrice: number = 0;

  constructor(private http: HttpClient) {}

  public placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order)
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl)
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + "/all")
  }

  setFinalTotalPrice(price: number): void {
    this.finalTotalPrice = price;
  }

  getFinalTotalPrice(): number {
    return this.finalTotalPrice;
  }
}
