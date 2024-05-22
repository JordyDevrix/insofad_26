import { CouponType } from "./coupontype.model";

export class Coupon {

id: number;
title: string;
message: string;
amount: number;
price: number;
startDate: Date;
endDate: Date;
type: CouponType;
status: string;


constructor(id: number, title: string, message: string, amount : number, price : number, startDate : Date, endDate : Date, type : CouponType, status: string){
    this.id = id;
    this.title = title;
    this.message = message;
    this.amount = amount;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    }
}