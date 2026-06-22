import { Repository } from 'typeorm';
import { Peca } from './peca.entity';
import { CreatePecaDto, UpdatePecaDto, AjusteEstoqueDto } from './estoque.dto';
export declare class EstoqueService {
    private readonly repo;
    constructor(repo: Repository<Peca>);
    findAll(apenasAbaixoMinimo?: boolean): Promise<Peca[]>;
    findOne(id: number): Promise<Peca>;
    create(dto: CreatePecaDto): Promise<Peca>;
    update(id: number, dto: UpdatePecaDto): Promise<Peca>;
    ajustarEstoque(id: number, dto: AjusteEstoqueDto): Promise<Peca>;
    remove(id: number): Promise<Peca>;
}
