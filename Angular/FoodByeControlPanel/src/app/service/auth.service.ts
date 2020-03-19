import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, empty, of, Subject, EMPTY, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { RegisterDto } from '../dto/register-dto';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response.interface';
import { LoginResponse } from '../models/login-response.interface';
import { LoginDto } from '../dto/login-dto';

const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';
/*
const httpOptionsLogin = {//application/x-www-form-urlencoded
  headers: new HttpHeaders().append('ccess-Control-Allow-Credentials','true').append('Content-type','application/json; charset=utf-8')
};*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenSubject: BehaviorSubject<string>

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  login(loginDto? : LoginDto): Observable<LoginResponse> {
    const params = new HttpParams()
        .set('username', loginDto.username)
        .set('password', loginDto.password)
    return this.http.post<LoginResponse>('https://foodbye.herokuapp.com/api/login', params
    );
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public clearToken() {
    localStorage.removeItem("tokenRefres");
    localStorage.removeItem("token");
  }
}
