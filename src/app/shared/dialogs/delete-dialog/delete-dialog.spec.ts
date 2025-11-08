import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogue } from './delete-dialog';

describe('DeleteDialogue', () => {
  let component: DeleteDialogue;
  let fixture: ComponentFixture<DeleteDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
