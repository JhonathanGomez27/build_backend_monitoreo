import { StatussesionesService } from './statussesiones.service';
export declare class StatussesionesController {
    private readonly statusService;
    constructor(statusService: StatussesionesService);
    findOne(req: any, archivo: any, res: any): Promise<any>;
}
