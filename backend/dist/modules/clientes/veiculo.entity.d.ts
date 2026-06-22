import { Cliente } from './cliente.entity';
export declare class Veiculo {
    id: number;
    clienteId: number;
    cliente: Cliente;
    modelo: string;
    placa: string;
    ano: number;
    cor: string;
}
