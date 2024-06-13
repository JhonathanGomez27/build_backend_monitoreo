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
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const logs_entity_1 = require("./entities/logs.entity");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const logs_messages_1 = require("../../utils/logs.messages");
let LogsService = class LogsService {
    constructor(logRepository, usuarioRepository) {
        this.logRepository = logRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async create(user, createLogDto) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: user.id } });
        const newLog = this.logRepository.create({
            accion: createLogDto.accion,
            descripcion: logs_messages_1.logsMessages[createLogDto.accion],
            usuario: usuario.nombre + ' ' + usuario.apellido,
            id_usuario: usuario.id,
        });
        await this.logRepository.save(newLog);
        return {
            ok: true,
            message: 'Log creado correctamente'
        };
    }
    async getLogs(filtrosLogsDto, page, limit) {
        let logs = [];
        let total = 0;
        if (filtrosLogsDto.usuario && filtrosLogsDto.cantidadDias) {
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - filtrosLogsDto.cantidadDias);
            [logs, total] = await this.logRepository.findAndCount({
                where: {
                    usuario: (0, typeorm_2.ILike)(`%${filtrosLogsDto.usuario}%`),
                    created_at: (0, typeorm_2.MoreThanOrEqual)(fechaLimite),
                },
                order: {
                    created_at: 'DESC',
                },
                take: limit,
                skip: (page - 1) * limit,
            });
        }
        else if (filtrosLogsDto.usuario) {
            [logs, total] = await this.logRepository.findAndCount({
                where: {
                    usuario: (0, typeorm_2.ILike)(`%${filtrosLogsDto.usuario}%`)
                },
                order: {
                    created_at: 'DESC'
                },
                take: limit,
                skip: (page - 1) * limit
            });
        }
        else if (filtrosLogsDto.cantidadDias) {
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - filtrosLogsDto.cantidadDias);
            [logs, total] = await this.logRepository.findAndCount({
                where: {
                    created_at: (0, typeorm_2.MoreThanOrEqual)(fechaLimite),
                },
                order: {
                    created_at: 'DESC'
                },
                take: limit,
                skip: (page - 1) * limit
            });
        }
        else {
            [logs, total] = await this.logRepository.findAndCount({
                order: {
                    created_at: 'DESC'
                },
                take: limit,
                skip: (page - 1) * limit
            });
        }
        return {
            logs,
            total: total
        };
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(logs_entity_1.Log)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LogsService);
//# sourceMappingURL=logs.service.js.map