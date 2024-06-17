import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from '../../models/coupon.model';
import { CouponType } from '../../models/coupontype.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { CouponsComponent } from '../../coupons/coupons.component';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent implements OnInit {
  couponForm: FormGroup;
  titleForm: FormGroup;
  activeSection: string | null = null;

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

    this.titleForm = this.fb.group({
      changeTitle: ['', Validators.required],
      deleteTitle: ['', Validators.required]
    })

  } 

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
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

  updateCoupon(): void {
    const title = this.titleForm.get('changeTitle')?.value;

    if (title) {
      this.couponService.getCouponByTitle(title).pipe(
        switchMap(coupon => {
          if (coupon) {
            const updatedStatus = !coupon.status;
            console.log(`Updating coupon with title ${title} to status ${updatedStatus}`);
            return this.couponService.updateCoupon(title, updatedStatus).pipe(
              map(() => ({ success: true, message: `Coupon status changed to ${updatedStatus}` })),
              catchError(err => {
                console.error('Error updating coupon status:', err);
                return  of({ success: false, message: 'Failed to update coupon status' })})
            );
          } else {
            return of({ success: false, message: 'Coupon not found' });
          }
      
        })
      ).subscribe(response => {
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      });
    }
  }

  deleteCoupon() {
    const title = this.titleForm.get('deleteTitle')?.value;

    if (title) {
      this.couponService.getCouponByTitle(title).pipe(
        switchMap(coupon => {
          if (coupon) {
            const couponId = coupon.id; // Assuming the coupon object has an id property
            const confirmation = window.confirm('Are you sure you want to delete this coupon?');
            if (confirmation) {
              return this.couponService.deleteCoupon(couponId).pipe(
                map(() => ({ success: true, message: 'Coupon deleted successfully' })),
                catchError(err => of({ success: false, message: 'Failed to delete coupon' }))
              );
            } else {
              return of({ success: false, message: 'Coupon deletion cancelled' });
            }
          } else {
            return of({ success: false, message: 'Coupon not found' });
          }
        })
      ).subscribe(response => {
        if (response.success) {
          alert(response.message);
          // Optionally, refresh the list of coupons here
        } else {
          alert(response.message);
        }
      });
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}