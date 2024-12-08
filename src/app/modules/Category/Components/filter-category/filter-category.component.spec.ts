import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategorysComponent } from './filter-category.component';

describe('FilterCategorysComponent', () => {
  let component: FilterCategorysComponent;
  let fixture: ComponentFixture<FilterCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCategorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
