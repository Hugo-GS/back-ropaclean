import { Injectable } from '@nestjs/common';
import { ReportesRepository } from './reportes.repository';

@Injectable()
export class ReportesService {
  constructor(private readonly reportesRepository: ReportesRepository) {}

  async obtenerReportePorPeriodo(fechaInicio: string, fechaFin: string): Promise<any[]> {
    return await this.reportesRepository.obtenerReporteVentasPorPeriodo(fechaInicio, fechaFin);
  }

}
