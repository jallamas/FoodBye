import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {AuthGuard} from '../guards/auth.guard';
import { TodosUsuariosComponent } from './lista-usuarios/todos-usuarios/todos-usuarios.component';

export const DashboardRoutes: Routes = [
  {
    path: 'inicio',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path:'usuarios', component:TodosUsuariosComponent},
  { path: '', redirectTo: '/session/signin', pathMatch: 'full',}
];
