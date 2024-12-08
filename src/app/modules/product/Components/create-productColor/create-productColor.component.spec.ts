import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductColorComponent } from './create-productColor.component';

describe('CreateProductColorComponent', () => {
  let component: CreateProductColorComponent;
  let fixture: ComponentFixture<CreateProductColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
