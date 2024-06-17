"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const comisiones_module_1 = require("./modules/comisiones/comisiones.module");
const logs_module_1 = require("./modules/logs/logs.module");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const sesiones_module_1 = require("./modules/sesiones/sesiones.module");
const schedule_module_1 = require("./modules/schedule/schedule.module");
const pubsub_module_1 = require("./modules/pubsub/pubsub.module");
const pub_sub_obj_service_1 = require("./modules/pubsub/pub-sub-services/pub-sub-obj.service");
const typeorm_1 = require("@nestjs/typeorm");
const sesiones_entity_1 = require("./modules/sesiones/entities/sesiones.entity");
const logs_entity_1 = require("./modules/logs/entities/logs.entity");
const usuario_entity_1 = require("./modules/usuarios/entities/usuario.entity");
const obs_module_1 = require("./modules/obs/obs.module");
const obs_service_1 = require("./modules/obs/obs.service");
const statussesiones_module_1 = require("./modules/statussesiones/statussesiones.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
            }),
            database_module_1.DatabaseModule,
            comisiones_module_1.ComisionesModule,
            logs_module_1.LogsModule,
            usuarios_module_1.UsuariosModule,
            sesiones_module_1.SesionesModule,
            schedule_module_1.ScheduleAppModule,
            pubsub_module_1.PubsubModule,
            typeorm_1.TypeOrmModule.forFeature([sesiones_entity_1.Sesion, logs_entity_1.Log, usuario_entity_1.Usuario]),
            obs_module_1.ObsModule,
            statussesiones_module_1.StatussesionesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, pub_sub_obj_service_1.PubSubObjService, obs_service_1.ObsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map