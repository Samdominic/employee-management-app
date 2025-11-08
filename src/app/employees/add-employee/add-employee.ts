import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [EmployeeForm, MatCard, MatToolbar, MatCardContent, MatIcon, MatButton,
    MatMiniFabButton, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployee {
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  employeeForm: FormGroup | null = null;

  onFormReady(form: FormGroup) {
    this.employeeForm = form;
    this.cdr.markForCheck();
  }

  addEmployee() {
    if (this.employeeForm?.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const newEmployee = this.employeeForm?.value;
    this.employeeService.addEmployee(newEmployee).subscribe()
  }
}
