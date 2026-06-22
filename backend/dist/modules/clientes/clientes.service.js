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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_entity_1 = require("./cliente.entity");
let ClientesService = class ClientesService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(search) {
        const qb = this.repo.createQueryBuilder('c').leftJoinAndSelect('c.veiculos', 'v');
        if (search) {
            qb.where('c.nome ILIKE :s OR v.placa ILIKE :s OR c.telefone ILIKE :s', { s: `%${search}%` });
        }
        return qb.orderBy('c.nome').getMany();
    }
    async findOne(id) {
        const c = await this.repo.findOne({ where: { id }, relations: ['veiculos'] });
        if (!c)
            throw new common_1.NotFoundException(`Cliente #${id} não encontrado`);
        return c;
    }
    create(dto) {
        const cliente = this.repo.create(dto);
        return this.repo.save(cliente);
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, { nome: dto.nome, telefone: dto.telefone, email: dto.email });
        return this.findOne(id);
    }
    async remove(id) {
        const c = await this.findOne(id);
        return this.repo.remove(c);
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map