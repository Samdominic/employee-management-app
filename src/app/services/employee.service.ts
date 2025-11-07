import { Injectable } from '@angular/core';

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


  getEmployees() {
    return [
      { id: 101, name: 'Aarav Sharma', department: 'Human Resources', salary: 48000, joiningDate: '2020-04-15' },
      { id: 102, name: 'Isha Patel', department: 'Finance', salary: 55000, joiningDate: '2019-11-22' },
      { id: 103, name: 'Rohit Kumar', department: 'IT', salary: 72000, joiningDate: '2021-07-01' },
      { id: 104, name: 'Sneha Reddy', department: 'Marketing', salary: 60000, joiningDate: '2022-03-10' },
      { id: 105, name: 'Karan Singh', department: 'Sales', salary: 58000, joiningDate: '2023-08-17' },
      { id: 106, name: 'Meena Joshi', department: 'Operations', salary: 50000, joiningDate: '2020-01-29' },
      { id: 107, name: 'Arjun Nair', department: 'Engineering', salary: 90000, joiningDate: '2021-05-25' },
      { id: 108, name: 'Priya Das', department: 'Customer Support', salary: 45000, joiningDate: '2022-10-14' },
      { id: 109, name: 'Vikram Chauhan', department: 'Business Development', salary: 68000, joiningDate: '2019-09-03' },
      { id: 110, name: 'Neha Kapoor', department: 'Design', salary: 64000, joiningDate: '2023-01-19' },
      { id: 111, name: 'Ravi Menon', department: 'Data Science', salary: 88000, joiningDate: '2024-06-12' },
      { id: 112, name: 'Divya Raj', department: 'Legal', salary: 71000, joiningDate: '2021-02-08' },
      { id: 113, name: 'Sahil Gupta', department: 'Procurement', salary: 53000, joiningDate: '2020-09-30' },
      { id: 114, name: 'Anjali Verma', department: 'Training', salary: 47000, joiningDate: '2024-03-22' },
      { id: 115, name: 'Manish Tiwari', department: 'Research', salary: 85000, joiningDate: '2025-01-11' }
    ]

  }
  // getEmployeeById(id) {

  // }
  // addEmployee(employee) {

  // }
  // updateEmployee(id, employee) {

  // }

  // deleteEmployee(id) {

  // }
}
