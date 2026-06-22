import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemDeServico } from './ordem.entity';
import { CreateOrdemDto, UpdateOrdemDto, UpdateStatusDto } from './ordens.dto';

@Injectable()
export class OrdensService {
  constructor(
    @InjectRepository(OrdemDeServico) private readonly repo: Repository<OrdemDeServico>,
  ) {}

  findAll(status?: string) {
    const qb = this.repo.createQueryBuilder('os')
      .leftJoinAndSelect('os.veiculo', 'v')
      .leftJoinAndSelect('v.cliente', 'c')
      .orderBy('os.criado_em', 'DESC');
    if (status) qb.where('os.status = :status', { status });
    return qb.getMany();
  }

  async findOne(id: number) {
    const os = await this.repo.findOne({ where: { id }, relations: ['veiculo', 'veiculo.cliente'] });
    if (!os) throw new NotFoundException(`OS #${id} não encontrada`);
    return os;
  }

  create(dto: CreateOrdemDto) {
    const os = this.repo.create({
      veiculoId: dto.veiculoId,
      descricao: dto.descricao,
      status: (dto.status as any) || 'orcamento',
      valorPecas: dto.valorPecas || 0,
      valorMaoDeObra: dto.valorMaoDeObra || 0,
      observacoes: dto.observacoes,
    });
    return this.repo.save(os);
  }

  async update(id: number, dto: UpdateOrdemDto) {
    await this.findOne(id);
    await this.repo.update(id, {
      descricao: dto.descricao,
      status: dto.status as any,
      valorPecas: dto.valorPecas,
      valorMaoDeObra: dto.valorMaoDeObra,
      observacoes: dto.observacoes,
    });
    return this.findOne(id);
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    await this.findOne(id);
    await this.repo.update(id, { status: dto.status as any });
    return this.findOne(id);
  }

  async remove(id: number) {
    const os = await this.findOne(id);
    return this.repo.remove(os);
  }
}
