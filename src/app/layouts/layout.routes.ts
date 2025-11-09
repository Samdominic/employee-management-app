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
                loadChildren: () => import('../employees/employee.layouts').then((c) => c.routes)
            },
            {
                path: '404',
                loadComponent: () => import('../not-found/not-found').then((c) => c.NotFound)
            },
            {
                path: '**',
                redirectTo: '404'
            }
        ]
    }
];
