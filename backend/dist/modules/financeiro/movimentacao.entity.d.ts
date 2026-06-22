import { OrdemDeServico } from '../ordens/ordem.entity';
export declare class Movimentacao {
    id: number;
    tipo: 'entrada' | 'saida';
    descricao: string;
    valor: number;
    osId: number;
    os: OrdemDeServico;
    data: Date;
}
