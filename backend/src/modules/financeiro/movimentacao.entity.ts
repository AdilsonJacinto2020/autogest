import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { OrdemDeServico } from '../ordens/ordem.entity';

@Entity('financeiro')
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  tipo: 'entrada' | 'saida';

  @Column({ length: 200 })
  descricao: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor: number;

  @Column({ name: 'os_id', nullable: true })
  osId: number;

  @ManyToOne(() => OrdemDeServico, { nullable: true, eager: false })
  @JoinColumn({ name: 'os_id' })
  os: OrdemDeServico;

  @CreateDateColumn()
  data: Date;
}
