export declare class CreateVeiculoDto {
    modelo: string;
    placa: string;
    ano?: number;
    cor?: string;
}
export declare class CreateClienteDto {
    nome: string;
    telefone?: string;
    email?: string;
    veiculos?: CreateVeiculoDto[];
}
export declare class UpdateClienteDto extends CreateClienteDto {
}
