import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskentryComponent } from './taskentry.component';

describe('TaskentryComponent', () => {
  let component: TaskentryComponent;
  let fixture: ComponentFixture<TaskentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
