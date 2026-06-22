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
exports.FinanceiroService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movimentacao_entity_1 = require("./movimentacao.entity");
let FinanceiroService = class FinanceiroService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(tipo) {
        const qb = this.repo.createQueryBuilder('m').orderBy('m.data', 'DESC');
        if (tipo)
            qb.where('m.tipo = :tipo', { tipo });
        return qb.getMany();
    }
    async resumo(mes, ano) {
        const now = new Date();
        const m = mes ?? now.getMonth() + 1;
        const a = ano ?? now.getFullYear();
        const rows = await this.repo.createQueryBuilder('m')
            .select('m.tipo', 'tipo')
            .addSelect('SUM(m.valor)', 'total')
            .where('EXTRACT(MONTH FROM m.data) = :m AND EXTRACT(YEAR FROM m.data) = :a', { m, a })
            .groupBy('m.tipo')
            .getRawMany();
        const entradas = Number(rows.find((r) => r.tipo === 'entrada')?.total ?? 0);
        const saidas = Number(rows.find((r) => r.tipo === 'saida')?.total ?? 0);
        return { entradas, saidas, saldo: entradas - saidas, mes: m, ano: a };
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async remove(id) {
        const m = await this.repo.findOne({ where: { id } });
        return this.repo.remove(m);
    }
};
exports.FinanceiroService = FinanceiroService;
exports.FinanceiroService = FinanceiroService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movimentacao_entity_1.Movimentacao)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FinanceiroService);
//# sourceMappingURL=financeiro.service.js.map