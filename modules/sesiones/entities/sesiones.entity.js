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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sesion = exports.estadoTransmisionEnum = void 0;
const comisiones_entity_1 = require("../../comisiones/entities/comisiones.entity");
const logs_entity_1 = require("../../logs/entities/logs.entity");
const typeorm_1 = require("typeorm");
var estadoTransmisionEnum;
(function (estadoTransmisionEnum) {
    estadoTransmisionEnum["NO_TRANSMITIENDO"] = "No transmitiendo";
    estadoTransmisionEnum["PREPARADO_PARA_GRABAR"] = "Preparado para grabar";
    estadoTransmisionEnum["GRABANDO"] = "Grabando";
    estadoTransmisionEnum["TRANSMISION_FINALIZADA"] = "Transmisi\u00F3n finalizada";
})(estadoTransmisionEnum || (exports.estadoTransmisionEnum = estadoTransmisionEnum = {}));
let Sesion = class Sesion {
};
exports.Sesion = Sesion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sesion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Sesion.prototype, "tema", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Sesion.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comisiones_entity_1.Comision, (comision) => comision.sesiones),
    (0, typeorm_1.JoinColumn)({ name: 'comision_id' }),
    __metadata("design:type", comisiones_entity_1.Comision)
], Sesion.prototype, "comision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estadoTransmisionEnum }),
    __metadata("design:type", String)
], Sesion.prototype, "estado_transmision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Sesion.prototype, "fecha_inicio_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Sesion.prototype, "hora_inicio_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sesion.prototype, "hora_armado_autmatico_sistema", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Sesion.prototype, "fecha_inicio_efectivo_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sesion.prototype, "hora_inicio_efectivo_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Sesion.prototype, "fecha_fin_efectivo_sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sesion.prototype, "hora_fin_efectivo_sesion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sesion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sesion.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: () => 'false' }),
    __metadata("design:type", Boolean)
], Sesion.prototype, "fin_registro_asistentes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => logs_entity_1.Log, (log) => log.sesion),
    __metadata("design:type", Array)
], Sesion.prototype, "logs", void 0);
exports.Sesion = Sesion = __decorate([
    (0, typeorm_1.Entity)({ name: 'sesiones' })
], Sesion);
//# sourceMappingURL=sesiones.entity.js.map