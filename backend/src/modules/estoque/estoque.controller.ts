import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CreatePecaDto, UpdatePecaDto, AjusteEstoqueDto } from './estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly svc: EstoqueService) {}

  @Get()
  findAll(@Query('baixo') baixo?: string) {
    return this.svc.findAll(baixo === 'true');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePecaDto) {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePecaDto) {
    return this.svc.update(id, dto);
  }

  @Patch(':id/ajuste')
  ajustar(@Param('id', ParseIntPipe) id: number, @Body() dto: AjusteEstoqueDto) {
    return this.svc.ajustarEstoque(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
