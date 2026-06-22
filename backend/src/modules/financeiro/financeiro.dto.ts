import { IsString, IsIn, IsNumber, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMovimentacaoDto {
  @IsIn(['entrada', 'saida']) tipo: 'entrada' | 'saida';
  @IsString() @IsNotEmpty() descricao: string;
  @IsNumber() valor: number;
  @IsOptional() @IsInt() osId?: number;
}
