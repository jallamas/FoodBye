import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../detalle-usuario/detalle-usuario.component';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { SnackBarUsuarioBorradoComponent } from '../snack-bar-usuario-borrado/snack-bar-usuario-borrado.component';

@Component({
  selector: 'app-dialog-borrar-usuario',
  templateUrl: './dialog-borrar-usuario.component.html',
  styleUrls: ['./dialog-borrar-usuario.component.scss']
})
export class DialogBorrarUsuarioComponent implements OnInit {
  durationInSeconds = 3;
  constructor(
    public dialogo: MatDialogRef<DialogBorrarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    public usuarioService:UsuariosService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  confirmado(): void {
      this.usuarioService.deleteUsuario(this.data.idUsuarioDetail).subscribe(resp=>{
        this.router.navigate(['/usuarios']);
      });
      this._snackBar.openFromComponent(SnackBarUsuarioBorradoComponent, {
        duration: this.durationInSeconds * 1000,
      });
    this.dialogo.close();
  }

  onNoClick(): void {
    this.dialogo.close();
  }

}
