import { PubSubService } from './pub-sub.service';
import { Sesion } from 'src/modules/sesiones/entities/sesiones.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/modules/logs/entities/logs.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { ObsService } from 'src/modules/obs/obs.service';
export declare class PubSubObjService {
    private readonly pubSubService;
    private readonly obsService;
    private sesionesRepository;
    private logsRepository;
    private usuariosRepository;
    private readonly configSerivce;
    private obs;
    constructor(pubSubService: PubSubService, obsService: ObsService, sesionesRepository: Repository<Sesion>, logsRepository: Repository<Log>, usuariosRepository: Repository<Usuario>, configSerivce: ConfigType<typeof config>);
}
