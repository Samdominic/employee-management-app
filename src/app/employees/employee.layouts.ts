import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./employee-list/employee-list').then((c) => c.EmployeeList),
    },
    {
        path: 'add',
        loadComponent: () => import('./add-employee/add-employee').then((c) => c.AddEmployee),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./edit-employee/edit-employee').then((c) => c.EditEmployee),
    },
];
