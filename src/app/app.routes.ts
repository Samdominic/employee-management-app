import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: ()=> import('../app/layouts/layout.routes').then((l)=> l.routes)  
    }
];
