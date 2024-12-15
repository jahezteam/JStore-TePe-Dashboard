import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureDetailsComponent } from './product-feature-details.component';

describe('ProductFeatureDetailsComponent', () => {
  let component: ProductFeatureDetailsComponent;
  let fixture: ComponentFixture<ProductFeatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFeatureDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
