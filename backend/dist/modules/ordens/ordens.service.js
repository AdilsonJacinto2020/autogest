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
exports.OrdensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ordem_entity_1 = require("./ordem.entity");
let OrdensService = class OrdensService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(status) {
        const qb = this.repo.createQueryBuilder('os')
            .leftJoinAndSelect('os.veiculo', 'v')
            .leftJoinAndSelect('v.cliente', 'c')
            .orderBy('os.criado_em', 'DESC');
        if (status)
            qb.where('os.status = :status', { status });
        return qb.getMany();
    }
    async findOne(id) {
        const os = await this.repo.findOne({ where: { id }, relations: ['veiculo', 'veiculo.cliente'] });
        if (!os)
            throw new common_1.NotFoundException(`OS #${id} não encontrada`);
        return os;
    }
    create(dto) {
        const os = this.repo.create({
            veiculoId: dto.veiculoId,
            descricao: dto.descricao,
            status: dto.status || 'orcamento',
            valorPecas: dto.valorPecas || 0,
            valorMaoDeObra: dto.valorMaoDeObra || 0,
            observacoes: dto.observacoes,
        });
        return this.repo.save(os);
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, {
            descricao: dto.descricao,
            status: dto.status,
            valorPecas: dto.valorPecas,
            valorMaoDeObra: dto.valorMaoDeObra,
            observacoes: dto.observacoes,
        });
        return this.findOne(id);
    }
    async updateStatus(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, { status: dto.status });
        return this.findOne(id);
    }
    async remove(id) {
        const os = await this.findOne(id);
        return this.repo.remove(os);
    }
};
exports.OrdensService = OrdensService;
exports.OrdensService = OrdensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ordem_entity_1.OrdemDeServico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdensService);
//# sourceMappingURL=ordens.service.js.map