import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListComponentComponent } from './pick-list-component.component';

describe('PickListComponentComponent', () => {
  let component: PickListComponentComponent;
  let fixture: ComponentFixture<PickListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
