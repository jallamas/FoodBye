import { Asignacion } from './pedidoasignacion.interface';

export interface Pedido {
    time_recogido: Date;
    time_entregado: Date;
    realizado: boolean;
    _id: string;
    numero_pedido: string;
    titulo: string;
    descripcion: string;
    origen: string;
    destino: string;
    asignacion: Asignacion;
    client_phone: string;
    created_date: Date;
    __v: number;
}