import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCouponsComponent } from './filter-coupons.component';

describe('FilterCouponsComponent', () => {
  let component: FilterCouponsComponent;
  let fixture: ComponentFixture<FilterCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
