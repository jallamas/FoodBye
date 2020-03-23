import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../detalle-usuario/detalle-usuario.component';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { UploadService } from 'src/app/service/upload.service';
import { SnackBarUsuarioBorradoComponent } from '../snack-bar-usuario-borrado/snack-bar-usuario-borrado.component';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RegisterDto } from 'src/app/dto/register-dto';
import { CustomValidators } from 'ng2-validation';
import { SnackBarUsuarioAgregadoComponent } from '../snack-bar-usuario-agregado/snack-bar-usuario-agregado.component';

const password = new FormControl('', Validators.required);
const passwordD = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-dialog-add-usuario',
  templateUrl: './dialog-add-usuario.component.html',
  styleUrls: ['./dialog-add-usuario.component.scss']
})
export class DialogAddUsuarioComponent implements OnInit {
  durationInSeconds = 3;
  public form: FormGroup;
  registerDto : RegisterDto;
  existeFoto: boolean;
  url: string | ArrayBuffer;
  roles: string[] = ['ADMIN', 'BIKER'];
  constructor(
    public dialogo: MatDialogRef<DialogAddUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    private fb: FormBuilder,
    public uploadService:UploadService,
    private _snackBar: MatSnackBar
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  }
    this.registerDto = new RegisterDto ("","","","",",","","");
    this.url = "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg";
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password,
      passwordD,
      fullname: [
        null,
        Validators.compose([Validators.required])
      ],
      phone: [
        null,
        Validators.compose([Validators.required])
      ],
      avatar: [null],
      rol:[null,
        Validators.compose([Validators.required])
      ]
    });
  }

  uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity();
    reader.readAsDataURL(event.target.files[0]); 
      reader.onload=()=> {
        this.url = reader.result;
      }
    }
  }

  confirmado(): void {
    var formData: any = new FormData();
    formData.append("fullname", this.form.get('fullname').value);
    formData.append("email", this.form.get('email').value);
    formData.append("password", this.form.get('password').value);
    formData.append("passwordD", this.form.get('passwordD').value);
    formData.append("phone", this.form.get('phone').value);
    formData.append("avatar", this.form.get('avatar').value);
    formData.append("rol", this.form.get('rol').value);
      this.uploadService.register(formData).subscribe(
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
}

}
