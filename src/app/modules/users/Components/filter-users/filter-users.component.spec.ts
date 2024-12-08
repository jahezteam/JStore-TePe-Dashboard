import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUsersComponent } from './filter-users.component';

describe('FilterUsersComponent', () => {
  let component: FilterUsersComponent;
  let fixture: ComponentFixture<FilterUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
