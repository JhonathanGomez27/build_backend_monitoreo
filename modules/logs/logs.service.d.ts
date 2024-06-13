import { Log } from './entities/logs.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FiltrosLogsDto } from './dto/filtrosLogs.dto';
export declare class LogsService {
    private logRepository;
    private usuarioRepository;
    constructor(logRepository: Repository<Log>, usuarioRepository: Repository<Usuario>);
    create(user: any, createLogDto: CreateLogDto): Promise<{
        ok: boolean;
        message: string;
    }>;
    getLogs(filtrosLogsDto: FiltrosLogsDto, page: number, limit: number): Promise<{
        logs: any[];
        total: number;
    }>;
}
