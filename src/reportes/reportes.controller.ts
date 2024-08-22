import { Controller, Post, Body, Get , Param, Query} from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('ventas')
  async getReporteVentasPorPeriodo(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    const reporte = await this.reportesService.obtenerReportePorPeriodo(fechaInicio, fechaFin);
    return reporte;
  }

}
