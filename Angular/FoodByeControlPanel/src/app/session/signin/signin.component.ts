import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
//import { MatSnackBar } from '@angular/material';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDto } from '../../dto/login-dto';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginDto : LoginDto;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authentication: AuthService, 
    //private snackBar: MatSnackBar,
    //public jwtHelper: JwtHelperService
    ) {
      this.loginDto = new LoginDto( String(), String() );
    }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  login() {
    this.authentication.login(this.loginDto).subscribe(result => {
      this.authentication.setToken(result.token);
      localStorage.setItem('token',result.token);
      console.log(result.token);
      //console.log(this.jwtHelper.decodeToken(this.authentication.getToken()));
    this.router.navigate(['/inicio']);
    },
    error => {
      console.log("ERROR");
    });
  }

}
