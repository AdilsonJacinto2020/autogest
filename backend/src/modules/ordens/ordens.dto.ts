import { IsString, IsOptional, IsNumber, IsIn, IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrdemDto {
  @IsInt() veiculoId: number;
  @IsString() @IsNotEmpty() descricao: string;
  @IsOptional() @IsIn(['orcamento', 'em_execucao', 'concluido']) status?: string;
  @IsOptional() @IsNumber() valorPecas?: number;
  @IsOptional() @IsNumber() valorMaoDeObra?: number;
  @IsOptional() @IsString() observacoes?: string;
}

export class UpdateOrdemDto extends CreateOrdemDto {}

export class UpdateStatusDto {
  @IsIn(['orcamento', 'em_execucao', 'concluido']) status: string;
}
