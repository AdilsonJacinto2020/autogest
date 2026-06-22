import { Veiculo } from '../clientes/veiculo.entity';
export type StatusOS = 'orcamento' | 'em_execucao' | 'concluido';
export declare class OrdemDeServico {
    id: number;
    veiculoId: number;
    veiculo: Veiculo;
    descricao: string;
    status: StatusOS;
    valorPecas: number;
    valorMaoDeObra: number;
    observacoes: string;
    criadoEm: Date;
    atualizadoEm: Date;
    get valorTotal(): number;
}
