import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminViewComponent } from './sub-admin-view.component';

describe('SubAdminViewComponent', () => {
  let component: SubAdminViewComponent;
  let fixture: ComponentFixture<SubAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdminViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
