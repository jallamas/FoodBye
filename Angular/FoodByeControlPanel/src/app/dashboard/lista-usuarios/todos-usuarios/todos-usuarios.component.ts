import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Usuario } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-todos-usuarios',
  templateUrl: './todos-usuarios.component.html',
  styleUrls: ['./todos-usuarios.component.scss']
})
export class TodosUsuariosComponent implements OnInit {
  listadoDeUsuarios: MatTableDataSource<Usuario>;
  columsToDisplay: string[] = ['avatar', 'fullname', 'email'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.loadUsuariosTotales();
  }

  loadUsuariosTotales(){
    this.usuarioService.listarTodosUsuarios().subscribe(resp =>{
      this.listadoDeUsuarios = new MatTableDataSource<Usuario>(resp);
      console.log(resp.toString());
      this.listadoDeUsuarios.paginator = this.paginator;
    });
  }

}
