import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from '../../models/coupon.model';
import { CouponType } from '../../models/coupontype.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { CouponsComponent } from '../../coupons/coupons.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent implements OnInit {
  couponForm: FormGroup;

  constructor(private fb: FormBuilder, private couponService: CouponService) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required]
    });
  } 

  onSubmit(){
    if (this.couponForm.valid) {
      const formValues = this.couponForm.value;
      const newCoupon: Coupon = {
        title: formValues.title,
        message: formValues.message,
        amount: formValues.amount,
        price: formValues.price,
        startDate: new Date(formValues.startDate),
        endDate: new Date(formValues.endDate),
        type: formValues.type,
        status: formValues.status
      };

      this.couponService.createCoupon(newCoupon).subscribe(
        response => {
          console.log(response.message);
          // Handle successful creation, e.g., display a success message or reset the form
        },
        error => {
          console.error('Could not create coupon.', error);
          // Handle error, e.g., display an error message
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
//   resetForm() {
//     this.coupon = {
//       title: '',
//       message: '',
//       amount: 0,
//       price: 0,
//       startDate: this.startDate,
//       endDate: this.endDate,
//       type: new CouponType,
//       status: ''
//     };
//   }
// }