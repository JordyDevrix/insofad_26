import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from '../../models/coupon.model';
import { catchError, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcoupon',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './addcoupon.component.html',
  styleUrl: './addcoupon.component.scss'
})
export class AddcouponComponent implements OnInit{

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
          },
          error => {
            console.error('Could not create coupon.', error);
          }
        );
      } else {
        console.error('Form is invalid');
      }
    }
  
    stopPropagation(event: Event) {
      event.stopPropagation();
    }

}

