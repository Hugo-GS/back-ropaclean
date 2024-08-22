import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ReportesRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Pool,
  ) {}

  async obtenerReporteVentasPorPeriodo(fechaInicio: string, fechaFin: string): Promise<any[]> {
    const sql = `CALL reporte_ventas_por_periodo(?, ?)`;
    const [rows]: any[] = await this.connection.query(sql, [fechaInicio, fechaFin]);
    
    
    return rows[0];
  }
}