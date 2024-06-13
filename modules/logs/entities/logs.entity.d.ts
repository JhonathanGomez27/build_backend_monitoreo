import { Sesion } from 'src/modules/sesiones/entities/sesiones.entity';
export declare enum logEnum {
    CERRAR_SESION = "cerrar sesion",
    INICIAR_SESION = "iniciar sesion",
    CREAR_USUARIO = "crear usuario",
    ELIMINAR_USUARIO = "eliminar usuario",
    EDITAR_USUARIO = "editar usuario",
    CONSULTA_COMISION = "consulta comision",
    CONSULTA_SESION = "consulta sesion",
    CREAR_SESION = "crear sesion",
    EDITAR_SESION = "editar sesion",
    LISTAR_USUARIOS = "listar usuarios",
    LISTAR_SESIONES = "listar sesiones",
    CAMBIAR_ESTADO_TRANSMISION = "cambiar estado transmision",
    FIN_REGISTRO_ASISTENTES = "fin registro asistentes",
    LISTAR_ESTADO_OBS = "listar estado obs"
}
export declare class Log {
    id: string;
    accion: 'cerrar sesion' | 'iniciar sesion' | 'crear usuario' | 'eliminar usuario' | 'editar usuario' | 'consulta comision' | 'consulta sesion' | 'crear sesion' | 'editar sesion' | 'listar usuarios' | 'listar sesiones' | 'cambiar estado transmision' | 'fin registro asistentes' | 'listar estado obs';
    descripcion: string;
    usuario: string;
    id_usuario: number;
    fecha: Date;
    created_at: Date;
    updated_at: Date;
    sesion: Sesion;
}
