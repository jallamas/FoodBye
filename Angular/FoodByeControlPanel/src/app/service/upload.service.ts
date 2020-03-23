import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, empty, of, Subject, EMPTY, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { RegisterDto } from '../dto/register-dto';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response.interface';
import { LoginResponse } from '../models/login-response.interface';
import { LoginDto } from '../dto/login-dto';

const urlRegister = 'https://foodbye.herokuapp.com/api/register'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  register(formData:FormData)  {
    return this.http.post<RegisterResponse>(urlRegister, formData,
       {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
  
}
