import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {AuthGuard} from '../guards/auth.guard';
import { TodosUsuariosComponent } from './lista-usuarios/todos-usuarios/todos-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { ListaPedidosUsuarioComponent } from './lista-pedidos-usuario/lista-pedidos-usuario.component';

export const DashboardRoutes: Routes = [
  { path:'usuarios', component:TodosUsuariosComponent, canActivate: [AuthGuard]},
  { path:'usuarios/usuario/:id', component:DetalleUsuarioComponent, canActivate: [AuthGuard]},
  { path:'pedidos', component:ListaPedidosComponent, canActivate: [AuthGuard]},
  { path:'pedidos/:id', component:DetallePedidoComponent, canActivate: [AuthGuard]},
  { path:'pedidos/usuario/:id', component:ListaPedidosUsuarioComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/pedidos', pathMatch: 'full',canActivate: [AuthGuard]}
];
