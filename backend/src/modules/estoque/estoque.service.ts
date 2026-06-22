import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Peca } from './peca.entity';
import { CreatePecaDto, UpdatePecaDto, AjusteEstoqueDto } from './estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(@InjectRepository(Peca) private readonly repo: Repository<Peca>) {}

  findAll(apenasAbaixoMinimo?: boolean) {
    const qb = this.repo.createQueryBuilder('p').orderBy('p.nome');
    if (apenasAbaixoMinimo) qb.where('p.quantidade < p.quantidade_minima');
    return qb.getMany();
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Peça #${id} não encontrada`);
    return p;
  }

  create(dto: CreatePecaDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdatePecaDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async ajustarEstoque(id: number, dto: AjusteEstoqueDto) {
    const peca = await this.findOne(id);
    peca.quantidade += dto.quantidade;
    return this.repo.save(peca);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    return this.repo.remove(p);
  }
}
