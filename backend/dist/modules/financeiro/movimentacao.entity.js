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
exports.Movimentacao = void 0;
const typeorm_1 = require("typeorm");
const ordem_entity_1 = require("../ordens/ordem.entity");
let Movimentacao = class Movimentacao {
};
exports.Movimentacao = Movimentacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Movimentacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Movimentacao.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Movimentacao.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Movimentacao.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'os_id', nullable: true }),
    __metadata("design:type", Number)
], Movimentacao.prototype, "osId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ordem_entity_1.OrdemDeServico, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'os_id' }),
    __metadata("design:type", ordem_entity_1.OrdemDeServico)
], Movimentacao.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Movimentacao.prototype, "data", void 0);
exports.Movimentacao = Movimentacao = __decorate([
    (0, typeorm_1.Entity)('financeiro')
], Movimentacao);
//# sourceMappingURL=movimentacao.entity.js.map