import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Employee, EmployeeService } from '../../services/employee.service';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDeleteDialogue } from '../employee-delete-dialogue/employee-delete-dialogue';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, MatIconButton, MatButton, MatIcon, MatCard, MatCardContent, MatTableModule,
    MatSortHeader, MatSort, CurrencyPipe, RouterLink, FormsModule, MatToolbar, MatProgressSpinner],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeList {
  private employeeService = inject(EmployeeService);
  readonly dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  private readonly employees = signal<Employee[]>([]);
  filteredEmployees = computed(() => this.sortAndFilterEmployees())
  showLoading = signal(true);
  private sortDirection = signal<'asc' | 'desc' | ''>('');
  displayedColumns = ['id', 'name', 'department', 'salary', 'actions'];
  searchTerm = signal('');
  errorMessage = signal<string | null>(null);

  constructor() {
    this.employeeService.getEmployees().pipe(
      takeUntilDestroyed(),
      catchError((error) => {
        this.errorMessage.set('Failed to load employees');
        this.showLoading.set(false);
        return [];
      }),
      tap((employees) => {
        this.employees.set([...(employees ?? [])]);
      }),
      finalize((() => { this.showLoading.set(false); }))
    ).subscribe();
  }

  clearSearch() {
    this.searchTerm.set('');
  }

  onSortChange(sortState: Sort) {
    const { direction } = sortState;
    this.sortDirection.set(direction);
  }


  private sortAndFilterEmployees() {
    const filteredEmployees = this.filterEmployeesBySearchTerm();
    const sortedEmployees = this.sortEmployees(filteredEmployees);
    return [...sortedEmployees];
  }

  private filterEmployeesBySearchTerm(): Employee[] {
    const filteredEmployees = this.employees().filter((e) => {
      const name = e.name.toLowerCase();
      const department = e.department.toLowerCase();
      const searchTerm = this.searchTerm().toLowerCase();
      return name.includes(searchTerm) || department.includes(searchTerm);
    });
    return filteredEmployees;
  }

  private sortEmployees(employees: Employee[]): Employee[] {
    if (!this.sortDirection()) {
      employees = [...employees];
      return employees;
    }

    const sortedEmployees = [...employees].sort((a, b) => {
      if (this.sortDirection() === 'asc') {
        return a.salary - b.salary
      }
      return b.salary - a.salary
    });

    return sortedEmployees;
  }

  openDeleteDialog(id: number): void {
    const employee = this.filteredEmployees()?.find((e) => e.id === id)

    const dialogRef = this.dialog.open(EmployeeDeleteDialogue, {
      data: {
        name: employee?.name
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result)
      if (result) {
        this.deleteEmployee(id);
      }
    })
  }

  deleteEmployee(id: number) {

  }

  clearError() {
    this.errorMessage.set(null);
    this.cdr.markForCheck();
  }
}
