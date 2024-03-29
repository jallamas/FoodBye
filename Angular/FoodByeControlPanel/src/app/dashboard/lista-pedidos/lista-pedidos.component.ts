import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.interface';
import { MatDialog, MatTableDataSource, MatPaginator, ThemePalette, ProgressSpinnerMode } from '@angular/material';
import { PedidosService } from 'src/app/service/pedidos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogAddPedidoComponent } from '../dialog-add-pedido/dialog-add-pedido.component';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  listadoDePedidos: MatTableDataSource<Pedido>;

  listaPedidos:Pedido[];

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  columsToDisplay: string[] = ['numero_pedido','titulo', 'origen', 'destino', 'created_date',
  'time_recogido','time_entregado','asignacion'];

  @ViewChild('paginatorPedidos', {static: true}) paginatorPedidos: MatPaginator;

  mostrarSpinner: boolean;

  constructor(private pedidosService: PedidosService,
     private router: Router,
    public dialogo: MatDialog) {
      this.listaPedidos=[];

      this.mostrarSpinner=false;
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }
    }

  ngOnInit() {
    this.loadPedidos();
    
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.listadoDePedidos.paginator ? this.listadoDePedidos.paginator = this.paginatorPedidos : null;
          break;
      }
    });
  }

  mostrarDialogo(): void {
    const dialogRef = this.dialogo.open(DialogAddPedidoComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  } 

  loadPedidos() {
    this.pedidosService.listarTodosPedidos().subscribe(resp=>{
      resp.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      resp.forEach(pedido=>{
        this.listadoDePedidos = new MatTableDataSource<Pedido>(this.listaPedidos);
        this.listadoDePedidos.paginator = this.paginatorPedidos;
        this.listaPedidos.push(pedido)
      });
    });
  }

}
