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
exports.SesionesController = void 0;
const common_1 = require("@nestjs/common");
const create_sesion_dto_1 = require("./dto/create-sesion.dto");
const sesiones_service_1 = require("./sesiones.service");
const error_message_1 = require("../../utils/error.message");
const update_sesion_dto_1 = require("./dto/update-sesion.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
const roles_guard_1 = require("../auth/guards/roles.guard");
const filtersPaginatedQuery_1 = require("../../common/filtersPaginatedQuery");
const swagger_1 = require("@nestjs/swagger");
let SesionesController = class SesionesController {
    constructor(sesionesService) {
        this.sesionesService = sesionesService;
    }
    async postSesion(req, sesion, res) {
        try {
            sesion.estado_transmision = 'No transmitiendo';
            const hora_armado_autmatico_sistema = sesion.hora_inicio_sesion.split(':');
            if (hora_armado_autmatico_sistema[0] == '1') {
                sesion.hora_armado_autmatico_sistema =
                    '12:' + hora_armado_autmatico_sistema[1];
            }
            else {
                sesion.hora_armado_autmatico_sistema =
                    String(parseInt(hora_armado_autmatico_sistema[0]) - 1) +
                        `:${hora_armado_autmatico_sistema[1]}`;
            }
            const { ok, message, data } = await this.sesionesService.createSesion(sesion, req.user);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${sesion.comision_id} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                data,
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async getAllSesiones(req, res, query) {
        try {
            const data = await this.sesionesService.getSesiones(req.user, null, query.page, query.limit);
            return res.json(data);
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async getAllSesionesPaginated(req, res, query) {
        try {
            const data = await this.sesionesService.getAllSesions(req.user, query.page, query.limit);
            return res.json(data);
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async getSesionById(req, id, res) {
        try {
            const { ok, message, data, logs } = await this.sesionesService.getSesiones(req.user, id);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${id} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                data,
                logs
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async putSesion(req, id, sesion, res) {
        try {
            if (sesion.hora_inicio_sesion) {
                const hora_armado_autmatico_sistema = sesion.hora_inicio_sesion.split(':');
                if (hora_armado_autmatico_sistema[0] == '1') {
                    sesion.hora_inicio_sesion = '12:' + hora_armado_autmatico_sistema[1];
                }
                else {
                    sesion.hora_inicio_sesion =
                        String(parseInt(hora_armado_autmatico_sistema[0]) - 1) +
                            `:${hora_armado_autmatico_sistema[1]}`;
                }
            }
            const { ok, message } = await this.sesionesService.updateSesion(id, sesion, req.user);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${id} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                message: 'Sesion actualizada satisfactoriamente',
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async preparadoParaGrabar(req, id, res) {
        try {
            const { ok, message, id: returnedId, } = await this.sesionesService.preparadoParaGrabar(req.user, id);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${returnedId} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                message,
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async empezarSesion(req, id, res) {
        try {
            const { ok, message, id: returnedId, } = await this.sesionesService.empezarSesion(req.user, id);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${returnedId} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                message,
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async finalizarTransmision(req, id, res) {
        try {
            const { ok, message, id: returnedId, } = await this.sesionesService.finalizarTransmision(req.user, id);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${returnedId} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                message,
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
    async finRegistroAsistentes(req, id, res) {
        try {
            const { ok, message, id: returnedId, } = await this.sesionesService.finRegistroAsistentes(req.user, id);
            if (!ok)
                return res.status(404).json({
                    message,
                    description: `The id value: ${returnedId} does not exist. Please check it and try again`,
                });
            return res.json({
                ok,
                message,
            });
        }
        catch (error) {
            (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.SesionesController = SesionesController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.PROGRAMADOR_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sesion_dto_1.CreateSesionDto, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "postSesion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "getAllSesiones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiQuery)({ name: 'pagina', type: Number, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limite', type: Number, required: true }),
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, filtersPaginatedQuery_1.FiltersPaginatedQuery]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "getAllSesionesPaginated", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "getSesionById", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.PROGRAMADOR_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_sesion_dto_1.UpdateSesionDto, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "putSesion", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('preparacion/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "preparadoParaGrabar", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('empezar/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "empezarSesion", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('finalizar/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "finalizarTransmision", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.OPERARIO_SE, roles_model_1.Role.ADMIN, roles_model_1.Role.MONITOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('fin_registro_asistentes/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], SesionesController.prototype, "finRegistroAsistentes", null);
exports.SesionesController = SesionesController = __decorate([
    (0, common_1.Controller)('sesiones'),
    __metadata("design:paramtypes", [sesiones_service_1.SesionesService])
], SesionesController);
//# sourceMappingURL=sesiones.controller.js.map