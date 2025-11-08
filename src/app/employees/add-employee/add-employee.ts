import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-employee',
  imports: [EmployeeForm, MatCard, MatToolbar, MatCardContent, MatIcon, MatButton,
    MatMiniFabButton, RouterLink, MatProgressSpinner, MatIconButton],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployee {
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  employeeForm: FormGroup | null = null;
  errorMessage = signal('');
  isAdding = signal(false);

  onFormReady(form: FormGroup) {
    this.employeeForm = form;
    this.cdr.markForCheck();
  }

  clearError() {
    this.errorMessage.set('');
  }

  async addEmployee() {
    if (this.employeeForm?.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    try {
      this.errorMessage.set('');
      this.isAdding.set(true);
      const newEmployee = this.employeeForm?.value;
      await firstValueFrom(this.employeeService.addEmployee(newEmployee));
      this.snackBar.open('Employee added successfully', 'Close', { duration: 3000 });
      this.router.navigate(['/employees']);
    } catch (error) {
      this.errorMessage.set('Failed to add employee');
    } finally {
      this.isAdding.set(false);
    }
  }
}
