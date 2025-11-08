import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Employee, EmployeeService } from '../../services/employee.service';
import { firstValueFrom, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-employee',
  imports: [EmployeeForm, MatCard, MatToolbar, MatCardContent, MatIcon, MatButton,
    MatMiniFabButton, RouterLink, MatProgressSpinner],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEmployee {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  employee = signal<Employee | null>(null);
  employeeForm: FormGroup | null = null;
  errorMessage = signal('');
  isSaving = signal(false);

  constructor() {
    this.employeeService.getEmployeeById(this.route.snapshot.params['id']).pipe(
      takeUntilDestroyed(),
      tap((employee) => {
        this.employee.set(employee);
        if (!employee) {
          this.router.navigate(['/employees']);
        }
      })
    ).subscribe()
  }

  onFormReady(form: FormGroup) {
    this.employeeForm = form;
    this.cdr.markForCheck();
  }

  clearError() {
    this.errorMessage.set('');
  }

  async saveEmployee() {
    if (this.employeeForm?.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    try {
      this.errorMessage.set('');
      this.isSaving.set(true);
      const employeeData = this.employeeForm?.value;
      await firstValueFrom(this.employeeService.updateEmployee(this.route.snapshot.params['id'], employeeData));
      this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
      // this.router.navigate(['/employees']);
    } catch (error) {
      this.errorMessage.set('Failed to add employee');
    } finally {
      setTimeout(() => {

        this.isSaving.set(false);
      }, 3000);
    }
  }
}
