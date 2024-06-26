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
exports.estatussesion = exports.estadosesiones = void 0;
const typeorm_1 = require("typeorm");
var estadosesiones;
(function (estadosesiones) {
    estadosesiones["PREPARANDO"] = "Preparando";
})(estadosesiones || (exports.estadosesiones = estadosesiones = {}));
let estatussesion = class estatussesion {
};
exports.estatussesion = estatussesion;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true }),
    __metadata("design:type", String)
], estatussesion.prototype, "nombre_archivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], estatussesion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], estatussesion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, onUpdate: 'now()' }),
    __metadata("design:type", Date)
], estatussesion.prototype, "updated_at", void 0);
exports.estatussesion = estatussesion = __decorate([
    (0, typeorm_1.Entity)({ name: 'estatussesiones' })
], estatussesion);
//# sourceMappingURL=statussesiones.entity.js.map