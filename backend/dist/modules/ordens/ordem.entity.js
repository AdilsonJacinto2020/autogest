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
exports.OrdemDeServico = void 0;
const typeorm_1 = require("typeorm");
const veiculo_entity_1 = require("../clientes/veiculo.entity");
let OrdemDeServico = class OrdemDeServico {
    get valorTotal() {
        return Number(this.valorPecas) + Number(this.valorMaoDeObra);
    }
};
exports.OrdemDeServico = OrdemDeServico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdemDeServico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'veiculo_id' }),
    __metadata("design:type", Number)
], OrdemDeServico.prototype, "veiculoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veiculo_entity_1.Veiculo, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veiculo_id' }),
    __metadata("design:type", veiculo_entity_1.Veiculo)
], OrdemDeServico.prototype, "veiculo", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OrdemDeServico.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'orcamento' }),
    __metadata("design:type", String)
], OrdemDeServico.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_pecas', type: 'numeric', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrdemDeServico.prototype, "valorPecas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_mao_de_obra', type: 'numeric', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrdemDeServico.prototype, "valorMaoDeObra", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], OrdemDeServico.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], OrdemDeServico.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], OrdemDeServico.prototype, "atualizadoEm", void 0);
exports.OrdemDeServico = OrdemDeServico = __decorate([
    (0, typeorm_1.Entity)('ordens_de_servico')
], OrdemDeServico);
//# sourceMappingURL=ordem.entity.js.map