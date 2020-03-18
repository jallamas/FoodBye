import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, empty, of, Subject, EMPTY, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { RegisterDto } from '../dto/register-dto';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response.interface';
import { LoginResponse } from '../models/login-response.interface';
import { LoginDto } from '../dto/login-dto';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  register(formData:FormData) {
    return this.http.post<RegisterResponse>('https://foodbye.herokuapp.com/api/register', formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  public getFullname(): string {
    return localStorage.getFullname("fullname");
  }

  public setFullname(fullname: string) {
    localStorage.setFullname("fullname", fullname);
  }

  public getEmail(): string {
    return localStorage.getEmail("email");
  }

  public setEmail(email: string) {
    localStorage.setEmail("email", email);
  }

  public getPhone(): string {
    return localStorage.getPhone("phone");
  }

  public setPhone(phone: string) {
    localStorage.setPhone("phone", phone);
  }
  
}
