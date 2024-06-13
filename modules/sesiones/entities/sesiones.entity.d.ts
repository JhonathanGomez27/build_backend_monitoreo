import { Comision } from 'src/modules/comisiones/entities/comisiones.entity';
import { Log } from 'src/modules/logs/entities/logs.entity';
export declare enum estadoTransmisionEnum {
    NO_TRANSMITIENDO = "No transmitiendo",
    PREPARADO_PARA_GRABAR = "Preparado para grabar",
    GRABANDO = "Grabando",
    TRANSMISION_FINALIZADA = "Transmisi\u00F3n finalizada"
}
export declare class Sesion {
    id: number;
    tema: string;
    responsable: string;
    comision: Comision;
    estado_transmision: 'No transmitiendo' | 'Preparado para grabar' | 'Grabando' | 'Transmisión finalizada';
    fecha_inicio_sesion: Date;
    hora_inicio_sesion: string;
    hora_armado_autmatico_sistema: string;
    fecha_inicio_efectivo_sesion: Date;
    hora_inicio_efectivo_sesion: string;
    fecha_fin_efectivo_sesion: Date;
    hora_fin_efectivo_sesion: string;
    created_at: Date;
    updated_at: Date;
    fin_registro_asistentes: boolean;
    logs: Log[];
}
