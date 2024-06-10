import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AdminComponent } from '../auth/admin/admin.component';
import { CartComponent } from '../cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private httpClient : HttpClient) { }  

  private coupon : Coupon;
  totalPrice : number;
  newTotal : number;
  message : string;

  private mainURL = 'http://localhost:8080/api/coupons';

  public getAllCoupons():Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>(`${this.mainURL}/getAllCoupons`)
  }

  public createCoupon(coupon: Coupon): Observable<{message:string}>{
    return this.httpClient.post<{message: string}>(`${this.mainURL}/createCoupon`, coupon,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getAllCouponsPercentage(){
    const type: String = "percentage";
    return this.httpClient.get<Coupon[]>(`http://localhost:8080/api/getAllCouponsWhereTypeIs`+ type)
  }

  public getAllCouponsFlatAmount(){
    const type: String = "flatAmount";
    return this.httpClient.get<Coupon[]>(`http://localhost:8080/api/getAllCouponsWhereTypeIs`+ type)
  }

  public applyCoupon(title:string, couponPrice: number): Observable<{newTotal : number, message: string}>{
    couponPrice = this.coupon.price;
    return this.httpClient.post<{ newTotal: number, message: string }>(`${this.mainURL}/applyCoupon`, { title, couponPrice },
      {
        headers: {
          'Content-Type': 'application/json'
      }
    })   
  }
}
