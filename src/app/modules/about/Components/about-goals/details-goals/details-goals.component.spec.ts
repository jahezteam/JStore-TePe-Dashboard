import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGoalsComponent } from './details-goals.component';

describe('DetailsGoalsComponent', () => {
  let component: DetailsGoalsComponent;
  let fixture: ComponentFixture<DetailsGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
