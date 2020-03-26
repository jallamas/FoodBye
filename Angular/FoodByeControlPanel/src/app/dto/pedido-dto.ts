export class PedidoDto {
    constructor(
        public numero_pedido: string,
        public titulo: string,
        public descripcion: string,
        public origen: string,
        public destino: string,
        public client_phone: string,
        public created_date: Date,
        public time_asignado: Date,
        public time_recogido: Date,
        public time_entregado: Date,
        public name_asignado: string,
        public phone_asignado: string
    ){
    }
}