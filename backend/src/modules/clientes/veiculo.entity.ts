import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('veiculos')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente, (c) => c.veiculos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ length: 100 })
  modelo: string;

  @Column({ length: 10, unique: true })
  placa: string;

  @Column({ nullable: true })
  ano: number;

  @Column({ length: 40, nullable: true })
  cor: string;
}
