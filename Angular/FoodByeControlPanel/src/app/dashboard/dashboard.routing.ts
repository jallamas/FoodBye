import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: 'inicio',
    component: DashboardComponent
  },
  { path: '', redirectTo: '/session/signin', pathMatch: 'full' }
];
