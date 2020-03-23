import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {AuthGuard} from '../guards/auth.guard';
import { TodosUsuariosComponent } from './lista-usuarios/todos-usuarios/todos-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

export const DashboardRoutes: Routes = [
  {
    path: 'inicio',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path:'usuarios', component:TodosUsuariosComponent, canActivate: [AuthGuard]},
  { path:'usuarios/usuario/:id', component:DetalleUsuarioComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/inicio', pathMatch: 'full',}
];
