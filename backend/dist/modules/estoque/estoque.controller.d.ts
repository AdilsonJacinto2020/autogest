import { EstoqueService } from './estoque.service';
import { CreatePecaDto, UpdatePecaDto, AjusteEstoqueDto } from './estoque.dto';
export declare class EstoqueController {
    private readonly svc;
    constructor(svc: EstoqueService);
    findAll(baixo?: string): Promise<import("./peca.entity").Peca[]>;
    findOne(id: number): Promise<import("./peca.entity").Peca>;
    create(dto: CreatePecaDto): Promise<import("./peca.entity").Peca>;
    update(id: number, dto: UpdatePecaDto): Promise<import("./peca.entity").Peca>;
    ajustar(id: number, dto: AjusteEstoqueDto): Promise<import("./peca.entity").Peca>;
    remove(id: number): Promise<import("./peca.entity").Peca>;
}
