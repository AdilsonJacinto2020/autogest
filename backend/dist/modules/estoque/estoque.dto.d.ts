export declare class CreatePecaDto {
    nome: string;
    codigo?: string;
    quantidade?: number;
    quantidadeMinima?: number;
    precoCusto?: number;
    precoVenda?: number;
}
export declare class UpdatePecaDto extends CreatePecaDto {
}
export declare class AjusteEstoqueDto {
    quantidade: number;
}
