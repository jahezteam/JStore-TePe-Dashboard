import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListMultiSelectComponent } from './pick-list-multi-select.component';

describe('PickListMultiSelectComponent', () => {
  let component: PickListMultiSelectComponent;
  let fixture: ComponentFixture<PickListMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickListMultiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickListMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
