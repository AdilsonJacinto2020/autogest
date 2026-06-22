import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Veiculo } from '../clientes/veiculo.entity';

export type StatusOS = 'orcamento' | 'em_execucao' | 'concluido';

@Entity('ordens_de_servico')
export class OrdemDeServico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'veiculo_id' })
  veiculoId: number;

  @ManyToOne(() => Veiculo, { eager: true })
  @JoinColumn({ name: 'veiculo_id' })
  veiculo: Veiculo;

  @Column('text')
  descricao: string;

  @Column({ default: 'orcamento' })
  status: StatusOS;

  @Column({ name: 'valor_pecas', type: 'numeric', precision: 10, scale: 2, default: 0 })
  valorPecas: number;

  @Column({ name: 'valor_mao_de_obra', type: 'numeric', precision: 10, scale: 2, default: 0 })
  valorMaoDeObra: number;

  @Column({ nullable: true, type: 'text' })
  observacoes: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  get valorTotal(): number {
    return Number(this.valorPecas) + Number(this.valorMaoDeObra);
  }
}
