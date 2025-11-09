import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Employee, EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, firstValueFrom, of } from 'rxjs';
import { LoadingDialog } from '../../shared/dialogs/loading-dialog/loading-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  imports: [EmployeeForm, MatCard, MatToolbar, MatCardContent, MatIcon, MatButton,
    MatMiniFabButton, RouterLink, MatIconButton],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployee {
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  employeeForm: FormGroup | null = null;
  errorMessage = signal('');

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
      const employeeData: Omit<Employee, 'id'> = {
        name: this.employeeForm?.value.name.trim(),
        department: this.employeeForm?.value.department,
        joiningDate: this.employeeForm?.value.joiningDate,
        salary: this.employeeForm?.value.salary
      };

      this.dialog.open(LoadingDialog, {
        disableClose: false,
        data: { message: 'Adding new employee details...' }
      });
      await firstValueFrom(of(null).pipe(delay(1000))); //delay for dialog to show loading
      await firstValueFrom(this.employeeService.addEmployee(employeeData));
      this.snackBar.open('Employee details added successfully', 'Close', { duration: 3000 });
      this.router.navigate(['/employees']);
    } catch (error) {
      this.errorMessage.set('Failed to add employee details. Please try again.');
    } finally {
      this.dialog.closeAll();
    }
  }
}
