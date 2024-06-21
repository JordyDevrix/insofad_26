import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReturnRequest } from '../models/return-request.model';
 
@Injectable({
  providedIn: 'root'
})
export class ReturnRequestService {
  private baseUrl: string = `${environment.base_url}/returns`;
 
  constructor(private http: HttpClient) {}
 
  createReturnRequest(request: ReturnRequest): Observable<ReturnRequest> {
    return this.http.post<ReturnRequest>(this.baseUrl, request);
  }

  getReturnRequestsByCustomerId(customerId: string): Observable<ReturnRequest[]> {
    return this.http.get<ReturnRequest[]>(`${this.baseUrl}/customer/${customerId}`);
  }
 
  getReturnRequestsByOrderId(orderId: string): Observable<ReturnRequest[]> {
    return this.http.get<ReturnRequest[]>(`${this.baseUrl}/order/${orderId}`);
  }
}