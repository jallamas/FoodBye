export class PedidoEditDto {
    constructor(

        public titulo: string,
        public descripcion: string,
        public origen: string,
        public destino: string,
        public client_phone: string,
        public time_asignado: Date,
        public time_recogido: Date,
        public time_entregado: Date
    ){
    }
}