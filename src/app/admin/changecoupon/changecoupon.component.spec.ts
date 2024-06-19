import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecouponComponent } from './changecoupon.component';

describe('ChangecouponComponent', () => {
  let component: ChangecouponComponent;
  let fixture: ComponentFixture<ChangecouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangecouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangecouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
