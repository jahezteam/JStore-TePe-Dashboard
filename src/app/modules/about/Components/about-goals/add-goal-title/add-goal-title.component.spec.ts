import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalTitleComponent } from './add-goal-title.component';

describe('AddGoalTitleComponent', () => {
  let component: AddGoalTitleComponent;
  let fixture: ComponentFixture<AddGoalTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoalTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGoalTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
