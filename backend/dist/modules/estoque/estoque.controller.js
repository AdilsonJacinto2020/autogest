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
exports.EstoqueController = void 0;
const common_1 = require("@nestjs/common");
const estoque_service_1 = require("./estoque.service");
const estoque_dto_1 = require("./estoque.dto");
let EstoqueController = class EstoqueController {
    constructor(svc) {
        this.svc = svc;
    }
    findAll(baixo) {
        return this.svc.findAll(baixo === 'true');
    }
    findOne(id) {
        return this.svc.findOne(id);
    }
    create(dto) {
        return this.svc.create(dto);
    }
    update(id, dto) {
        return this.svc.update(id, dto);
    }
    ajustar(id, dto) {
        return this.svc.ajustarEstoque(id, dto);
    }
    remove(id) {
        return this.svc.remove(id);
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('baixo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estoque_dto_1.CreatePecaDto]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, estoque_dto_1.UpdatePecaDto]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/ajuste'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, estoque_dto_1.AjusteEstoqueDto]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "ajustar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "remove", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, common_1.Controller)('estoque'),
    __metadata("design:paramtypes", [estoque_service_1.EstoqueService])
], EstoqueController);
//# sourceMappingURL=estoque.controller.js.map