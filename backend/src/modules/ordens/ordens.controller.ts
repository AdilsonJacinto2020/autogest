import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { OrdensService } from './ordens.service';
import { CreateOrdemDto, UpdateOrdemDto, UpdateStatusDto } from './ordens.dto';

@Controller('ordens')
export class OrdensController {
  constructor(private readonly svc: OrdensService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.svc.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateOrdemDto) {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrdemDto) {
    return this.svc.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatusDto) {
    return this.svc.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
