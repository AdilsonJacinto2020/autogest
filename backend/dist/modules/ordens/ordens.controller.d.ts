import { OrdensService } from './ordens.service';
import { CreateOrdemDto, UpdateOrdemDto, UpdateStatusDto } from './ordens.dto';
export declare class OrdensController {
    private readonly svc;
    constructor(svc: OrdensService);
    findAll(status?: string): Promise<import("./ordem.entity").OrdemDeServico[]>;
    findOne(id: number): Promise<import("./ordem.entity").OrdemDeServico>;
    create(dto: CreateOrdemDto): Promise<import("./ordem.entity").OrdemDeServico>;
    update(id: number, dto: UpdateOrdemDto): Promise<import("./ordem.entity").OrdemDeServico>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<import("./ordem.entity").OrdemDeServico>;
    remove(id: number): Promise<import("./ordem.entity").OrdemDeServico>;
}
