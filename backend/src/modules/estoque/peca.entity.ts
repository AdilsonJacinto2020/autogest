import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estoque')
export class Peca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 50, nullable: true, unique: true })
  codigo: string;

  @Column({ default: 0 })
  quantidade: number;

  @Column({ name: 'quantidade_minima', default: 5 })
  quantidadeMinima: number;

  @Column({ name: 'preco_custo', type: 'numeric', precision: 10, scale: 2, nullable: true })
  precoCusto: number;

  @Column({ name: 'preco_venda', type: 'numeric', precision: 10, scale: 2, nullable: true })
  precoVenda: number;

  get estoqueBaixo(): boolean {
    return this.quantidade < this.quantidadeMinima;
  }
}
