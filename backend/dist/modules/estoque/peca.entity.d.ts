export declare class Peca {
    id: number;
    nome: string;
    codigo: string;
    quantidade: number;
    quantidadeMinima: number;
    precoCusto: number;
    precoVenda: number;
    get estoqueBaixo(): boolean;
}
