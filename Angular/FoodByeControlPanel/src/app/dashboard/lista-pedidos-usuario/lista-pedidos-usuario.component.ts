import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.interface';
import { MatTableDataSource, ThemePalette, ProgressSpinnerMode, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PedidosService } from 'src/app/service/pedidos.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-pedidos-usuario',
  templateUrl: './lista-pedidos-usuario.component.html',
  styleUrls: ['./lista-pedidos-usuario.component.scss']
})
export class ListaPedidosUsuarioComponent implements OnInit {
  
  listadoDePedidosUsuario: MatTableDataSource<Pedido>;

  listaPedidosUsuario:Pedido[];
  idUsuario:string;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  columsToDisplay: string[] = ['numero_pedido','titulo', 'origen', 'destino', 'created_date',
  'time_recogido','time_entregado','asignacion'];

  @ViewChild('paginatorPedidosUsuario', {static: true}) paginatorPedidosUsuario: MatPaginator;

  mostrarSpinner: boolean;

  constructor(
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogo: MatDialog
  ) { 
    this.listaPedidosUsuario=[];
    this.mostrarSpinner=false;
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idUsuario = params.get("id");
      this.loadPedidosUsuario();
    });
  }
  
  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.listadoDePedidosUsuario.paginator ? this.listadoDePedidosUsuario.paginator = this.paginatorPedidosUsuario : null;
          break;
      }
    });
  }

  loadPedidosUsuario() {
    this.pedidosService.listarPedidosUsuario(this.idUsuario).subscribe(resp=>{      
      resp.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      resp.forEach(pedido=>{
        this.listadoDePedidosUsuario = new MatTableDataSource<Pedido>(this.listaPedidosUsuario);
        this.listadoDePedidosUsuario.paginator = this.paginatorPedidosUsuario;
        this.listaPedidosUsuario.push(pedido)
      });
    });
  }
}
