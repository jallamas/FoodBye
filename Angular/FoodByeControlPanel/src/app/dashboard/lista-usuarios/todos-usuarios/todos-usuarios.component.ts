import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Usuario } from 'src/app/models/usuario.interface';
import { Avatar } from 'src/app/models/avatar.interface';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { UsuarioDto } from 'src/app/dto/usuario-dto';

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
  columsToDisplayV: string[] = ['avatar', 'fullname','validar', 'email'];

  @ViewChild('paginatorUsuarios', {static: true}) paginatorUsuarios: MatPaginator;
  @ViewChild('paginatorbikers', {static: true}) paginatorbikers: MatPaginator;
  @ViewChild('paginatorValidados', {static: true}) paginatorValidados: MatPaginator;
  @ViewChild('paginatorSinValidar', {static: true}) paginatorSinValidar: MatPaginator;

  mydata: any;
  constructor(private usuarioService: UsuariosService, private router: Router) { 
  }

  ngOnInit() {
    this.loadUsuariosTotales();
    this.loadUsuariosBikers();
    this.loadUsuariosValidados();
    this.loadUsuariosSinValidar();
}

ngAfterViewInit() {
  this.listadoDeUsuarios.paginator = this.paginatorUsuarios;
  this.listadoDeUsuariosBikers.paginator = this.paginatorbikers;
  this.listadoDeUsuariosNoValidados.paginator = this.paginatorSinValidar;
  this.listadoDeUsuariosValidados.paginator = this.paginatorValidados;
}

_setDataSource(indexNumber) {
  setTimeout(() => {
    switch (indexNumber) {
      case 0:
        !this.listadoDeUsuarios.paginator ? this.listadoDeUsuarios.paginator = this.paginatorUsuarios : null;
        break;
      case 1:
        !this.listadoDeUsuariosBikers.paginator ? this.listadoDeUsuariosBikers.paginator = this.paginatorbikers : null;
        break;
      case 2:
        !this.listadoDeUsuariosNoValidados.paginator ? this.listadoDeUsuariosNoValidados.paginator = this.paginatorSinValidar : null;
        break;
      case 3:
        !this.listadoDeUsuariosValidados.paginator ? this.listadoDeUsuariosValidados.paginator = this.paginatorValidados : null;
        break;
    }
  });
}

loadUsuariosTotales(){
    this.usuarioService.listarTodosUsuarios().subscribe(resp =>{
      resp.forEach(element=>{
        this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
        });
      this.listadoDeUsuarios = new MatTableDataSource<Usuario>(resp);
      this.listadoDeUsuarios.paginator = this.paginatorUsuarios;
    });
  });
}

loadUsuariosBikers(){
  this.usuarioService.listarBikers().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
      });
    this.listadoDeUsuariosBikers = new MatTableDataSource<Usuario>(resp);
    this.listadoDeUsuariosBikers.paginator = this.paginatorbikers;
  });
});
}

loadUsuariosValidados(){
  this.usuarioService.listarValidados().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
      });
    this.listadoDeUsuariosValidados = new MatTableDataSource<Usuario>(resp);
    this.listadoDeUsuariosValidados.paginator = this.paginatorValidados;
  });
});
}

loadUsuariosSinValidar(){
  this.usuarioService.listarSinValidar().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element._id).subscribe(resp2=>{
      });
    this.listadoDeUsuariosNoValidados = new MatTableDataSource<Usuario>(resp);
    this.listadoDeUsuariosNoValidados.paginator = this.paginatorSinValidar;
  });
});
}

botonValidar(user: Usuario){
  if (user.validated==false){

    this.usuarioService.validarUsuario(user._id,user.validated).subscribe(resp2=>{
      });
  }else{
    user.validated=false;
    this.usuarioService.validarUsuario(user._id,user.validated).subscribe(resp3=>{     
    });
  }
}
}
