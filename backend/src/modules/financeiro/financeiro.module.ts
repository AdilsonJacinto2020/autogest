import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './movimentacao.entity';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroController } from './financeiro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao])],
  controllers: [FinanceiroController],
  providers: [FinanceiroService],
})
export class FinanceiroModule {}
