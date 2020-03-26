import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../detalle-pedido/detalle-pedido.component';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/service/pedidos.service';


@Component({
  selector: 'app-dialog-borrar-pedido',
  templateUrl: './dialog-borrar-pedido.component.html',
  styleUrls: ['./dialog-borrar-pedido.component.scss']
})
export class DialogBorrarPedidoComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogBorrarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    public pedidosService : PedidosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  confirmado(): void {
    this.pedidosService.deletePedido(this.data.idPedidoDetail).subscribe(resp=>{
      this.router.navigate(['/pedidos']);
    });
    this.snackBar.open("Pedido eliminado correctamente.");
  this.dialogo.close();
}

onNoClick(): void {
  this.dialogo.close();
}

}
