import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Usuario } from 'src/app/models/usuario.interface';
import { Avatar } from 'src/app/models/avatar.interface';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { UsuarioDto } from 'src/app/dto/usuario-dto';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { element } from 'protractor';
import { DialogAddUsuarioComponent } from '../../dialog-add-usuario/dialog-add-usuario.component';

@Component({
  selector: 'app-todos-usuarios',
  templateUrl: './todos-usuarios.component.html',
  styleUrls: ['./todos-usuarios.component.scss']
})
export class TodosUsuariosComponent implements OnInit {
  listadoDeUsuarios: MatTableDataSource<Usuario>;

  listaUsuariosConAvatar:Usuario[];
  listaBikersConAvatar:Usuario[];
  listaValidadosConAvatar:Usuario[];
  listaNoValidadosConAvatar:Usuario[];

  listadoDeUsuariosBikers: MatTableDataSource<Usuario>;
  listadoDeUsuariosValidados: MatTableDataSource<Usuario>;
  listadoDeUsuariosNoValidados: MatTableDataSource<Usuario>;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  columsToDisplay: string[] = ['avatar', 'fullname', 'email'];
  columsToDisplayV: string[] = ['avatar', 'fullname','validar', 'email'];

  @ViewChild('paginatorUsuarios', {static: true}) paginatorUsuarios: MatPaginator;
  @ViewChild('paginatorbikers', {static: true}) paginatorbikers: MatPaginator;
  @ViewChild('paginatorValidados', {static: true}) paginatorValidados: MatPaginator;
  @ViewChild('paginatorSinValidar', {static: true}) paginatorSinValidar: MatPaginator;
  mostrarSpinner: boolean;
  imageUrl: SafeUrl;
  pageIndexInhabilitado:number;
  pageIndexValidados:number;
  imageBlobUrl: string | ArrayBuffer;
  imageToShow: any;
  unsafeImageUrl: any;

  constructor(private usuarioService: UsuariosService, private router: Router, private route: ActivatedRoute,private sanitizer: DomSanitizer,
    public dialogo: MatDialog,
    ) { 
    this.listaUsuariosConAvatar=[];
    this.listaBikersConAvatar=[];
    this.listaValidadosConAvatar=[];
    this.listaNoValidadosConAvatar=[];

    this.mostrarSpinner=false;
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  }
}

  ngOnInit() {
    var reader = new FileReader();

    this.loadUsuariosSinValidar();
    this.loadUsuariosTotales();
    this.loadUsuariosBikers();
    this.loadUsuariosValidados();
}

ngAfterViewInit() {
  // this.listadoDeUsuarios.paginator = this.paginatorUsuarios;
  // this.listadoDeUsuariosBikers.paginator = this.paginatorbikers;
  // this.listadoDeUsuariosNoValidados.paginator = this.paginatorSinValidar;
  // this.listadoDeUsuariosValidados.paginator = this.paginatorValidados;
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

mostrarDialogo(): void {
  const dialogRef = this.dialogo.open(DialogAddUsuarioComponent, {
    width: '550px',
  });
  dialogRef.afterClosed().subscribe(result => {
  });
} 

  loadUsuariosTotales(){
    this.usuarioService.listarTodosUsuarios().subscribe(resp =>{
      resp.forEach(usuario=>{
        this.usuarioService.getAvatar(usuario.id).subscribe(resp2=>{
          this.unsafeImageUrl = URL.createObjectURL(resp2);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
          usuario.avatar=this.imageUrl;
          this.listadoDeUsuarios = new MatTableDataSource<Usuario>(this.listaUsuariosConAvatar);
          this.listadoDeUsuarios.paginator = this.paginatorUsuarios;
          this.listaUsuariosConAvatar.push(usuario)
            
        },(error)=>{
          usuario.avatar=null;
          this.listaUsuariosConAvatar.push(usuario)
        }
        );
        });
    });
  }


loadUsuariosBikers(){
  this.usuarioService.listarBikers().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element.id).subscribe(resp2=>{
        this.unsafeImageUrl = URL.createObjectURL(resp2);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
        element.avatar=this.imageUrl;
        this.listaBikersConAvatar.push(element)
        this.listadoDeUsuariosBikers = new MatTableDataSource<Usuario>(this.listaBikersConAvatar);
        this.listadoDeUsuariosBikers.paginator = this.paginatorbikers;
    },(error)=>{
      element.avatar=null;
      this.listaBikersConAvatar.push(element)
    });
  });
});
}

loadUsuariosValidados(){
  this.usuarioService.listarValidados().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element.id).subscribe(resp2=>{
        this.unsafeImageUrl = URL.createObjectURL(resp2);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
        element.avatar=this.imageUrl;
        this.listaValidadosConAvatar.push(element)
        this.listadoDeUsuariosValidados = new MatTableDataSource<Usuario>(this.listaValidadosConAvatar);
        this.listadoDeUsuariosValidados.paginator = this.paginatorValidados;
    },(error)=>{
      element.avatar=null;
      this.listaValidadosConAvatar.push(element)
    });
  });
});
}

loadUsuariosSinValidar(){
  this.usuarioService.listarSinValidar().subscribe(resp =>{
    resp.forEach(element=>{
      this.usuarioService.getAvatar(element.id).subscribe(resp2=>{
        this.unsafeImageUrl = URL.createObjectURL(resp2);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
        element.avatar=this.imageUrl;
        this.listaNoValidadosConAvatar.push(element)
        this.listadoDeUsuariosNoValidados = new MatTableDataSource<Usuario>(this.listaNoValidadosConAvatar);
        this.listadoDeUsuariosNoValidados.paginator = this.paginatorSinValidar;
    },(error)=>{
      element.avatar=null;
      this.listaNoValidadosConAvatar.push(element)
    });
  });
});
}

botonValidar(userV: Usuario){
    this.mostrarSpinner=true;
    this.usuarioService.validarUsuario(userV.id).subscribe(resp2=>{
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
      this.mostrarSpinner=false;
      });
}

botonInhabilitar(userI: Usuario){
    this.mostrarSpinner=true;
    this.usuarioService.inhabilitarUsuario(userI.id).subscribe(resp3=>{   
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
      this.mostrarSpinner=false;
    });
  }

}

