export declare class CreateLogDto {
    accion: 'cerrar sesion' | 'iniciar sesion' | 'crear usuario' | 'eliminar usuario' | 'editar usuario' | 'consulta comision' | 'consulta sesion' | 'crear sesion' | 'editar sesion' | 'listar usuarios' | 'listar sesiones';
    descripcion: string;
    usuario: string;
    id_usuario: number;
    sesion_id?: number;
}
