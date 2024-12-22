import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionsTitleComponent } from './add-questions-title.component';

describe('AddQuestionsTitleComponent', () => {
  let component: AddQuestionsTitleComponent;
  let fixture: ComponentFixture<AddQuestionsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionsTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuestionsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
