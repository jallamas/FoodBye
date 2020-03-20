import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.interface';
import { Observable } from 'rxjs';
import { Avatar } from '../models/avatar.interface';


const urlUsers = 'https://foodbye.herokuapp.com/api/users';
const avatar = 'https://foodbye.herokuapp.com/api/avatar';

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ localStorage.getItem('token')
  })
};

const requestOptions2 = {
  headers: new HttpHeaders({
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

  listarBikers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      urlUsers+"/bikers",requestOptions
    );
  }

  listarValidados(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      urlUsers+"/validated",requestOptions
    );
  }
  listarSinValidar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      urlUsers+"/unvalidated",requestOptions
    );
  }
  getAvatar(_id:string){
    return this.http.get(
      avatar+"/"+_id,requestOptions2
    );
  }
}
