import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtorRegistrationComponent } from './realtor-registration.component';

describe('RealtorRegistrationComponent', () => {
  let component: RealtorRegistrationComponent;
  let fixture: ComponentFixture<RealtorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
