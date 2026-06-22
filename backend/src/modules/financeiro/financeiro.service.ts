import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimentacao } from './movimentacao.entity';
import { CreateMovimentacaoDto } from './financeiro.dto';

@Injectable()
export class FinanceiroService {
  constructor(@InjectRepository(Movimentacao) private readonly repo: Repository<Movimentacao>) {}

  async findAll(tipo?: string) {
    const qb = this.repo.createQueryBuilder('m').orderBy('m.data', 'DESC');
    if (tipo) qb.where('m.tipo = :tipo', { tipo });
    return qb.getMany();
  }

  async resumo(mes?: number, ano?: number) {
    const now = new Date();
    const m = mes ?? now.getMonth() + 1;
    const a = ano ?? now.getFullYear();

    const rows = await this.repo.createQueryBuilder('m')
      .select('m.tipo', 'tipo')
      .addSelect('SUM(m.valor)', 'total')
      .where('EXTRACT(MONTH FROM m.data) = :m AND EXTRACT(YEAR FROM m.data) = :a', { m, a })
      .groupBy('m.tipo')
      .getRawMany();

    const entradas = Number(rows.find((r) => r.tipo === 'entrada')?.total ?? 0);
    const saidas = Number(rows.find((r) => r.tipo === 'saida')?.total ?? 0);
    return { entradas, saidas, saldo: entradas - saidas, mes: m, ano: a };
  }

  create(dto: CreateMovimentacaoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async remove(id: number) {
    const m = await this.repo.findOne({ where: { id } });
    return this.repo.remove(m);
  }
}
