import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario.interface';
import { Observable, throwError } from 'rxjs';
import { UsuarioDto } from '../dto/usuario-dto';
import { UsuarioEditResponse, UsuarioEditResponse2 } from '../models/usuario-edit-response.interface';
import { EditUserDto } from '../dto/edit-dto';
import { EditUserPasswordDto } from '../dto/usuario-edit-password.dto';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';


const urlUsers = `${environment.serverUrl}/users/`;
const urlUser = `${environment.serverUrl}/user/`;
const urlAvatar = `${environment.serverUrl}/avatar/`;
const local ="http://localhost:3000/api/users/"
const localAvatar ="http://localhost:3000/api/avatar/"


const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer '+ localStorage.getItem('token')
  })
};

const requestOptions2 = {
  headers: new HttpHeaders({
    'responseType': 'blob as json',
    'Authorization': 'Bearer '+ localStorage.getItem('token'),
    'Accept':"image/webp, */*"
  })
};

const requestOptions3 = {
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
      urlUsers+"bikers",requestOptions
    );
  }

  listarValidados(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      urlUsers+"validated",requestOptions
    );
  }
  listarSinValidar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      urlUsers+"unvalidated",requestOptions
    );
  }

  validarUsuario(usurioValidadoId:String): Observable<Usuario>{
    return this.http.put<Usuario>(
      urlUsers+"validar/"+usurioValidadoId,
      null,
      requestOptions,
    );
  }

  inhabilitarUsuario(usuarioValidadoId:String): Observable<Usuario>{
    return this.http.put<Usuario>(
      urlUsers+"inhabilitar/"+usuarioValidadoId,
      null,
      requestOptions,
    );
  }

  getAvatar(_id:string): Observable<Blob>{
    let httpHeaders = new HttpHeaders()
    .set('Accept', "image/webp,*/*")
    .set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    return this.http.get(
      urlAvatar+_id,{ headers: httpHeaders, responseType: 'blob' })
  }

  getUsuario(id:string): Observable<Usuario>{
    return this.http.get<Usuario>(
      urlUser+id,requestOptions
    );
  }

  deleteUsuario(_id:string): Observable<Usuario>{
    return this.http.delete<Usuario>(
      urlUsers+_id,requestOptions
    );
  }
  editUsuario(id:string,usuarioEditado:EditUserDto): Observable<UsuarioEditResponse>{
    return this.http.put<UsuarioEditResponse>(
      urlUser+id,
      usuarioEditado,
      requestOptions
    );
  }

  editAvatarUsuario(id:string,usuarioEditado:FormData){
    return this.http.put(
      urlAvatar+id,
      usuarioEditado,
      requestOptions3
    );
  }

  editPasswordUsuario(id:string,usuarioEditado:EditUserPasswordDto): Observable<UsuarioEditResponse>{
    return this.http.put<UsuarioEditResponse>(
      urlUser+"password/"+id,
      usuarioEditado,
      requestOptions
    );
  }

  }