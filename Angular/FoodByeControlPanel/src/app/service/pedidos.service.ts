import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido.interface';
import { Observable } from 'rxjs';
import { PedidoNuevoResponse } from '../models/pedido-nuevo-response.interface';
import { PedidoNuevoDto } from '../dto/pedido-nuevo.dto';
import { PedidoEditDto } from '../dto/pedido-edit-dto';

const urlPedidos = `${environment.pedidosUrl}/todos/`;
const urlPedidoNuevo = `${environment.pedidosUrl}/nuevo/`;
const urlPedidoUsuario = `${environment.pedidosUrl}/usuario/`;
const urlPedido = `${environment.pedidosUrl}/`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
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

export class PedidosService {

  constructor(
    private http: HttpClient
  ) { }

  listarTodosPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(
      urlPedidos,requestOptions
    );
  }

  pedidoNuevo(pedidoNuevoDto:PedidoNuevoDto)  {
    return this.http.post<PedidoNuevoResponse>(urlPedidoNuevo, pedidoNuevoDto, requestOptions2);
  }

  getPedido(id:string): Observable<Pedido>{
    return this.http.get<Pedido>(
      urlPedido+id,requestOptions2
    );
  }

  deletePedido(id:string): Observable<Pedido>{
    return this.http.delete<Pedido>(
      urlPedido+id,
      requestOptions
    );
  }
  
  editPedido(id:string,pedidoEditado:PedidoEditDto): Observable<Pedido>{
    return this.http.put<Pedido>(
      urlPedido+id,
      pedidoEditado,
      requestOptions
    );
  }

  listarPedidosUsuario(id:String): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(
      urlPedidoUsuario+id,requestOptions
    );
  }


}
