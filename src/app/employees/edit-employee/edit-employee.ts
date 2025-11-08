import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  imports: [EmployeeForm, MatCard, MatToolbar, MatCardContent, MatIcon, MatButton,
    MatMiniFabButton, RouterLink],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEmployee {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);

  employeeForm: FormGroup | null = null;

  onFormReady(form: FormGroup) {
    this.employeeForm = form;
    this.cdr.markForCheck();
  }
}
