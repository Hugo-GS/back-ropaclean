import { Injectable } from '@nestjs/common';
import { VentaRepository } from './venta.repository';

@Injectable()
export class VentaService {
  constructor(private readonly ventaRepository: VentaRepository) {}

  async registrarVentaServicio(
    codCliente: number,
    servicios: { idServicio: number, cantidad: number }[]
  ): Promise<any> {
    const date: Date = new Date();
    const fecha_hr = date.toISOString().slice(0, 19).replace("T"," ");
    const idVentaServicio = await this.ventaRepository.registrarRecepcionVenta(codCliente, fecha_hr);
    const result = this.ventaRepository.registrarDetalleVenta(idVentaServicio, servicios);

    return { message: 'Venta de servicio registrada exitosamente', idVentaServicio, result };
  }
}
