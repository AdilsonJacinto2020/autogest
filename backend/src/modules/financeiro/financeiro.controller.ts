import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { CreateMovimentacaoDto } from './financeiro.dto';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly svc: FinanceiroService) {}

  @Get()
  findAll(@Query('tipo') tipo?: string) {
    return this.svc.findAll(tipo);
  }

  @Get('resumo')
  resumo(@Query('mes') mes?: string, @Query('ano') ano?: string) {
    return this.svc.resumo(mes ? +mes : undefined, ano ? +ano : undefined);
  }

  @Post()
  create(@Body() dto: CreateMovimentacaoDto) {
    return this.svc.create(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
