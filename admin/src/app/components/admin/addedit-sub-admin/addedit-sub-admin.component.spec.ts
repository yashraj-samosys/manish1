import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditSubAdminComponent } from './addedit-sub-admin.component';

describe('AddeditSubAdminComponent', () => {
  let component: AddeditSubAdminComponent;
  let fixture: ComponentFixture<AddeditSubAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditSubAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditSubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
