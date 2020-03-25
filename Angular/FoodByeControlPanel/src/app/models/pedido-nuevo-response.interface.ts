export interface PedidoNuevoResponse {
    id: string;
    numero_pedido: string;
    titulo: string;
    descripcion: string;
    origen: string;
    destino: string;
    client_phone: string;
    realizado: boolean;
}