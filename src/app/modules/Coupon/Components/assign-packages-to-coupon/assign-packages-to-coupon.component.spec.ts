import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPackagesToCouponComponent } from './assign-packages-to-coupon.component';

describe('AssignPackagesToCouponComponent', () => {
  let component: AssignPackagesToCouponComponent;
  let fixture: ComponentFixture<AssignPackagesToCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPackagesToCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPackagesToCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
