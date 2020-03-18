import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/service/upload.service';
import { RegisterDto } from 'src/app/dto/register-dto';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  registerDto : RegisterDto;
  constructor(private fb: FormBuilder, private router: Router, private registerUpload:UploadService) {
    this.registerDto = new RegisterDto ("","","","",",","","");
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password,
      confirmPassword,
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

  register() {
  var formData: any = new FormData();
  formData.append("fullname", this.form.get('fullname').value);
  formData.append("email", this.form.get('email').value);
  formData.append("password", this.form.get('password').value);
  formData.append("confirmPassword", this.form.get('confirmPassword').value);
  formData.append("telephone", this.form.get('telephone').value);
  formData.append("avatar", this.form.get('avatar').value);
    //this.router.navigate(['/inicio']);
    this.registerUpload.register(formData);
    this.router.navigate(['/inicio']);

}

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()
  }
}
