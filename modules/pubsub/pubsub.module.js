"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubModule = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_service_1 = require("./pub-sub-services/pub-sub.service");
const obs_service_1 = require("../obs/obs.service");
const typeorm_1 = require("@nestjs/typeorm");
const sesiones_entity_1 = require("../sesiones/entities/sesiones.entity");
const logs_entity_1 = require("../logs/entities/logs.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const statussesiones_entity_1 = require("../statussesiones/entities/statussesiones.entity");
const comisiones_entity_1 = require("../comisiones/entities/comisiones.entity");
let PubsubModule = class PubsubModule {
};
exports.PubsubModule = PubsubModule;
exports.PubsubModule = PubsubModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sesiones_entity_1.Sesion, logs_entity_1.Log, usuario_entity_1.Usuario, statussesiones_entity_1.estatussesion, comisiones_entity_1.Comision])],
        providers: [pub_sub_service_1.PubSubService, obs_service_1.ObsService],
        exports: [pub_sub_service_1.PubSubService],
    })
], PubsubModule);
//# sourceMappingURL=pubsub.module.js.map