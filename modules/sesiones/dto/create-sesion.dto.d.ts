export declare class CreateSesionDto {
    tema: string;
    responsable: string;
    comision_id: number;
    estado_transmision?: 'No transmitiendo' | 'Preparado para grabar' | 'Grabando' | 'Transmisión finalizada';
    fecha_inicio_sesion: string;
    hora_inicio_sesion: string;
    hora_armado_autmatico_sistema?: string;
}
