import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ServicioRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Pool,
  ) {}

  async obtenerServiciosConPreciosActivos(): Promise<any[]> {
    const [rows]: any[] = await this.connection.query(`
      SELECT s.id, s.nombre, s.estado_actividad, p.valor
      FROM servicio s
      INNER JOIN precio p ON s.id = p.id_servicio
      WHERE p.fecha_hr_fin IS NULL
    `);
    return rows;
  }
}
