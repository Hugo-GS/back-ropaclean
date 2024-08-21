import { Controller, Post, Body, Get , Param} from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('registrar')
  async registrarCliente(
    @Body('nombre') nombre: string,
    @Body('apellidoPaterno') apellidoPaterno: string,
    @Body('apellidoMaterno') apellidoMaterno: string,
    @Body('ci') ci: string,
    @Body('telefono') telefono: string,
    @Body('lat') lat: number,
    @Body('long') long: number,
    @Body('password') password: string,
  ) {
    const clienteData = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      ci,
      telefono,
      lat,
      long,
      password,
    };

    const result = await this.clienteService.registrarCliente(clienteData);
    return result;
  }
  @Get(':codigo')
  async obtenerDatosClientePorCodigo(@Param('codigo') codigo: number) {
    const cliente = await this.clienteService.obtenerDatosPorCodigo(codigo);
    if (cliente) {
      return { message: 'Cliente encontrado', cliente };
    } else {
      return { message: 'Cliente no encontrado' };
    }
  }

  @Get('nombre/:nombreUsuario')
  async obtenerDatosClientePorNombreUsuario(@Param('nombreUsuario') nombre: string) {
    const cliente = await this.clienteService.obtenerDatosPorNombreUsuario(nombre);
    if (cliente) {
      return { message: 'Cliente encontrado', cliente };
    } else {
      return { message: 'Cliente no encontrado' };
    }
  }

}
