import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-removecoupon',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './removecoupon.component.html',
  styleUrl: './removecoupon.component.scss'
})
export class RemovecouponComponent implements OnInit{

  titleForm: FormGroup;
  activeSection: string | null = null;

  constructor(private fb: FormBuilder, private couponService: CouponService) { }

  ngOnInit(){
  this.titleForm = this.fb.group({
    deleteTitle: ['', Validators.required]
  })
  }

  deleteCoupon() {
    const title = this.titleForm.get('deleteTitle')?.value;

    if (title) {
      this.couponService.getCouponByTitle(title).pipe(
        switchMap(coupon => {
          if (coupon) {
            const couponTitle = coupon.title;
            const confirmation = window.confirm('Are you sure you want to delete this coupon?');
            if (confirmation) {
              return this.couponService.deleteCoupon(couponTitle).pipe(
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
        } else {
          alert(response.message);
        }
      });
    }
  }

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}

