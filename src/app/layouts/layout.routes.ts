import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-layout/main-layout').then((c) => c.MainLayout),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'employees'
            },
            {
                path: 'employees',
                loadChildren: ()=> import('../employees/employee.layouts').then((c) => c.routes)
            }
        ]
    }
];
