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

  public getAllCoupons():Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>("http://localhost:8080/main/getAllCoupons/", {withCredentials:true})
  }

  public getAllCouponsPercentage(){
    const type: String = "percentage";
    return this.httpClient.get<Coupon[]>("http://localhost:8080/main/getAllCouponsWhereTypeIs/"+ type, {withCredentials:true})
  }

  public getAllCouponsFlatAmount(){
    const type: String = "flatAmount";
    return this.httpClient.get<Coupon[]>("http://localhost:8080/main/getAllCouponsWhereTypeIs/"+ type, {withCredentials:true})
  }

  public getAllCouponsEenPlusEen(){
    const type: String = "eenPlusEen";
    return this.httpClient.get<Coupon[]>("http://localhost:8080/main/getAllCouponsWhereTypeIs/"+ type, {withCredentials:true})
  }
}
