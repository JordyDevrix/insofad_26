import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-changecoupon',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './changecoupon.component.html',
  styleUrl: './changecoupon.component.scss'
})
export class ChangecouponComponent {

  titleForm: FormGroup;
  activeSection: string | null = null;

  constructor(private fb: FormBuilder, private couponService: CouponService) { }

  ngOnInit(){
    this.titleForm = this.fb.group({
      changeTitle: ['', Validators.required]
    })
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

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
