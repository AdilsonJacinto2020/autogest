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
exports.Peca = void 0;
const typeorm_1 = require("typeorm");
let Peca = class Peca {
    get estoqueBaixo() {
        return this.quantidade < this.quantidadeMinima;
    }
};
exports.Peca = Peca;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Peca.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Peca.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, unique: true }),
    __metadata("design:type", String)
], Peca.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Peca.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantidade_minima', default: 5 }),
    __metadata("design:type", Number)
], Peca.prototype, "quantidadeMinima", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preco_custo', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Peca.prototype, "precoCusto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preco_venda', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Peca.prototype, "precoVenda", void 0);
exports.Peca = Peca = __decorate([
    (0, typeorm_1.Entity)('estoque')
], Peca);
//# sourceMappingURL=peca.entity.js.map