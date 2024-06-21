import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { CouponService } from '../services/coupon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit {

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
