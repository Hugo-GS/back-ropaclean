import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ServicioController } from './servicio.controller';
import { ServicioRepository } from './servicio.repository';
import { ServicioService } from './servicio.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicioController],
  providers: [ServicioService, ServicioRepository],
})
export class ServicioModule {}
