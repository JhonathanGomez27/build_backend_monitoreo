import { ComisionesService } from './comisiones.service';
import { CreateComisionDto } from './dto/create-comisiones.dto';
import { Response } from 'express';
import { updateComisionDto } from './dto/update-comision.dto';
export declare class ComisionesController {
    private comisionService;
    constructor(comisionService: ComisionesService);
    postComisiones(data: CreateComisionDto): Promise<{
        ok: boolean;
        data: import("./entities/comisiones.entity").Comision;
    }>;
    getAllComisiones(): Promise<{
        ok: boolean;
        data: import("./entities/comisiones.entity").Comision[];
        total: number;
        message?: undefined;
    } | {
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        data: import("./entities/comisiones.entity").Comision;
        total?: undefined;
        message?: undefined;
    }>;
    getComisionById(id: number, res: Response): Promise<string | Response<any, Record<string, any>>>;
    putComision(id: number, data: updateComisionDto, res: Response): Promise<string | Response<any, Record<string, any>>>;
    deleteComision(id: number, res: Response): Promise<string | Response<any, Record<string, any>>>;
}
