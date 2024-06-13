export declare enum rolEnum {
    PROGRAMADOR_SE = "programador",
    OPERARIO_SE = "operario",
    MONITOR = "monitor",
    ADMIN = "admin"
}
export declare class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: 'programador' | 'operario' | 'monitor' | 'admin';
    password: string;
    login_status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
