import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRolesComponent } from './filter-roles.component';

describe('FilterRolesComponent', () => {
  let component: FilterRolesComponent;
  let fixture: ComponentFixture<FilterRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
