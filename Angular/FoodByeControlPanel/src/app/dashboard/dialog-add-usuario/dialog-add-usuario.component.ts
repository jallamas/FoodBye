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
  constructor(
    public dialogo: MatDialogRef<DialogAddUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    private fb: FormBuilder,
    public uploadService:UploadService,
    private _snackBar: MatSnackBar
  ) { 
    this.existeFoto=false
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  }
    this.registerDto = new RegisterDto ("","","","",",","","");
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
      telephone: [
        null,
        Validators.compose([Validators.required])
      ],
      avatar: [null]
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()
    if(this.form.get('avatar').value){
      this.existeFoto==true;
    }else{
      this.existeFoto==false;
    }
  }

  confirmado(): void {
    var formData: any = new FormData();
    formData.append("fullname", this.form.get('fullname').value);
    formData.append("email", this.form.get('email').value);
    formData.append("password", this.form.get('password').value);
    formData.append("passwordD", this.form.get('passwordD').value);
    formData.append("telephone", this.form.get('telephone').value);
    formData.append("avatar", this.form.get('avatar').value);
      this.uploadService.register(formData).subscribe(
        (response) => {console.log(response); 
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
          this._snackBar.openFromComponent(SnackBarUsuarioBorradoComponent, {
            duration: this.durationInSeconds * 1000,
          });
        },
        (error) => console.log(error)
      );
  this.dialogo.close();
}

onNoClick(): void {
  this.dialogo.close();
}

}
