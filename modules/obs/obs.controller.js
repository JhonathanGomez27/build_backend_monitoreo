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
exports.ObsController = void 0;
const common_1 = require("@nestjs/common");
const obs_service_1 = require("./obs.service");
const typeorm_1 = require("@nestjs/typeorm");
const sesiones_entity_1 = require("../sesiones/entities/sesiones.entity");
const typeorm_2 = require("typeorm");
const error_message_1 = require("../../utils/error.message");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
let ObsController = class ObsController {
    constructor(sesionesRepo, obsService) {
        this.sesionesRepo = sesionesRepo;
        this.obsService = obsService;
    }
    async startStream(req, id, res) {
        try {
            const sesion = await this.sesionesRepo.findOne({ where: { id } });
            if (!sesion)
                return res.status(404).json({
                    message: 'Sesion no encontrada',
                    description: `The id value: ${id} does not exist. Please check it and try again`,
                });
            const sesionGrabando = await this.sesionesRepo.findOne({
                where: {
                    estado_transmision: 'Preparado para grabar',
                    fecha_inicio_sesion: new Date(),
                },
            });
            if (sesionGrabando)
                return res.status(400).json({
                    message: 'Bad Request',
                    description: `La sesión "${sesionGrabando.id}" ya se está grabando`,
                });
            const { ok, message, id: returnedId, error } = await this.obsService.startOBS(sesion, req.user);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${returnedId} does not exist. Please check it and try again`,
                    error: error
                });
            return res.json({ ok, message });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async getEstadistics(req) {
        try {
            return this.obsService.getEstadistics(req.user);
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async finalizarOBS(req, id, res) {
        try {
            const { ok, message, id: returnedId, } = await this.obsService.finalizarOBS(id, req.user);
            if (!ok)
                return res.status(returnedId == id ? 400 : 404).json({
                    message,
                    descrption: returnedId == id
                        ? 'The recording has already ended'
                        : `The id value: ${returnedId} does not exist. Please check it and try again`,
                });
            return res.json({ ok, message });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async changeRecordName(id, res) {
        try {
            const { ok, message } = await this.obsService.changeRecordName(id);
            if (!ok)
                return res.status(400).json({ message, ok });
            return res.json({ message, ok });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async takeScreenshot(res) {
        try {
            const { ok, message, base64Image } = await this.obsService.takeScreenshot();
            if (!ok)
                return res.status(400).json({ message, ok });
            return res.json({ message, ok, base64Image });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async initPhp(res, id) {
        try {
            const { ok, message } = await this.obsService.executePhpScript(id, 'grabando');
            if (!ok)
                return res.status(400).json({ message, ok });
            return res.json({ message, ok });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.ObsController = ObsController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('/start/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ObsController.prototype, "startStream", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('estadistics'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ObsController.prototype, "getEstadistics", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('/finish/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ObsController.prototype, "finalizarOBS", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('/change-record-name/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ObsController.prototype, "changeRecordName", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard),
    (0, common_1.Get)('/take-screenshot'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ObsController.prototype, "takeScreenshot", null);
__decorate([
    (0, common_1.Get)('/run-command/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ObsController.prototype, "initPhp", null);
exports.ObsController = ObsController = __decorate([
    (0, common_1.Controller)('obs'),
    __param(0, (0, typeorm_1.InjectRepository)(sesiones_entity_1.Sesion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        obs_service_1.ObsService])
], ObsController);
//# sourceMappingURL=obs.controller.js.map