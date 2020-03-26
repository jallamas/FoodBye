import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule
} from '@angular/material';

import {MatStepperModule} from '@angular/material/stepper';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { TodosUsuariosComponent } from './lista-usuarios/todos-usuarios/todos-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { DialogBorrarUsuarioComponent } from './dialog-borrar-usuario/dialog-borrar-usuario.component';
import { SnackBarUsuarioBorradoComponent } from './snack-bar-usuario-borrado/snack-bar-usuario-borrado.component';
import { DialogAddUsuarioComponent } from './dialog-add-usuario/dialog-add-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarUsuarioAgregadoComponent } from './snack-bar-usuario-agregado/snack-bar-usuario-agregado.component';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';
import { SnackBarUsuarioEditadoComponent } from './snack-bar-usuario-editado/snack-bar-usuario-editado.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { DialogAddPedidoComponent } from './dialog-add-pedido/dialog-add-pedido.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { DialogEditarPedidoComponent } from './dialog-editar-pedido/dialog-editar-pedido.component';
import { DialogBorrarPedidoComponent } from './dialog-borrar-pedido/dialog-borrar-pedido.component';
import { ListaPedidosUsuarioComponent } from './lista-pedidos-usuario/lista-pedidos-usuario.component';

@NgModule({
  imports: [
    MatSnackBarModule,
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatMenuModule,
    ChartsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule, 
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule
  ],
  declarations: [DashboardComponent, 
    TodosUsuariosComponent, 
    DetalleUsuarioComponent, 
    DialogBorrarUsuarioComponent, 
    SnackBarUsuarioBorradoComponent, 
    DialogAddUsuarioComponent, 
    SnackBarUsuarioAgregadoComponent, 
    DialogEditarUsuarioComponent,
    SnackBarUsuarioEditadoComponent,
    ListaPedidosComponent,
    DialogAddPedidoComponent,
    DetallePedidoComponent,
    DialogEditarPedidoComponent,
    DialogBorrarPedidoComponent,
    ListaPedidosUsuarioComponent
  ],
  entryComponents:[
    DialogBorrarUsuarioComponent,
    SnackBarUsuarioBorradoComponent,
    DialogAddUsuarioComponent,
    SnackBarUsuarioAgregadoComponent,
    DialogEditarUsuarioComponent,
    SnackBarUsuarioEditadoComponent,
    DialogAddPedidoComponent,
    DialogEditarPedidoComponent,
    DialogBorrarPedidoComponent
  ],
})
export class DashboardModule {}
