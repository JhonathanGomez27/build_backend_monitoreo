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
exports.ObsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
const OBSWebSocket = require("obs-websocket-js");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const typeorm_1 = require("@nestjs/typeorm");
const logs_entity_1 = require("../logs/entities/logs.entity");
const typeorm_2 = require("typeorm");
const logs_messages_1 = require("../../utils/logs.messages");
const sesiones_entity_1 = require("../sesiones/entities/sesiones.entity");
const fs_1 = require("fs");
const statussesiones_entity_1 = require("../statussesiones/entities/statussesiones.entity");
const comisiones_entity_1 = require("../comisiones/entities/comisiones.entity");
let ObsService = class ObsService {
    base64ToImage(base64Image, filename) {
        const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
        fs_1.promises.writeFile(__dirname + this.file_path + filename, base64Data, 'base64');
    }
    constructor(configSerivce, logsRepo, usuariosRepo, sesionesRepo, statusSesionRepo, comisionRepo) {
        this.configSerivce = configSerivce;
        this.logsRepo = logsRepo;
        this.usuariosRepo = usuariosRepo;
        this.sesionesRepo = sesionesRepo;
        this.statusSesionRepo = statusSesionRepo;
        this.comisionRepo = comisionRepo;
        this.obs = new OBSWebSocket();
        this.host = this.configSerivce.obs.hostObs;
        this.port = this.configSerivce.obs.portObs;
        this.password = this.configSerivce.obs.passwordObs;
        this.file_path = this.configSerivce.obs.file_path;
    }
    async startOBS(sesion, usuarioLogueado) {
        try {
            await this.obs.connect({
                address: `${this.host}:${this.port}`,
                password: this.password,
            });
            await this.obs.send('StartRecording');
            if (usuarioLogueado) {
                const usuario = await this.usuariosRepo.findOne({
                    where: { id: usuarioLogueado.id },
                });
                if (!usuario) {
                    return {
                        ok: false,
                        message: 'Usuario no encontrado',
                        id: usuarioLogueado.id,
                    };
                }
                const hora_inicio = String(new Date()).split(' ');
                await this.sesionesRepo.update(sesion.id, {
                    estado_transmision: 'Preparado para grabar',
                    fecha_inicio_efectivo_sesion: new Date(),
                    hora_inicio_efectivo_sesion: hora_inicio[4],
                });
                const newLog = this.logsRepo.create({
                    accion: 'cambiar estado transmision',
                    descripcion: logs_messages_1.logsMessages['preparado para grabar'],
                    usuario: usuario.nombre + ' ' + usuario.apellido,
                    id_usuario: usuarioLogueado.id,
                    sesion,
                });
                await this.logsRepo.save(newLog);
                await this.updateComisionStatus(sesion.id, 'grabando');
                return {
                    ok: true,
                    message: 'Grabación iniciada correctamente',
                };
            }
        }
        catch (error) {
            return {
                ok: false,
                message: 'Error al conectar con OBS WebSocket',
                error: error.error
            };
        }
        finally {
            this.obs.disconnect();
        }
    }
    async getEstadistics(usuarioLogueado) {
        const usuario = await this.usuariosRepo.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Usuario no encontrado',
            };
        const newLog = await this.logsRepo.create({
            accion: 'listar estado obs',
            descripcion: logs_messages_1.logsMessages['listar estado obs'],
            usuario: usuario.nombre + ' ' + usuario.apellido,
            id_usuario: usuarioLogueado.id,
        });
        await this.logsRepo.save(newLog);
        try {
            await this.obs.connect({
                address: `${this.host}:${this.port}`,
                password: this.password,
            });
            console.log('Conectado a OBS WebSocket');
            const data = await this.obs.send('GetRecordingStatus');
            console.log('Estadísticas de grabación:', data);
            return data;
        }
        catch (err) {
            console.error('Error al obtener estadísticas de grabación:', err);
            return null;
        }
        finally {
            this.obs.disconnect();
            console.log('Desconectado de OBS WebSocket');
        }
    }
    async finalizarOBS(id, usuarioLogueado) {
        const usuario = await this.usuariosRepo.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return {
                ok: false,
                message: 'Usuario no encontrado',
                id: usuarioLogueado.id,
            };
        }
        const sesion = await this.sesionesRepo.findOne({ where: { id } });
        if (!sesion || sesion.estado_transmision == 'Transmisión finalizada') {
            return {
                ok: false,
                message: 'Sesión no encontrada o la transmisión ya finalizó',
                id,
            };
        }
        let valid = false;
        await this.obs.connect({ password: this.password, address: `${this.host}:${this.port}`, })
            .then(() => {
            return this.obs.send('StopRecording');
        }).then(() => {
            valid = true;
            console.log('Grabación finalizada correctamente.');
        }).catch((err) => {
            valid = false;
            console.error('Error:', err);
        }).finally(() => {
            this.obs.disconnect();
        });
        if (!valid) {
            return {
                ok: false,
                message: 'Error al finalizar la grabación',
            };
        }
        await this.createStatus(sesion);
        await this.updateComisionStatus(sesion.id, 'No transmitiendo');
        const hora_fin = String(new Date()).split(' ');
        await this.sesionesRepo.update(id, {
            estado_transmision: 'Transmisión finalizada',
            fecha_fin_efectivo_sesion: new Date(),
            hora_fin_efectivo_sesion: hora_fin[4],
        });
        const newLog = this.logsRepo.create({
            accion: 'cambiar estado transmision',
            descripcion: logs_messages_1.logsMessages['transmision finalizada'],
            usuario: usuario.nombre + ' ' + usuario.apellido,
            id_usuario: usuario.id,
            sesion,
        });
        await this.logsRepo.save(newLog);
        return { ok: true, message: 'Grabación finalizada correctamente.' };
    }
    async changeRecordName(id) {
        const sesion = await this.sesionesRepo.findOne({ where: { id } });
        if (!sesion) {
            return {
                ok: false,
                message: 'Sesión no encontrada o la transmisión ya finalizó',
                id,
            };
        }
        const fileName = `SB-${sesion.fecha_inicio_sesion}-${sesion.tema}`;
        let valid = false;
        await this.obs.connect({ address: `${this.host}:${this.port}`, password: this.password, })
            .then(async () => {
            await this.obs.send('SetFilenameFormatting', { 'filename-formatting': fileName });
        })
            .then(() => {
            valid = true;
            console.log('Cambio nombre archivo.');
        })
            .catch((err) => {
            console.error('Error:', err);
        })
            .finally(() => {
            this.obs.disconnect();
        });
        return {
            ok: valid,
            message: valid ? 'Nombre de archivo cambiado correctamente.' : 'Error al cambiar nombre de archivo.',
        };
    }
    async takeScreenshot() {
        try {
            await this.obs.connect({
                address: `${this.host}:${this.port}`,
                password: this.password,
            });
            const response = await this.obs.send('TakeSourceScreenshot', {
                sourceName: 'boyaca',
                embedPictureFormat: 'png',
                width: 1280,
                height: 720,
            });
            const base64Image = response.img;
            return { base64Image, ok: true, message: 'Captura de pantalla realizada correctamente.' };
        }
        catch (error) {
            return { ok: false, message: 'Error al tomar captura de pantalla.', base64Image: null };
        }
        finally {
            this.obs.disconnect();
        }
    }
    async executePhpScript(id, estado) {
        const sesion = await this.sesionesRepo.findOne({ where: { id }, relations: ['comision'] });
        if (!sesion) {
            return {
                ok: false,
                message: 'Sesión no encontrada o la transmisión ya finalizó',
                id,
            };
        }
        const response = await this.comisionRepo.update(sesion.comision.id, { estado: estado });
        if (response.affected > 0) {
            return { ok: true, message: 'Comision actualizada correctamente.' };
        }
        return { ok: false, message: 'Error al actualizar comision.' };
    }
    async createStatus(sesion) {
        const name = `SB-${sesion.fecha_inicio_sesion}-${sesion.tema.replace(/ /g, '_')}`;
        const estado = 'archivo_creado';
        const status = new statussesiones_entity_1.estatussesion();
        status.nombre_archivo = name;
        status.estado = estado;
        const response = await this.statusSesionRepo.save(status);
        if (response) {
            return { ok: true, message: 'Estatus creado correctamente.' };
        }
        return { ok: false, message: 'Error al crear estatus.' };
    }
    async updateComisionStatus(id, estado) {
        const sesion = await this.sesionesRepo.findOne({ where: { id }, relations: ['comision'] });
        if (!sesion) {
            return {
                ok: false,
                message: 'Sesión no encontrada o la transmisión ya finalizó',
                id,
            };
        }
        const response = await this.comisionRepo.update(sesion.comision.id, { estado: estado });
        if (response.affected > 0) {
            return { ok: true, message: 'Comision actualizada correctamente.' };
        }
        return { ok: false, message: 'Error al actualizar comision.' };
    }
};
exports.ObsService = ObsService;
exports.ObsService = ObsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.default.KEY)),
    __param(1, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __param(2, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(3, (0, typeorm_1.InjectRepository)(sesiones_entity_1.Sesion)),
    __param(4, (0, typeorm_1.InjectRepository)(statussesiones_entity_1.estatussesion)),
    __param(5, (0, typeorm_1.InjectRepository)(comisiones_entity_1.Comision)),
    __metadata("design:paramtypes", [void 0, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ObsService);
//# sourceMappingURL=obs.service.js.map