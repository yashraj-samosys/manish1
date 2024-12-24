import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubagentAccountRequestComponent } from './subagent-account-request.component';

describe('SubagentAccountRequestComponent', () => {
  let component: SubagentAccountRequestComponent;
  let fixture: ComponentFixture<SubagentAccountRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubagentAccountRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubagentAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
