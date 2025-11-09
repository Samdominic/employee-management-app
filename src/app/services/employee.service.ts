import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Employee {
  id: number,
  name: string,
  department: string,
  salary: number,
  joiningDate: string
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly API_URL = 'http://localhost:3000/employees';
  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get<Employee[]>(this.API_URL);
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${this.API_URL}/${id}`);
  }

  addEmployee(employee: Omit<Employee, 'id'>) {
    return this.http.post<Employee>(this.API_URL, employee);
  }

  updateEmployee(id: number, employee: Partial<Employee>) {
    return this.http.put<Employee>(`${this.API_URL}/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getDepartments() {
    return [
      'IT',
      'HR',
      'Finance',
      'Marketing',
      'Sales',
      'Operations',
      'Customer Support',
      'Legal',
      'Research & Development',
      'Procurement',
      'Administration',
      'Quality Assurance',
      'Product Management',
      'Business Development',
      'Logistics'
    ];
  }

}
