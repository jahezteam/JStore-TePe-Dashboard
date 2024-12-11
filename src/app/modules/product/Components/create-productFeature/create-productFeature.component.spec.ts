import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductFeatureComponent } from './create-productFeature.component';

describe('CreateProductColorComponent', () => {
  let component: CreateProductFeatureComponent;
  let fixture: ComponentFixture<CreateProductFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
