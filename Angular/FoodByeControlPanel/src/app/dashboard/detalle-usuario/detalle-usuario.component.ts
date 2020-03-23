import { Component, OnInit, Input } from '@angular/core';
import { UsuarioDto } from 'src/app/dto/usuario-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Route } from '@angular/compiler/src/core';
import { DialogBorrarUsuarioComponent } from '../dialog-borrar-usuario/dialog-borrar-usuario.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  idUsuarioDetail: string;
}

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {
  @Input()
  usuarioD: UsuarioDto;
  mostrarSpinner: boolean;
  idUsuarioDetail: string;
  constructor(
    public dialogo: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuariosService
  ) {
    this.mostrarSpinner=false;
    this.usuarioD = new UsuarioDto ("","","","","","",Boolean(),"",new Date())
   }

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser(){
    this.route.paramMap.subscribe(params => {
      this.mostrarSpinner=true;
      this.idUsuarioDetail = params.get("id");
      this.usuarioService.getUsuario(this.idUsuarioDetail).subscribe(resp => {
        this.mostrarSpinner=false;
        this.usuarioD = resp;
      });
    });
  }

  mostrarDialogo(): void {
    const dialogRef = this.dialogo.open(DialogBorrarUsuarioComponent, {
      width: '350px',
      data: {idUsuarioDetail: this.idUsuarioDetail}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.idUsuarioDetail = result;
    });
  }
}