import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeatureTitleComponent } from './add-feature-title.component';

describe('AddFeatureTitleComponent', () => {
  let component: AddFeatureTitleComponent;
  let fixture: ComponentFixture<AddFeatureTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeatureTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFeatureTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
