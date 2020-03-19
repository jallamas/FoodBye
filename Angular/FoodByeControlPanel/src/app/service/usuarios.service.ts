import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.interface';
import { Observable } from 'rxjs';


const urlUsers = 'https://foodbye.herokuapp.com/api/users';
const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  listarTodosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      urlUsers,requestOptions
    );
  }

}
