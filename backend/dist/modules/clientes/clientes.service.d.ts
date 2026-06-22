import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto, UpdateClienteDto } from './clientes.dto';
export declare class ClientesService {
    private readonly repo;
    constructor(repo: Repository<Cliente>);
    findAll(search?: string): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    create(dto: CreateClienteDto): Promise<Cliente>;
    update(id: number, dto: UpdateClienteDto): Promise<Cliente>;
    remove(id: number): Promise<Cliente>;
}
