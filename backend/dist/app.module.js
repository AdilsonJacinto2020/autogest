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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const clientes_module_1 = require("./modules/clientes/clientes.module");
const ordens_module_1 = require("./modules/ordens/ordens.module");
const estoque_module_1 = require("./modules/estoque/estoque.module");
const financeiro_module_1 = require("./modules/financeiro/financeiro.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: parseInt(config.get('DB_PORT', '5432')),
                    username: config.get('DB_USER', 'postgres'),
                    password: config.get('DB_PASSWORD', ''),
                    database: config.get('DB_NAME', 'autogest'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            clientes_module_1.ClientesModule,
            ordens_module_1.OrdensModule,
            estoque_module_1.EstoqueModule,
            financeiro_module_1.FinanceiroModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map