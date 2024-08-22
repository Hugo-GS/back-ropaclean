import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ReportesController } from './reportes.controller';
import { ReportesRepository } from './reportes.repository';
import { ReportesService } from './reportes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportesController],
  providers: [ReportesRepository, ReportesService],
})
export class ReportesModule {}
