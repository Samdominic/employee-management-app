
import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Employee, EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatLabel, MatError ,MatInputModule, MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm {
  private employeeService = inject(EmployeeService);
  departments = this.employeeService.getDepartments();
  employee = input<Employee | null>(null);
  formReady = output<FormGroup>();
  employeeForm: FormGroup;

  constructor() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      salary: new FormControl(null, [Validators.required, Validators.min(1)]),
      joiningDate: new FormControl(null),
    });

    effect(() => {
      const emp = this.employee();
      if (emp) {
        this.updateForm(emp);
      }
    });
  }


  ngOnInit() {
    this.formReady.emit(this.employeeForm);
  }

  private updateForm(emp: Employee) {
    this.employeeForm.patchValue({
      name: emp.name ?? '',
      department: emp.department ?? '',
      salary: emp.salary ?? null,
      joiningDate: emp.joiningDate ?? null,
    });
  }

}
