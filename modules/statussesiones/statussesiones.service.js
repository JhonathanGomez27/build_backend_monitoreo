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
exports.StatussesionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const statussesiones_entity_1 = require("./entities/statussesiones.entity");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let StatussesionesService = class StatussesionesService {
    constructor(logRepository, usuarioRepository) {
        this.logRepository = logRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async create() {
        return 'This action adds a new statussesione';
    }
    async findAll() {
        return 'This action returns all statussesiones';
    }
    async findOne(sesion) {
        const status = await this.logRepository.findOne({ where: { nombre_archivo: sesion.nombre_archivo } });
        if (!status) {
            return { ok: false, status: 'No se encontro el archivo' };
        }
        return { status, ok: true };
    }
    async update() {
        return 'This action updates a #${id} statussesione';
    }
    async remove() {
        return 'This action removes a #${id} statussesione';
    }
};
exports.StatussesionesService = StatussesionesService;
exports.StatussesionesService = StatussesionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(statussesiones_entity_1.estatussesion)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatussesionesService);
//# sourceMappingURL=statussesiones.service.js.map