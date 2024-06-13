"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubObjService = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_service_1 = require("./pub-sub.service");
const typeorm_1 = require("@nestjs/typeorm");
const sesiones_entity_1 = require("../../sesiones/entities/sesiones.entity");
const typeorm_2 = require("typeorm");
const logs_entity_1 = require("../../logs/entities/logs.entity");
const logs_messages_1 = require("../../../utils/logs.messages");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const config_1 = require("../../../config");
const OBSWebSocket = require("obs-websocket-js");
const obs_service_1 = require("../../obs/obs.service");
let PubSubObjService = class PubSubObjService {
    constructor(pubSubService, obsService, sesionesRepository, logsRepository, usuariosRepository, configSerivce) {
        this.pubSubService = pubSubService;
        this.obsService = obsService;
        this.sesionesRepository = sesionesRepository;
        this.logsRepository = logsRepository;
        this.usuariosRepository = usuariosRepository;
        this.configSerivce = configSerivce;
        this.obs = new OBSWebSocket();
        this.pubSubService.subscribe('sendNotification', async () => {
            try {
                const usuario = await this.usuariosRepository.findOne({
                    where: { id: 1 },
                });
                const sesion = await this.sesionesRepository.findOne({
                    where: {
                        estado_transmision: 'Preparado para grabar',
                        fecha_inicio_sesion: new Date(),
                    },
                });
                if (!sesion) {
                    const sesiones = await this.sesionesRepository.find({
                        where: { fecha_inicio_sesion: new Date() },
                    });
                    const hora_actual = new Date();
                    sesiones.forEach(async (s) => {
                        const horaSesion = convertTo24Hour(s.hora_inicio_sesion);
                        const fechaSesion = `${s.fecha_inicio_sesion} ${horaSesion}`;
                        const fechaSesionDate = new Date(fechaSesion);
                        if (hora_actual.getTime() >= fechaSesionDate.getTime() && s.estado_transmision === 'No transmitiendo') {
                            const inicio_efectivo_hora = String(hora_actual).split(' ')[4];
                            await this.sesionesRepository.update(s.id, {
                                estado_transmision: 'Preparado para grabar',
                                hora_armado_autmatico_sistema: inicio_efectivo_hora,
                            });
                            const data = {
                                s,
                            };
                            await this.pubSubService.publish('startRecordingObs', data);
                            const newLog = this.logsRepository.create({
                                accion: 'cambiar estado transmision',
                                descripcion: logs_messages_1.logsMessages['preparado para grabar'],
                                usuario: usuario.nombre + ' ' + usuario.apellido,
                                id_usuario: usuario.id,
                                sesion: s,
                            });
                            await this.logsRepository.save(newLog);
                        }
                    });
                }
            }
            catch (error) {
                console.error('Error al procesar el evento:', error);
            }
        });
        this.pubSubService.subscribe('startRecordingObs', async (data) => {
            try {
                const { s } = data;
                const record = this.obsService.startOBS(s);
                console.log('Salio bien', record);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.PubSubObjService = PubSubObjService;
exports.PubSubObjService = PubSubObjService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(sesiones_entity_1.Sesion)),
    __param(3, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __param(4, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(5, (0, common_1.Inject)(config_1.default.KEY)),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService,
        obs_service_1.ObsService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, void 0])
], PubSubObjService);
function convertTo24Hour(time) {
    const date = new Date(Date.parse(`01/01/2022 ${time}`));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
//# sourceMappingURL=pub-sub-obj.service.js.map