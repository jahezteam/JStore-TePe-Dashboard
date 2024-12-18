import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSliderComponent } from './about-slider.component';

describe('AboutSliderComponent', () => {
  let component: AboutSliderComponent;
  let fixture: ComponentFixture<AboutSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
