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
  MatInputModule
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
import { DialogAddUsuarioComponent } from './dialog-add-usuario/dialog-add-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatInputModule
  ],
  declarations: [DashboardComponent, TodosUsuariosComponent, DetalleUsuarioComponent, DialogBorrarUsuarioComponent, SnackBarUsuarioBorradoComponent, DialogAddUsuarioComponent],
  entryComponents:[
    DialogBorrarUsuarioComponent,
    SnackBarUsuarioBorradoComponent,
    DialogAddUsuarioComponent
  ],
})
export class DashboardModule {}
