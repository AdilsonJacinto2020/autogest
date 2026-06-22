import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { OrdensModule } from './modules/ordens/ordens.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: parseInt(config.get('DB_PORT', '5432')),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_NAME', 'autogest'),
        autoLoadEntities: true,
        synchronize: true, // desative em produção
      }),
    }),
    ClientesModule,
    OrdensModule,
    EstoqueModule,
    FinanceiroModule,
  ],
})
export class AppModule {}
