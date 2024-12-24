import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFeatureQuantityComponent } from './add-product-feature-quantity.component';

describe('AddProductFeatureQuntityComponent', () => {
  let component: AddProductFeatureQuantityComponent;
  let fixture: ComponentFixture<AddProductFeatureQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductFeatureQuantityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductFeatureQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
