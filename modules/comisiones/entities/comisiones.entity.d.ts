import { Sesion } from 'src/modules/sesiones/entities/sesiones.entity';
export declare class Comision {
    id: number;
    nombre: string;
    descripcion: string;
    urlImagen: string;
    estado: string;
    created_at: Date;
    updated_at: Date;
    sesiones: Sesion[];
}
