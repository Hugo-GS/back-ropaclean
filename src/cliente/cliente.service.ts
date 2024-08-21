import { Injectable } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async registrarCliente(clienteData: any) {
    const { nombre, apellidoPaterno, apellidoMaterno, ci, telefono, lat, long, password } = clienteData;

    // Registrar persona
    const idPersona = await this.clienteRepository.registrarPersona(
      nombre, apellidoPaterno, apellidoMaterno, ci, telefono
    );

    // Registrar cliente
    const codCliente = await this.clienteRepository.registrarCliente(idPersona);

    // Registrar ubicación
    await this.clienteRepository.registrarUbicacion(codCliente, lat, long);

    // Generar nombre de usuario
    const username = `${nombre}${apellidoPaterno.charAt(0)}${apellidoMaterno.charAt(0)}${codCliente}`;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const idTipoUsuario = 1; // Cliente
    await this.clienteRepository.crearUsuario(idPersona, username, hashedPassword, idTipoUsuario);

    return { message: 'Cliente registrado exitosamente', cliente: { idPersona, codCliente, username } };
  }
  
  async obtenerDatosPorCodigo(codigo: number): Promise<any> {
    return await this.clienteRepository.findClienteByCodigo(codigo);
  }

  async obtenerDatosPorNombreUsuario(nombreUsuario: string): Promise<any> {
    return await this.clienteRepository.findClienteByNombreUsuario(nombreUsuario);
  }
}
