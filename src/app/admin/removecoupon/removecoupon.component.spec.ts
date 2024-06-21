import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovecouponComponent } from './removecoupon.component';

describe('RemovecouponComponent', () => {
  let component: RemovecouponComponent;
  let fixture: ComponentFixture<RemovecouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovecouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemovecouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
