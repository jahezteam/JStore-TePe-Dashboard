import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMainCategorysComponent } from './filter-mainCategory.component';

describe('FilterMainCategorysComponent', () => {
  let component: FilterMainCategorysComponent;
  let fixture: ComponentFixture<FilterMainCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterMainCategorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMainCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
