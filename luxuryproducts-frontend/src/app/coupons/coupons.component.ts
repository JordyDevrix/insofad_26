import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { Coupon } from '../models/coupon.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})

export class CouponsComponent implements OnInit{

  coupons: Coupon[] = [];

  constructor(private couponService: CouponService){}

  ngOnInit(): void {
    this.couponService.getAllCoupons().subscribe(
      (data: Coupon[]) => {
      this.coupons = data;
      },
      error => {
        console.error('Could not collect all coupons.', error);
      }
    )
  }

    
}
