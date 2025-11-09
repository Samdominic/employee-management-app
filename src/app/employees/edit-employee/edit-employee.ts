import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Employee, EmployeeService } from '../../services/employee.service';
import { catchError, delay, firstValueFrom, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingDialog } from '../../shared/dialogs/loading-dialog/loading-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  imports: [EmployeeForm, MatCard, MatToolbar, MatCardContent, MatIcon, MatButton,
    MatMiniFabButton, RouterLink, MatIconButton],
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
  private dialog = inject(MatDialog);

  employee = signal<Employee | null>(null);
  employeeForm: FormGroup | null = null;
  errorMessage = signal('');

  constructor() {
    this.employeeService.getEmployeeById(this.route.snapshot.params['id']).pipe(
      takeUntilDestroyed(),
      catchError(() => {
        this.errorMessage.set('Employee details not found');
        return of(null);
      }),
      tap((employee) => {
        this.employee.set(employee);
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
      const employeeData: Omit<Employee, 'id'> = {
        name: this.employeeForm?.value.name.trim(),
        department: this.employeeForm?.value.department,
        joiningDate: this.employeeForm?.value.joiningDate,
        salary: this.employeeForm?.value.salary
      };

      this.dialog.open(LoadingDialog, {
        disableClose: false,
        data: { message: 'Updating employee details...' }
      });
      await firstValueFrom(of(null).pipe(delay(1000))); //delay for dialog to show loading
      await firstValueFrom(this.employeeService.updateEmployee(this.route.snapshot.params['id'], employeeData));
      this.snackBar.open('Employee details updated successfully', 'Close', { duration: 3000 });
      this.router.navigate(['/employees']);
    } catch (error) {
      this.errorMessage.set('Failed to update employee details. Please try again.');
    } finally {
      this.dialog.closeAll();
    }
  }
}
