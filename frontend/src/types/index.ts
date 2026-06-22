export interface Veiculo {
  id: number
  modelo: string
  placa: string
  ano?: number
  cor?: string
  clienteId: number
}

export interface Cliente {
  id: number
  nome: string
  telefone?: string
  email?: string
  veiculos: Veiculo[]
  criadoEm: string
}

export type StatusOS = 'orcamento' | 'em_execucao' | 'concluido'

export interface OrdemDeServico {
  id: number
  descricao: string
  status: StatusOS
  valorPecas: number
  valorMaoDeObra: number
  observacoes?: string
  criadoEm: string
  atualizadoEm: string
  veiculo: Veiculo & { cliente: Cliente }
}

export interface Peca {
  id: number
  nome: string
  codigo?: string
  quantidade: number
  quantidadeMinima: number
  precoCusto?: number
  precoVenda?: number
}

export interface Movimentacao {
  id: number
  tipo: 'entrada' | 'saida'
  descricao: string
  valor: number
  osId?: number
  data: string
}

export interface ResumoFinanceiro {
  entradas: number
  saidas: number
  saldo: number
  mes: number
  ano: number
}
