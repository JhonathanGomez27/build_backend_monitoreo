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
exports.ComisionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comisiones_entity_1 = require("./entities/comisiones.entity");
const typeorm_2 = require("typeorm");
let ComisionesService = class ComisionesService {
    constructor(comision) {
        this.comision = comision;
    }
    async createComision(comision) {
        const newComision = this.comision.create(comision);
        const response = await this.comision.save(newComision);
        return {
            ok: true,
            data: response,
        };
    }
    async getComsiones(id) {
        if (!id) {
            const [comisions, total] = await this.comision.findAndCount();
            return {
                ok: true,
                data: comisions,
                total
            };
        }
        const comision = await this.comision.findOne({ where: { id } });
        if (!comision) {
            return {
                ok: false,
                message: 'Comision not found'
            };
        }
        return {
            ok: true,
            data: comision
        };
    }
    async updateComision(id, data) {
        return this.comision.update(id, data);
    }
    deleteComsion(id) {
        return this.comision.delete(id);
    }
};
exports.ComisionesService = ComisionesService;
exports.ComisionesService = ComisionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comisiones_entity_1.Comision)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ComisionesService);
//# sourceMappingURL=comisiones.service.js.map