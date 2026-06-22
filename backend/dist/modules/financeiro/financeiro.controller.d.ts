import { FinanceiroService } from './financeiro.service';
import { CreateMovimentacaoDto } from './financeiro.dto';
export declare class FinanceiroController {
    private readonly svc;
    constructor(svc: FinanceiroService);
    findAll(tipo?: string): Promise<import("./movimentacao.entity").Movimentacao[]>;
    resumo(mes?: string, ano?: string): Promise<{
        entradas: number;
        saidas: number;
        saldo: number;
        mes: number;
        ano: number;
    }>;
    create(dto: CreateMovimentacaoDto): Promise<import("./movimentacao.entity").Movimentacao>;
    remove(id: number): Promise<import("./movimentacao.entity").Movimentacao>;
}
