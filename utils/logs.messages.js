"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logsMessages = exports.logEnum = void 0;
var logEnum;
(function (logEnum) {
    logEnum["CERRAR_SESION"] = "cerrar sesion";
    logEnum["INICIAR_SESION"] = "iniciar sesion";
    logEnum["CREAR_USUARIO"] = "crear usuario";
    logEnum["ELIMINAR_USUARIO"] = "eliminar usuario";
    logEnum["EDITAR_USUARIO"] = "editar usuario";
    logEnum["CONSULTA_COMISION"] = "consulta comision";
    logEnum["CONSULTA_SESION"] = "consulta sesion";
    logEnum["CREAR_SESION"] = "crear sesion";
    logEnum["EDITAR_SESION"] = "editar sesion";
    logEnum["LISTAR_USUARIOS"] = "listar usuarios";
    logEnum["LISTAR_SESIONES"] = "listar sesiones";
    logEnum["CAMBIAR_ESTADO_TRANSMISION"] = "cambiar estado transmision";
    logEnum["LISTAR_ESTADO_OBS"] = "listar estado obs";
})(logEnum || (exports.logEnum = logEnum = {}));
exports.logsMessages = {
    'cerrar sesion': 'Cerró sesión',
    'iniciar sesion': 'Inició sesión',
    'crear usuario': 'Creó un usuario',
    'eliminar usuario': 'Eliminó un usuario',
    'editar usuario': 'Editó un usuario',
    'consulta comision': 'Consultó una comisión',
    'consulta sesion': 'Consultó una sesión',
    'crear sesion': 'Creó una sesión',
    'editar sesion': 'Editó una sesión',
    'listar usuarios': 'Listó usuarios',
    'listar sesiones': 'Listó sesiones',
    'preparado para grabar': 'Cambió estado transmisión a "Preparado para grabar"',
    grabando: 'Cambió estado transmisión a "Grabando"',
    'transmision finalizada': 'Cambió estado transmisión a "Transmisión finalizada"',
    'fin registro asistentes': 'Finalizó el registro de asistentes',
    'listar estado obs': 'Listó el estado del obs',
};
//# sourceMappingURL=logs.messages.js.map