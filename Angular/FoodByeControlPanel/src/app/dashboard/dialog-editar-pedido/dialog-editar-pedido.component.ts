import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoNuevoDto } from 'src/app/dto/pedido-nuevo.dto';
import { PedidoDto } from 'src/app/dto/pedido-dto';
import { DialogAddPedidoComponent } from '../dialog-add-pedido/dialog-add-pedido.component';
import { DialogData } from '../detalle-pedido/detalle-pedido.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/service/pedidos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { PedidoEditDto } from 'src/app/dto/pedido-edit-dto';

@Component({
  selector: 'app-dialog-editar-pedido',
  templateUrl: './dialog-editar-pedido.component.html',
  styleUrls: ['./dialog-editar-pedido.component.scss']
})
export class DialogEditarPedidoComponent implements OnInit {

  public form: FormGroup;
  pedidoEdit : PedidoEditDto;
  pedidoDto : PedidoDto;
  idPedidoDetail: string;

  constructor(
    public dialogo: MatDialogRef<DialogAddPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    private fb: FormBuilder,
    public pedidosService : PedidosService,
    public usuarioService : UsuariosService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.pedidoEdit = new PedidoEditDto ("","","","","",new Date(),new Date(),new Date());
    this.pedidoDto = new PedidoDto ("","","","","","",new Date(),new Date(),new Date(),new Date(),"","")
   }

  ngOnInit() {
    this.pedidosService.getPedido(this.data.idPedidoDetail).subscribe(resp => {
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
        this.usuarioService.getUsuario(resp.asignacion._id).subscribe(resp2 =>{
          this.pedidoDto.name_asignado = resp2.fullname;
          this.pedidoDto.phone_asignado = resp2.phone;
        });
    }

    });

    this.form = this.fb.group({
      titulo: [
        null,
        Validators.compose([Validators.required])
      ],
      descripcion: [
        null,
        Validators.compose([Validators.required])
      ],
      origen: [
        null,
        Validators.compose([Validators.required])
      ],
      destino: [
        null,
        Validators.compose([Validators.required])
      ],
      client_phone: [
        null,
        Validators.compose([Validators.required])
      ]
    });
  }

  confirmado(): void {
    this.pedidosService.editPedido(this.data.idPedidoDetail,this.pedidoDto).subscribe(
      (response) => {console.log(response); 
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      },
      (error) => console.log(error)
    );
    this.snackBar.open("Pedido editado correctamente.");
    this.dialogo.close();
  }

  onNoClick(): void {
    this.dialogo.close();
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

}
