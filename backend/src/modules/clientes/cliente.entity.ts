import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Veiculo } from './veiculo.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @OneToMany(() => Veiculo, (v) => v.cliente, { cascade: true, eager: true })
  veiculos: Veiculo[];
}
