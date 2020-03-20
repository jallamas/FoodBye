import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Usuario } from 'src/app/models/usuario.interface';
import { Avatar } from 'src/app/models/avatar.interface';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-todos-usuarios',
  templateUrl: './todos-usuarios.component.html',
  styleUrls: ['./todos-usuarios.component.scss']
})
export class TodosUsuariosComponent implements OnInit {
  listadoDeUsuarios: MatTableDataSource<Usuario>;
  listadoDeUsuariosBikers: MatTableDataSource<Usuario>;
  listadoDeUsuariosValidados: MatTableDataSource<Usuario>;
  listadoDeUsuariosNoValidados: MatTableDataSource<Usuario>;

  columsToDisplay: string[] = ['avatar', 'fullname', 'email'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  mydata: any;
  constructor(private usuarioService: UsuariosService) { 
  }

  ngOnInit() {
    this.loadUsuariosTotales();
    this.loadUsuariosBikers();
    this.loadUsuariosValidados();
    this.loadUsuariosSinValidar();
}
loadUsuariosTotales(){
    this.usuarioService.listarTodosUsuarios().subscribe(resp =>{
      resp.forEach(element=>{
        this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
        });
      this.listadoDeUsuarios = new MatTableDataSource<Usuario>(resp);
      this.listadoDeUsuarios.paginator = this.paginator;
    });
  });
}

loadUsuariosBikers(){
  this.usuarioService.listarBikers().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
      });
    this.listadoDeUsuariosBikers = new MatTableDataSource<Usuario>(resp);
    this.listadoDeUsuariosBikers.paginator = this.paginator;
  });
});
}

loadUsuariosValidados(){
  this.usuarioService.listarValidados().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
      });
    this.listadoDeUsuariosValidados = new MatTableDataSource<Usuario>(resp);
    this.listadoDeUsuariosValidados.paginator = this.paginator;
  });
});
}

loadUsuariosSinValidar(){
  this.usuarioService.listarSinValidar().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
      });
    this.listadoDeUsuariosNoValidados = new MatTableDataSource<Usuario>(resp);
    this.listadoDeUsuariosNoValidados.paginator = this.paginator;
  });
});
}

}
