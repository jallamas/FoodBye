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
  MatSnackBarModule  
} from '@angular/material';


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
  ],
  declarations: [DashboardComponent, TodosUsuariosComponent, DetalleUsuarioComponent, DialogBorrarUsuarioComponent, SnackBarUsuarioBorradoComponent],
  entryComponents:[
    DialogBorrarUsuarioComponent,
    SnackBarUsuarioBorradoComponent
  ],
})
export class DashboardModule {}
