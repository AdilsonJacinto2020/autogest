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
exports.EstoqueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const peca_entity_1 = require("./peca.entity");
let EstoqueService = class EstoqueService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(apenasAbaixoMinimo) {
        const qb = this.repo.createQueryBuilder('p').orderBy('p.nome');
        if (apenasAbaixoMinimo)
            qb.where('p.quantidade < p.quantidade_minima');
        return qb.getMany();
    }
    async findOne(id) {
        const p = await this.repo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException(`Peça #${id} não encontrada`);
        return p;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async ajustarEstoque(id, dto) {
        const peca = await this.findOne(id);
        peca.quantidade += dto.quantidade;
        return this.repo.save(peca);
    }
    async remove(id) {
        const p = await this.findOne(id);
        return this.repo.remove(p);
    }
};
exports.EstoqueService = EstoqueService;
exports.EstoqueService = EstoqueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(peca_entity_1.Peca)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstoqueService);
//# sourceMappingURL=estoque.service.js.map