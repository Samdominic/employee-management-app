import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeleteDialogue } from './employee-delete-dialogue';

describe('EmployeeDeleteDialogue', () => {
  let component: EmployeeDeleteDialogue;
  let fixture: ComponentFixture<EmployeeDeleteDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDeleteDialogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDeleteDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
