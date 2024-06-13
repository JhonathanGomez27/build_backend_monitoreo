"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesModule = void 0;
const common_1 = require("@nestjs/common");
const sesiones_controller_1 = require("./sesiones.controller");
const sesiones_service_1 = require("./sesiones.service");
const typeorm_1 = require("@nestjs/typeorm");
const sesiones_entity_1 = require("./entities/sesiones.entity");
const comisiones_entity_1 = require("../comisiones/entities/comisiones.entity");
const iam_module_1 = require("../auth/iam.module");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const logs_entity_1 = require("../logs/entities/logs.entity");
let SesionesModule = class SesionesModule {
};
exports.SesionesModule = SesionesModule;
exports.SesionesModule = SesionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sesiones_entity_1.Sesion, comisiones_entity_1.Comision, logs_entity_1.Log, usuario_entity_1.Usuario]),
            iam_module_1.IamModule,
        ],
        controllers: [sesiones_controller_1.SesionesController],
        providers: [sesiones_service_1.SesionesService],
    })
], SesionesModule);
//# sourceMappingURL=sesiones.module.js.map