import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNearbyComponent } from './make-nearby.component';

describe('MakeNearbyComponent', () => {
  let component: MakeNearbyComponent;
  let fixture: ComponentFixture<MakeNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeNearbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
