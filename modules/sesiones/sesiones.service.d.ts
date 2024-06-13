import { Repository } from 'typeorm';
import { Sesion } from './entities/sesiones.entity';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { Comision } from '../comisiones/entities/comisiones.entity';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Log } from '../logs/entities/logs.entity';
export declare class SesionesService {
    private sesionesRepository;
    private comisionesRepository;
    private logsRepository;
    private usuariosRepository;
    constructor(sesionesRepository: Repository<Sesion>, comisionesRepository: Repository<Comision>, logsRepository: Repository<Log>, usuariosRepository: Repository<Usuario>);
    private generateLog;
    createSesion(sesion: CreateSesionDto, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: Sesion;
        message?: undefined;
    }>;
    getSesiones(usuarioLogueado: Usuario, id?: number, pagina?: number, limite?: number): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
        logs?: undefined;
    } | {
        ok: boolean;
        data: Sesion[];
        total: number;
        message?: undefined;
        logs?: undefined;
    } | {
        ok: boolean;
        data: Sesion;
        logs: Log[];
        message?: undefined;
        total?: undefined;
    }>;
    getAllSesions(usuarioLogueado: Usuario, pagina?: number, limite?: number): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        data: Sesion[];
        total: number;
        ok?: undefined;
        message?: undefined;
    }>;
    updateSesion(id: number, sesion: UpdateSesionDto, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: import("typeorm").UpdateResult;
        message?: undefined;
    }>;
    preparadoParaGrabar(usuarioLogueado: Usuario, id: number): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
    empezarSesion(usuarioLogueado: Usuario, id: number): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
    finalizarTransmision(usuarioLogueado: Usuario, id: number): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
    finRegistroAsistentes(usuarioLogueado: Usuario, id: number): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
}
