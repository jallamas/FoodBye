import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario.interface';
import { Observable } from 'rxjs';
import { Avatar } from '../models/avatar.interface';
import { UsuarioDto } from '../dto/usuario-dto';


const urlUsers = 'https://foodbye.herokuapp.com/api/users/';
const urlUser = 'https://foodbye.herokuapp.com/api/user/';
const urlAvatar = 'https://foodbye.herokuapp.com/api/avatar/';
const local ="http://localhost:3000/api/users/"

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer '+ localStorage.getItem('token')
})
};

const requestOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'image/jpeg, charset=utf-8',
    'Authorization': 'Bearer '+ localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
idUser:string;
  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  listarTodosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      local,requestOptions
    );
  }

  listarBikers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      local+"bikers",requestOptions
    );
  }

  listarValidados(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      local+"validated",requestOptions
    );
  }
  listarSinValidar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      local+"unvalidated",requestOptions
    );
  }

  validarUsuario(usurioValidadoId:String): Observable<Usuario>{
    return this.http.put<Usuario>(
      local+"validar/"+usurioValidadoId,
      null,
      requestOptions,
    );
  }

  inhabilitarUsuario(usurioValidadoId:String): Observable<Usuario>{
    return this.http.put<Usuario>(
      local+"inhabilitar/"+usurioValidadoId,
      null,
      requestOptions,
    );
  }

  getAvatar(_id:string): Observable<Blob>{
    return this.http.get<Blob>(
      urlAvatar+_id,requestOptions2
    );
  }

  getUsuario(_id:string): Observable<Usuario>{
    return this.http.get<Usuario>(
      local+_id,requestOptions
    );
  }
  public getId(): string {
    return this.idUser;
  }

  public setId(_id: string) {
    this.idUser==_id;
  }
}
