import { Comision } from './entities/comisiones.entity';
import { Repository } from 'typeorm';
import { CreateComisionDto } from './dto/create-comisiones.dto';
import { updateComisionDto } from './dto/update-comision.dto';
export declare class ComisionesService {
    private comision;
    constructor(comision: Repository<Comision>);
    createComision(comision: CreateComisionDto): Promise<{
        ok: boolean;
        data: Comision;
    }>;
    getComsiones(id?: number): Promise<{
        ok: boolean;
        data: Comision[];
        total: number;
        message?: undefined;
    } | {
        ok: boolean;
        message: string;
        data?: undefined;
        total?: undefined;
    } | {
        ok: boolean;
        data: Comision;
        total?: undefined;
        message?: undefined;
    }>;
    updateComision(id: number, data: updateComisionDto): Promise<import("typeorm").UpdateResult>;
    deleteComsion(id: number): Promise<import("typeorm").DeleteResult>;
}
