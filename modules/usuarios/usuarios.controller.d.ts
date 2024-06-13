import { UsuariosService } from './usuarios.service';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    logout(req: any, res: any): Promise<any>;
    create(req: any, createUsuarioDto: CreateUsuarioDto, res: any): Promise<any>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto, req: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    findAll(req: any, query: FiltersPaginatedQuery): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        data: import("./entities/usuario.entity").Usuario[];
        total: number;
        ok?: undefined;
        message?: undefined;
    }>;
}
