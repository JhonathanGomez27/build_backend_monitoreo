import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Log } from '../logs/entities/logs.entity';
import { Repository } from 'typeorm';
import { Sesion } from '../sesiones/entities/sesiones.entity';
import { estatussesion } from '../statussesiones/entities/statussesiones.entity';
import { Comision } from '../comisiones/entities/comisiones.entity';
export declare class ObsService {
    private readonly configSerivce;
    private logsRepo;
    private usuariosRepo;
    private sesionesRepo;
    private statusSesionRepo;
    private comisionRepo;
    private obs;
    private host;
    private port;
    private password;
    private file_path;
    private base64ToImage;
    constructor(configSerivce: ConfigType<typeof config>, logsRepo: Repository<Log>, usuariosRepo: Repository<Usuario>, sesionesRepo: Repository<Sesion>, statusSesionRepo: Repository<estatussesion>, comisionRepo: Repository<Comision>);
    startOBS(sesion: Sesion, usuarioLogueado?: Usuario): Promise<{
        ok: boolean;
        message: string;
        id: number;
        error?: undefined;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        message: string;
        error: any;
        id?: undefined;
    }>;
    getEstadistics(usuarioLogueado: Usuario): Promise<{
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
    finalizarOBS(id: number, usuarioLogueado: Usuario): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
    changeRecordName(id: number): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
    takeScreenshot(): Promise<{
        base64Image: string;
        ok: boolean;
        message: string;
    }>;
    executePhpScript(id: number, estado: string): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
    createStatus(sesion: any): Promise<{
        ok: boolean;
        message: string;
    }>;
    updateComisionStatus(id: number, estado: string): Promise<{
        ok: boolean;
        message: string;
        id: number;
    } | {
        ok: boolean;
        message: string;
        id?: undefined;
    }>;
}
