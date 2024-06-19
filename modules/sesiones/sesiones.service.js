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
exports.SesionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sesiones_entity_1 = require("./entities/sesiones.entity");
const comisiones_entity_1 = require("../comisiones/entities/comisiones.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const logs_entity_1 = require("../logs/entities/logs.entity");
const logs_messages_1 = require("../../utils/logs.messages");
let SesionesService = class SesionesService {
    constructor(sesionesRepository, comisionesRepository, logsRepository, usuariosRepository) {
        this.sesionesRepository = sesionesRepository;
        this.comisionesRepository = comisionesRepository;
        this.logsRepository = logsRepository;
        this.usuariosRepository = usuariosRepository;
    }
    async generateLog(accion, usuario, descripcion, sesion) {
        const newLog = this.logsRepository.create({
            accion,
            descripcion,
            usuario: usuario.nombre + ' ' + usuario.apellido,
            id_usuario: usuario.id,
            sesion,
        });
        await this.logsRepository.save(newLog);
    }
    async createSesion(sesion, usuarioLogueado) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return { ok: false, message: 'Usuario no encontrado' };
        const comision = await this.comisionesRepository.findOne({
            where: { id: sesion.comision_id },
        });
        if (!comision)
            return {
                ok: false,
                message: 'Comisión no encontrada',
            };
        const newSesion = this.sesionesRepository.create({ ...sesion, comision });
        const data = await this.sesionesRepository.save(newSesion);
        this.generateLog('crear sesion', usuario, logs_messages_1.logsMessages['crear sesion'], data);
        return {
            ok: true,
            data,
        };
    }
    async getSesiones(usuarioLogueado, id, pagina, limite) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Ususario no encontrado',
            };
        if (!id) {
            const regla1 = 'Transmisión finalizada';
            const [data, total] = await this.sesionesRepository.findAndCount({
                where: { estado_transmision: (0, typeorm_2.Not)(regla1) },
                order: { fecha_inicio_sesion: 'ASC' },
                skip: (pagina - 1) * limite,
                take: limite
            });
            this.generateLog('listar sesiones', usuario, logs_messages_1.logsMessages['listar sesiones']);
            return {
                ok: true,
                data,
                total,
            };
        }
        const data = await this.sesionesRepository.findOne({
            where: { id },
        });
        const logs = await this.logsRepository.find({
            where: { sesion: { id }, accion: 'cambiar estado transmision' },
        });
        if (!data) {
            return {
                ok: false,
                message: 'Sesión no encontrada',
            };
        }
        this.generateLog('listar sesiones', usuario, logs_messages_1.logsMessages['listar sesiones'], data);
        return {
            ok: true,
            data,
            logs
        };
    }
    async getAllSesions(usuarioLogueado, pagina, limite) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario) {
            return {
                ok: false,
                message: 'Ususario no encontrado',
            };
        }
        const [data, total] = await this.sesionesRepository.findAndCount({
            order: { fecha_inicio_sesion: 'ASC' },
            skip: (pagina - 1) * limite,
            take: limite
        });
        this.generateLog('listar sesiones', usuario, logs_messages_1.logsMessages['listar sesiones']);
        return {
            data,
            total
        };
    }
    async updateSesion(id, sesion, usuarioLogueado) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Usuario no encontrado',
            };
        const sesionToUpdate = await this.sesionesRepository.findOne({
            where: { id },
        });
        if (!sesionToUpdate)
            return {
                ok: false,
                message: `Sesión no encontrada`,
            };
        const data = await this.sesionesRepository.update({ id }, { ...sesion });
        this.generateLog('editar sesion', usuario, logs_messages_1.logsMessages['editar sesion'], sesionToUpdate);
        return {
            ok: true,
            data,
        };
    }
    async preparadoParaGrabar(usuarioLogueado, id) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Usuario no encontrado',
                id: usuarioLogueado.id,
            };
        const sesion = await this.sesionesRepository.findOne({ where: { id } });
        if (!sesion)
            return { ok: false, message: 'Sesión no encontrada', id };
        await this.sesionesRepository.update(id, {
            estado_transmision: 'Preparado para grabar',
        });
        this.generateLog('cambiar estado transmision', usuario, logs_messages_1.logsMessages['preparado para grabar'], sesion);
        return {
            ok: true,
            message: 'Sesión actualizada satisfactoriamente',
        };
    }
    async empezarSesion(usuarioLogueado, id) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Usuario no encontrado',
                id: usuarioLogueado.id,
            };
        const sesion = await this.sesionesRepository.findOne({ where: { id } });
        if (!sesion)
            return {
                ok: false,
                message: 'Sesión no encontrada',
                id,
            };
        const hora_inicio = String(new Date()).split(' ');
        await this.sesionesRepository.update(id, {
            estado_transmision: 'Grabando',
            fecha_inicio_efectivo_sesion: new Date(),
            hora_inicio_efectivo_sesion: hora_inicio[4],
        });
        this.generateLog('cambiar estado transmision', usuario, logs_messages_1.logsMessages.grabando, sesion);
        return {
            ok: true,
            message: 'Sesión actualizada satisfactoriamente',
        };
    }
    async finalizarTransmision(usuarioLogueado, id) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Usuario no encontrado',
                id: usuarioLogueado.id,
            };
        const sesion = await this.sesionesRepository.findOne({ where: { id } });
        if (!sesion)
            return {
                ok: false,
                message: 'Sesión no encontrada',
                id,
            };
        const hora_fin = String(new Date()).split(' ');
        await this.sesionesRepository.update(id, {
            estado_transmision: 'Transmisión finalizada',
            fecha_fin_efectivo_sesion: new Date(),
            hora_fin_efectivo_sesion: hora_fin[4],
        });
        this.generateLog('cambiar estado transmision', usuario, logs_messages_1.logsMessages['transmision finalizada'], sesion);
        return {
            ok: true,
            message: 'Sesión actualizada satisfactoriamente',
        };
    }
    async finRegistroAsistentes(usuarioLogueado, id) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id: usuarioLogueado.id },
        });
        if (!usuario)
            return {
                ok: false,
                message: 'Usuario no encontrado',
                id: usuarioLogueado.id,
            };
        const sesion = await this.sesionesRepository.findOne({ where: { id } });
        if (!sesion)
            return {
                ok: false,
                message: 'Sesión no encontrada',
                id,
            };
        await this.sesionesRepository.update(id, { fin_registro_asistentes: true });
        this.generateLog('fin registro asistentes', usuario, logs_messages_1.logsMessages['fin registro asistentes'], sesion);
        return {
            ok: true,
            message: 'Sesión actualizada satisfactoriamente',
        };
    }
};
exports.SesionesService = SesionesService;
exports.SesionesService = SesionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sesiones_entity_1.Sesion)),
    __param(1, (0, typeorm_1.InjectRepository)(comisiones_entity_1.Comision)),
    __param(2, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __param(3, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SesionesService);
//# sourceMappingURL=sesiones.service.js.map