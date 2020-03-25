export class PedidoNuevoDto {
    constructor(
        public titulo: string,
        public descripcion: string,
        public origen: string,
        public destino: string,
        public client_phone: string
    ){
    }
}