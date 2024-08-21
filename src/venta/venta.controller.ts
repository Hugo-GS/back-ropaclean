import { Controller, Post, Body } from '@nestjs/common';
import { VentaService } from './venta.service';

@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post('registrar')
  async registrarVentaServicio(
    @Body('codCliente') codCliente: number,
    @Body('servicios') servicios: { idServicio: number, cantidad: number }[]
  ) {
    const result = await this.ventaService.registrarVentaServicio(codCliente, servicios);
    return result;
  }
}
