import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto, UpdateClienteDto } from './clientes.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly repo: Repository<Cliente>,
  ) {}

  findAll(search?: string) {
    const qb = this.repo.createQueryBuilder('c').leftJoinAndSelect('c.veiculos', 'v');
    if (search) {
      qb.where('c.nome ILIKE :s OR v.placa ILIKE :s OR c.telefone ILIKE :s', { s: `%${search}%` });
    }
    return qb.orderBy('c.nome').getMany();
  }

  async findOne(id: number) {
    const c = await this.repo.findOne({ where: { id }, relations: ['veiculos'] });
    if (!c) throw new NotFoundException(`Cliente #${id} não encontrado`);
    return c;
  }

  create(dto: CreateClienteDto) {
    const cliente = this.repo.create(dto);
    return this.repo.save(cliente);
  }

  async update(id: number, dto: UpdateClienteDto) {
    await this.findOne(id);
    await this.repo.update(id, { nome: dto.nome, telefone: dto.telefone, email: dto.email });
    return this.findOne(id);
  }

  async remove(id: number) {
    const c = await this.findOne(id);
    return this.repo.remove(c);
  }
}
