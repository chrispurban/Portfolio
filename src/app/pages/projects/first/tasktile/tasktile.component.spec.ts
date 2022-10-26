import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktileComponent } from './tasktile.component';

describe('TasktileComponent', () => {
  let component: TasktileComponent;
  let fixture: ComponentFixture<TasktileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasktileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasktileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
