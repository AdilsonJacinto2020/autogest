import { ClientesService } from './clientes.service';
import { CreateClienteDto, UpdateClienteDto } from './clientes.dto';
export declare class ClientesController {
    private readonly svc;
    constructor(svc: ClientesService);
    findAll(search?: string): Promise<import("./cliente.entity").Cliente[]>;
    findOne(id: number): Promise<import("./cliente.entity").Cliente>;
    create(dto: CreateClienteDto): Promise<import("./cliente.entity").Cliente>;
    update(id: number, dto: UpdateClienteDto): Promise<import("./cliente.entity").Cliente>;
    remove(id: number): Promise<import("./cliente.entity").Cliente>;
}
