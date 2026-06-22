export declare class CreateOrdemDto {
    veiculoId: number;
    descricao: string;
    status?: string;
    valorPecas?: number;
    valorMaoDeObra?: number;
    observacoes?: string;
}
export declare class UpdateOrdemDto extends CreateOrdemDto {
}
export declare class UpdateStatusDto {
    status: string;
}
