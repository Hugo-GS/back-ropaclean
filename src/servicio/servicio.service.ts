import { Injectable } from '@nestjs/common';
import { ServicioRepository } from './servicio.repository';

@Injectable()
export class ServicioService {
  constructor(private readonly servicioRepository: ServicioRepository) {}

  async obtenerServiciosConPreciosActivos(): Promise<any[]> {
    return this.servicioRepository.obtenerServiciosConPreciosActivos();
  }
}
