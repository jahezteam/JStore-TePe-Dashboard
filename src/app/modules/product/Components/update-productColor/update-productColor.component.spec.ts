import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductColorComponent } from './update-productColor.component';

describe('UpdateProductColorComponent', () => {
  let component: UpdateProductColorComponent;
  let fixture: ComponentFixture<UpdateProductColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
