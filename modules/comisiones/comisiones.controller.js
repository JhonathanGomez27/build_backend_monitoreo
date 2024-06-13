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
exports.ComisionesController = void 0;
const common_1 = require("@nestjs/common");
const comisiones_service_1 = require("./comisiones.service");
const create_comisiones_dto_1 = require("./dto/create-comisiones.dto");
const update_comision_dto_1 = require("./dto/update-comision.dto");
const error_message_1 = require("../../utils/error.message");
const decorators_1 = require("../auth/decorators");
const roles_model_1 = require("../auth/models/roles.model");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let ComisionesController = class ComisionesController {
    constructor(comisionService) {
        this.comisionService = comisionService;
    }
    postComisiones(data) {
        return this.comisionService.createComision(data);
    }
    getAllComisiones() {
        return this.comisionService.getComsiones();
    }
    async getComisionById(id, res) {
        try {
            const comision = await this.comisionService.getComsiones(id);
            if (!comision.ok)
                return res.status(404).json({
                    message: 'Not Found',
                    description: `The id value: ${id} does not exist. Please check it and try again`,
                    ok: false
                });
            return res.json(comision);
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async putComision(id, data, res) {
        try {
            const comision = await this.comisionService.getComsiones(id);
            if (!comision.ok)
                return res.status(404).json({
                    message: 'Not Found',
                    description: `The id value: ${id} does not exist. Please check it and try again`,
                    ok: false
                });
            await this.comisionService.updateComision(id, data);
            return res.json({ message: 'Comision updated successfully', ok: true });
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
    async deleteComision(id, res) {
        try {
            const response = await this.comisionService.deleteComsion(id);
            if (response.affected === 0) {
                return res.status(404).json({
                    message: 'Not Found',
                    description: `The id value: ${id} does not exist. Please check it and try again`,
                    ok: false
                });
            }
            return res.json({ message: 'Comision deleted successfully', ok: true });
        }
        catch (error) {
            return (0, error_message_1.handleDbError)(error);
        }
    }
};
exports.ComisionesController = ComisionesController;
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comisiones_dto_1.CreateComisionDto]),
    __metadata("design:returntype", void 0)
], ComisionesController.prototype, "postComisiones", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.PROGRAMADOR_SE, roles_model_1.Role.MONITOR, roles_model_1.Role.OPERARIO_SE),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComisionesController.prototype, "getAllComisiones", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN, roles_model_1.Role.PROGRAMADOR_SE, roles_model_1.Role.MONITOR, roles_model_1.Role.OPERARIO_SE),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "getComisionById", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_comision_dto_1.updateComisionDto, Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "putComision", null);
__decorate([
    (0, decorators_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthAccessGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ComisionesController.prototype, "deleteComision", null);
exports.ComisionesController = ComisionesController = __decorate([
    (0, common_1.Controller)('comisiones'),
    __metadata("design:paramtypes", [comisiones_service_1.ComisionesService])
], ComisionesController);
//# sourceMappingURL=comisiones.controller.js.map