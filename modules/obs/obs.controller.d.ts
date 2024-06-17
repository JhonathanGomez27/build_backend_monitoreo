import { ObsService } from './obs.service';
import { Sesion } from '../sesiones/entities/sesiones.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
export declare class ObsController {
    private sesionesRepo;
    private obsService;
    constructor(sesionesRepo: Repository<Sesion>, obsService: ObsService);
    startStream(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getEstadistics(req: any): Promise<{
        messageId: string;
        status: "ok";
        isRecording: boolean;
        isRecordingPaused: boolean;
        recordTimecode?: string;
        recordingFilename?: string;
    } | {
        ok: boolean;
        message: string;
    }>;
    finalizarOBS(req: any, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    changeRecordName(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    takeScreenshot(res: Response): Promise<Response<any, Record<string, any>>>;
    initPhp(res: Response): Promise<Response<any, Record<string, any>>>;
}
