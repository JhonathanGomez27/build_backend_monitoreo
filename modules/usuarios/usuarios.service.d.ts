import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/providers/hashing.service';
import { Log } from '../logs/entities/logs.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private usuarioRepository;
    private readonly hashingService;
    private logRepository;
    constructor(usuarioRepository: Repository<Usuario>, hashingService: HashingService, logRepository: Repository<Log>);
    onModuleInit(): Promise<void>;
    private createDefaultUser;
    create(createUsuarioDto: CreateUsuarioDto, usuariLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    logout(user: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto, usuariLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
    }>;
    findAll(user: Usuario, pagina: number, limite: number): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        data: Usuario[];
        total: number;
        ok?: undefined;
        message?: undefined;
    }>;
}
