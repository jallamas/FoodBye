import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterDto } from 'src/app/dto/register-dto';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogAddUsuarioComponent } from '../dialog-add-usuario/dialog-add-usuario.component';
import { DialogData } from '../detalle-usuario/detalle-usuario.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/service/upload.service';
import { CustomValidators } from 'ng2-validation';
import { SnackBarUsuarioAgregadoComponent } from '../snack-bar-usuario-agregado/snack-bar-usuario-agregado.component';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { UsuarioDto } from 'src/app/dto/usuario-dto';
import { EditUserDto } from 'src/app/dto/edit-dto';
import { EditUserPasswordDto } from 'src/app/dto/usuario-edit-password.dto';

const password = new FormControl(null, Validators.required);
const newpassword = new FormControl(null, Validators.required);
const newpasswordD = new FormControl(null, CustomValidators.equalTo(newpassword));

@Component({
  selector: 'app-dialog-editar-usuario',
  templateUrl: './dialog-editar-usuario.component.html',
  styleUrls: ['./dialog-editar-usuario.component.scss']
})
export class DialogEditarUsuarioComponent implements OnInit {
  durationInSeconds = 3;
  public form: FormGroup;
  public formPassword: FormGroup;
  public formAvatar: FormGroup;
  usuarioEdit : EditUserDto;
  usuarioEditPassword:EditUserPasswordDto;
  usuarioD: UsuarioDto;
  url: string | ArrayBuffer;
  idUsuarioDetail: string;
  roles: string[] = ['ADMIN', 'BIKER'];
  constructor(
    public dialogo: MatDialogRef<DialogAddUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    private fb: FormBuilder,
    public usuarioService:UsuariosService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
    
  ) { 
    this.usuarioEdit = new EditUserDto ("","","");
    this.usuarioD = new UsuarioDto ("","","","","","",Boolean(),"",new Date());
    this.usuarioEditPassword = new EditUserPasswordDto ("","","");
    this.url = "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg";
  }

  ngOnInit() {
    this.usuarioService.getUsuario(this.data.idUsuarioDetail).subscribe(resp => {
      this.usuarioD = resp;
      console.log(resp);
    });
    this.formAvatar = this.fb.group({
      avatar: [
        null,
        Validators.compose([Validators.required, CustomValidators.avatar])
      ]
    });

    this.formPassword = this.fb.group({
      password,
      newpassword,
      newpasswordD
    });

    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      fullname: [
        null,
        Validators.compose([Validators.required])
      ],
      phone: [
        null,
        Validators.compose([Validators.required])
      ]
    });
  }
  uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    this.formAvatar.patchValue({
      avatar: file
    });
    this.formAvatar.get('avatar').updateValueAndValidity();
    reader.readAsDataURL(event.target.files[0]); 
      reader.onload=()=> {
        this.url = reader.result;
      }
    }
  }

  confirmado(): void {
      this.usuarioService.editUsuario(this.data.idUsuarioDetail,this.usuarioEdit).subscribe(
        (response) => {console.log(response); 
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        },
        (error) => console.log(error)
      );
      this._snackBar.openFromComponent(SnackBarUsuarioAgregadoComponent, {
        duration: this.durationInSeconds * 1000,
      });
  this.dialogo.close();
}

confirmadoCambioAvatar(): void{
    var formData: any = new FormData();
    formData.append("avatar", this.formAvatar.get('avatar').value);
    this.usuarioService.editAvatarUsuario(this.data.idUsuarioDetail,formData).subscribe(
      (response) => {console.log(response); 
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      },
      (error) => console.log(error)
    );
    this._snackBar.openFromComponent(SnackBarUsuarioAgregadoComponent, {
      duration: this.durationInSeconds * 1000,
    });
this.dialogo.close();
}

confirmadoCambioPassword(): void{
  this.usuarioService.editPasswordUsuario(this.data.idUsuarioDetail,this.usuarioEditPassword).subscribe(
    (response) => {console.log(response); 
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    },
    (error) => console.log(error)
  );
  this._snackBar.openFromComponent(SnackBarUsuarioAgregadoComponent, {
    duration: this.durationInSeconds * 1000,
  });
this.dialogo.close();
}

onNoClick(): void {
  this.dialogo.close();
  this.router.navigated = false;
this.router.navigate([this.router.url]);
}



}
