import { Repository } from 'typeorm';
import { Movimentacao } from './movimentacao.entity';
import { CreateMovimentacaoDto } from './financeiro.dto';
export declare class FinanceiroService {
    private readonly repo;
    constructor(repo: Repository<Movimentacao>);
    findAll(tipo?: string): Promise<Movimentacao[]>;
    resumo(mes?: number, ano?: number): Promise<{
        entradas: number;
        saidas: number;
        saldo: number;
        mes: number;
        ano: number;
    }>;
    create(dto: CreateMovimentacaoDto): Promise<Movimentacao>;
    remove(id: number): Promise<Movimentacao>;
}
