import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductFeatureComponent } from './update-productFeature.component';

describe('UpdateProductColorComponent', () => {
  let component: UpdateProductFeatureComponent;
  let fixture: ComponentFixture<UpdateProductFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProductFeatureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
