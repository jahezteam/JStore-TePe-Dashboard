import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePackagesFromCouponComponent } from './remove-packages-from-coupon.component';

describe('RemovePackagesFromCouponComponent', () => {
  let component: RemovePackagesFromCouponComponent;
  let fixture: ComponentFixture<RemovePackagesFromCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePackagesFromCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePackagesFromCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
