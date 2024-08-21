import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';
import { VentaRepository } from './venta.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [VentaController],
  providers: [VentaService, VentaRepository],
})
export class VentaModule {}
