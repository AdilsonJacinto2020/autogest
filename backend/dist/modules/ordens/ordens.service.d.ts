import { Repository } from 'typeorm';
import { OrdemDeServico } from './ordem.entity';
import { CreateOrdemDto, UpdateOrdemDto, UpdateStatusDto } from './ordens.dto';
export declare class OrdensService {
    private readonly repo;
    constructor(repo: Repository<OrdemDeServico>);
    findAll(status?: string): Promise<OrdemDeServico[]>;
    findOne(id: number): Promise<OrdemDeServico>;
    create(dto: CreateOrdemDto): Promise<OrdemDeServico>;
    update(id: number, dto: UpdateOrdemDto): Promise<OrdemDeServico>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<OrdemDeServico>;
    remove(id: number): Promise<OrdemDeServico>;
}
