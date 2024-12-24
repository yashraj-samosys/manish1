import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetRefferalsComponent } from './meet-refferals.component';

describe('MeetRefferalsComponent', () => {
  let component: MeetRefferalsComponent;
  let fixture: ComponentFixture<MeetRefferalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetRefferalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetRefferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
