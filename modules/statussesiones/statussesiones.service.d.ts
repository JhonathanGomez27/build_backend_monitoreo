import { estatussesion } from './entities/statussesiones.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
export declare class StatussesionesService {
    private logRepository;
    private usuarioRepository;
    constructor(logRepository: Repository<estatussesion>, usuarioRepository: Repository<Usuario>);
    create(): Promise<string>;
    findAll(): Promise<string>;
    findOne(sesion: any): Promise<{
        ok: boolean;
        status: string;
    } | {
        status: estatussesion;
        ok: boolean;
    }>;
    update(): Promise<string>;
    remove(): Promise<string>;
}
