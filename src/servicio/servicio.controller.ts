import { Controller, Get } from '@nestjs/common';
import { ServicioService } from './servicio.service';

@Controller('servicios')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Get()
  async obtenerServiciosConPreciosActivos() {
    return this.servicioService.obtenerServiciosConPreciosActivos();
  }


  
}
