import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Employee, EmployeeService } from '../../services/employee.service';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-employee-list',
  imports: [MatIconButton, MatButton, MatIcon, MatCard, MatCardHeader, MatCardContent, MatTableModule,
    MatSortHeader, MatSort, CurrencyPipe, RouterLink, MatFormField, MatInput, MatLabel, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  private employeeService = inject(EmployeeService);

  private readonly employees = this.employeeService.getEmployees();
  filteredEmployees = computed(()=> this.sortAndFilterEmployees())

  sortDirection = signal<'asc' | 'desc' | ''>('');
  displayedColumns = ['id', 'name', 'department', 'salary', 'actions'];
  searchTerm = signal('');

  constructor() {

  }

  ngOnInit() {
    console.log(this.employees)
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
    const filteredEmployees = this.employees.filter((e) => {
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

  deleteEmployee(id: string) {

  }
}
