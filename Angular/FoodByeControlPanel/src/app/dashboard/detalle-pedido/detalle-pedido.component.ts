import { Component, OnInit, Input } from '@angular/core';
import { PedidoDto } from 'src/app/dto/pedido-dto';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/service/pedidos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { DialogEditarPedidoComponent } from '../dialog-editar-pedido/dialog-editar-pedido.component';
import { DialogBorrarPedidoComponent } from '../dialog-borrar-pedido/dialog-borrar-pedido.component';

export interface DialogData {
  idPedidoDetail: string;
}

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  @Input()
  pedidoDto: PedidoDto;
  mostrarSpinner: boolean;
  idPedidoDetail: string;

  constructor(
    public dialogo: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService,
    private usuarioService: UsuariosService
  ) {
    this.mostrarSpinner=false;
    this.pedidoDto = new PedidoDto ("","","","","","",new Date(),new Date(),new Date(),new Date(),"","")
   }

  ngOnInit() {
    this.getDataPedido();
  }

  getDataPedido(){
    this.route.paramMap.subscribe(params => {
      this.mostrarSpinner=true;
      this.idPedidoDetail = params.get("id");
      this.pedidosService.getPedido(this.idPedidoDetail).subscribe(resp => {
        this.mostrarSpinner=false;
        this.pedidoDto.titulo = resp.titulo;
        this.pedidoDto.descripcion = resp.descripcion;
        this.pedidoDto.created_date = resp.created_date;
        this.pedidoDto.client_phone = resp.client_phone;
        this.pedidoDto.origen = resp.origen;
        this.pedidoDto.destino = resp.destino;
        this.pedidoDto.numero_pedido = resp.numero_pedido;
        this.pedidoDto.time_recogido = resp.time_recogido;
        this.pedidoDto.time_entregado = resp.time_entregado;
        
        if (resp.asignacion != undefined){
            this.pedidoDto.time_asignado = resp.asignacion.fecha_asignacion;
            this.usuarioService.getUsuario(resp.asignacion.user_id).subscribe(resp2 =>{
              this.pedidoDto.name_asignado = resp2.fullname;
              this.pedidoDto.phone_asignado = resp2.phone;
            });
        }
      });
    });
  }

  desasignar():void{
    this.route.paramMap.subscribe(params => {
      this.mostrarSpinner=true;
      this.idPedidoDetail = params.get("id");
      this.pedidosService.desasignarPedido(this.idPedidoDetail).subscribe(resp => {
        this.mostrarSpinner=false;
        this.pedidoDto.titulo = resp.titulo;
        this.pedidoDto.descripcion = resp.descripcion;
        this.pedidoDto.created_date = resp.created_date;
        this.pedidoDto.client_phone = resp.client_phone;
        this.pedidoDto.origen = resp.origen;
        this.pedidoDto.destino = resp.destino;
        this.pedidoDto.numero_pedido = resp.numero_pedido;
        this.pedidoDto.time_recogido = resp.time_recogido;
        this.pedidoDto.time_entregado = resp.time_entregado;
        
        if (resp.asignacion != undefined){
            this.pedidoDto.time_asignado = resp.asignacion.fecha_asignacion;
            this.usuarioService.getUsuario(resp.asignacion.user_id).subscribe(resp2 =>{
              this.pedidoDto.name_asignado = resp2.fullname;
              this.pedidoDto.phone_asignado = resp2.phone;
            });
        }
      });
    });
  }

  mostrarDesasignar():boolean{
    if (this.pedidoDto.time_recogido==undefined){
      return true;
    } else{
      return false;
    }
  }

  mostrarDialogo(): void {
    const dialogRef = this.dialogo.open(DialogBorrarPedidoComponent, {
      width: '350px',
      data: {idPedidoDetail: this.idPedidoDetail}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  mostrarDialogoToEdit(): void {
    const dialogRef = this.dialogo.open(DialogEditarPedidoComponent, {
      width: '500px',
      data: {idPedidoDetail: this.idPedidoDetail}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
