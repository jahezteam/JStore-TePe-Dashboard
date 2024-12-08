import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaComponentComponent } from './text-area-component.component';

describe('TextAreaComponentComponent', () => {
  let component: TextAreaComponentComponent;
  let fixture: ComponentFixture<TextAreaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
