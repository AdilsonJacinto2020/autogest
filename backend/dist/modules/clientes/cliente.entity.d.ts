import { Veiculo } from './veiculo.entity';
export declare class Cliente {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    criadoEm: Date;
    veiculos: Veiculo[];
}
