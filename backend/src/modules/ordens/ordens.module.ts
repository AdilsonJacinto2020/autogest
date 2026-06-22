import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemDeServico } from './ordem.entity';
import { OrdensService } from './ordens.service';
import { OrdensController } from './ordens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdemDeServico])],
  controllers: [OrdensController],
  providers: [OrdensService],
  exports: [OrdensService],
})
export class OrdensModule {}
