import { IsString, IsOptional, IsEmail, IsNotEmpty, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVeiculoDto {
  @IsString() @IsNotEmpty() modelo: string;
  @IsString() @IsNotEmpty() placa: string;
  @IsOptional() @IsInt() ano?: number;
  @IsOptional() @IsString() cor?: string;
}

export class CreateClienteDto {
  @IsString() @IsNotEmpty() nome: string;
  @IsOptional() @IsString() telefone?: string;
  @IsOptional() @IsEmail() email?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVeiculoDto)
  veiculos?: CreateVeiculoDto[];
}

export class UpdateClienteDto extends CreateClienteDto {}
