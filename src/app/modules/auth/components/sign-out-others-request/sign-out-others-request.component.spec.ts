import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutOthersRequestComponent } from './sign-out-others-request.component';

describe('SignOutOthersRequestComponent', () => {
  let component: SignOutOthersRequestComponent;
  let fixture: ComponentFixture<SignOutOthersRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignOutOthersRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutOthersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
