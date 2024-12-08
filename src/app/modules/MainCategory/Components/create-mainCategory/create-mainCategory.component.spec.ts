import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainCategoryComponent } from './create-mainCategory.component';

describe('CreateMainCategoryComponent', () => {
  let component: CreateMainCategoryComponent;
  let fixture: ComponentFixture<CreateMainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMainCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
