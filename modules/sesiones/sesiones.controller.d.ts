import { CreateSesionDto } from './dto/create-sesion.dto';
import { SesionesService } from './sesiones.service';
import { Response } from 'express';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class SesionesController {
    private sesionesService;
    constructor(sesionesService: SesionesService);
    postSesion(req: any, sesion: CreateSesionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllSesiones(req: any, res: Response, query?: FiltersPaginatedQuery): Promise<Response<any, Record<string, any>>>;
    getAllSesionesPaginated(req: any, res: Response, query?: FiltersPaginatedQuery): Promise<Response<any, Record<string, any>>>;
    getSesionById(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    putSesion(req: any, id: number, sesion: UpdateSesionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    preparadoParaGrabar(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    empezarSesion(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    finalizarTransmision(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    finRegistroAsistentes(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
