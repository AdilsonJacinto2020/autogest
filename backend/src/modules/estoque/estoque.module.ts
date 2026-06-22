import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peca } from './peca.entity';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Peca])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
