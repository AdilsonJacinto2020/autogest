import { IsString, IsOptional, IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePecaDto {
  @IsString() @IsNotEmpty() nome: string;
  @IsOptional() @IsString() codigo?: string;
  @IsOptional() @IsInt() quantidade?: number;
  @IsOptional() @IsInt() quantidadeMinima?: number;
  @IsOptional() @IsNumber() precoCusto?: number;
  @IsOptional() @IsNumber() precoVenda?: number;
}

export class UpdatePecaDto extends CreatePecaDto {}

export class AjusteEstoqueDto {
  @IsInt() quantidade: number;
}
