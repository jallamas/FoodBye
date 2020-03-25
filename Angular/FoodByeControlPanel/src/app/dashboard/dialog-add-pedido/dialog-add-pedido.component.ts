import { Component, OnInit, Inject } from '@angular/core';
import { PedidoNuevoDto } from 'src/app/dto/pedido-nuevo.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from 'src/app/service/pedidos.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-add-pedido',
  templateUrl: './dialog-add-pedido.component.html',
  styleUrls: ['./dialog-add-pedido.component.scss']
})
export class DialogAddPedidoComponent implements OnInit {

  durationInSeconds = 3;
  public form: FormGroup;

  pedidoNuevoDto: PedidoNuevoDto;
  
  constructor(
    public dialogo: MatDialogRef<DialogAddPedidoComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router:Router,
    private fb: FormBuilder,
    public pedidosService:PedidosService,
    private snackBar: MatSnackBar
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
    this.pedidoNuevoDto = new PedidoNuevoDto ("","","","","");
  }

  ngOnInit() {
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
      client_phone:[null,
        Validators.compose([Validators.required])
      ]
    });
  }

  confirmado(): void {
    this.pedidoNuevoDto.titulo= this.form.get('titulo').value;
    this.pedidoNuevoDto.descripcion= this.form.get('descripcion').value;
    this.pedidoNuevoDto.origen= this.form.get('origen').value;
    this.pedidoNuevoDto.destino= this.form.get('destino').value;
    this.pedidoNuevoDto.client_phone= this.form.get('client_phone').value;
    
    this.pedidosService.pedidoNuevo(this.pedidoNuevoDto).subscribe(
      (response) => {console.log(response); 
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      },
      (error) => console.log(error)
    );
    this.snackBar.open("Pedido creado correctamente.");

    this.dialogo.close();
  }

  onNoClick(): void {
    this.dialogo.close();
  }

}
