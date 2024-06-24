import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AdminComponent } from '../admin/admin.component';
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

  public applyCoupon(title: string, totalPrice: number): Observable<{ newTotal: number, discount: number, message: string }> {
    return this.httpClient.post<{ newTotal: number, discount: number, message: string }>(`${this.mainURL}/applyCoupon`, 
      { 
        title: title, 
        totalPrice: totalPrice 
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

}

getCouponByTitle(title: string): Observable<any> {
  return this.httpClient.get<any>(`${this.mainURL}/getByTitle/${title}`);
}

updateCoupon(title: string, status: boolean): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.httpClient.put<any>(
    `${this.mainURL}/updateCoupon/${title}`,
    { status },
    { headers }
  );
}

deleteCoupon(title: string): Observable<any> {
  return this.httpClient.delete<any>(`${this.mainURL}/${title}`);
}

getTotalPrice(cartProducts: any[], shippingCosts: number, coupon?: any): number {
  let couponCosts = coupon ? coupon.price : 0;
  let productsPrice = cartProducts.reduce((acc, curr) => acc + curr.productProperties.price, 0);

  if (coupon) {
    if (coupon.type === "%") {
      couponCosts = (productsPrice * coupon.price) / 100;
    } else if (coupon.type === "$") {
      couponCosts = coupon.price;
    }
  }

  let totalPrice = productsPrice + shippingCosts;
  if (isNaN(totalPrice)) {
    console.error("Total price calculation resulted in NaN");
    return 0;
  }

  return totalPrice;
}

}
