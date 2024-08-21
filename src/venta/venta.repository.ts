import { Inject, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class VentaRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Pool,
  ) {}

  async registrarRecepcionVenta(
    codCliente: number,
    fecha_hr_venta: string,
  ): Promise<number> {
    try {
      const [results]: any[] = await this.connection.execute(
        'CALL registrar_recepcion_venta(?, NULL, ?)',
        [codCliente, fecha_hr_venta],
      );

      // Verificar si el resultado es válido
      if (!results || results.length === 0 || !results[0][0]?.id_venta) {
        throw new Error('No se pudo obtener el ID de la venta');
      }

      return results[0][0].id_venta;
    } catch (error) {
      console.error('Error al registrar recepción y venta:', error);
      throw error;
    }
  }

  async registrarDetalleVenta(
    idVenta: number,
    servicios: { idServicio: number; cantidad: number }[],
  ): Promise<number> {
    try {
      let pServicios = '';
      servicios.forEach((servicio) => {
        pServicios += `${servicio.idServicio},${servicio.cantidad};`;
      });

      console.log({ idVenta, pServicios });
      pServicios = pServicios.substring(0, pServicios.length - 1);
      const [result]: [ResultSetHeader, any[]] = await this.connection.query(
        `CALL registrar_detalle_venta(?,?);`,
        [idVenta, pServicios],
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al registrar detalleventa:', error);
      throw error;
    }
  }
}
