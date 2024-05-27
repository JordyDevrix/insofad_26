import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private httpClient : HttpClient) { }  

  private coupon : Coupon;
  private mainURL = 'http://localhost:8080/api';

  public getAllCoupons():Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>(`${this.mainURL}/getAllCoupons`)
  }

  public createCoupon(coupon: Coupon): Observable<Coupon>{
    return this.httpClient.post<Coupon>(`${this.mainURL}/createCoupon`, coupon);
  }

  public getAllCouponsPercentage(){
    const type: String = "percentage";
    return this.httpClient.get<Coupon[]>(`http://localhost:8080/api/getAllCouponsWhereTypeIs`+ type, {withCredentials:true})
  }

  public getAllCouponsFlatAmount(){
    const type: String = "flatAmount";
    return this.httpClient.get<Coupon[]>(`http://localhost:8080/api/getAllCouponsWhereTypeIs`+ type, {withCredentials:true})
  }

  public submitCoupon(){

  }

}
