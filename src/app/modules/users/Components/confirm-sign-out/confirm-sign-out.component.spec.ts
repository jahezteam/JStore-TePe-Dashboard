import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSignOutComponent } from './confirm-sign-out.component';

describe('ConfirmSignOutComponent', () => {
  let component: ConfirmSignOutComponent;
  let fixture: ComponentFixture<ConfirmSignOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSignOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
