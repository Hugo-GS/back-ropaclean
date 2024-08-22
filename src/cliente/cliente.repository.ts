import { Inject, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class ClienteRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Pool,
  ) {}

  async registrarPersona(
    nombre: string, 
    apellidoPaterno: string, 
    apellidoMaterno: string, 
    ci: string, 
    telefono: string
  ): Promise<number> {
    const [result]: [ResultSetHeader, any[]] = await this.connection.query(
      'INSERT INTO persona (nombre, apellido_paterno, apellido_materno, ci, telefono) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellidoPaterno, apellidoMaterno, ci, telefono],
    );
    return result.insertId;
  }

  async registrarCliente(idPersona: number): Promise<number> {
    const [result]: [ResultSetHeader, any[]] = await this.connection.query(
      'INSERT INTO cliente (id_persona) VALUES (?)',
      [idPersona],
    );
    return result.insertId;
  }

  async registrarUbicacion(codCliente: number, lat: number, lng: number): Promise<void> {
    await this.connection.query(
      'INSERT INTO ubicacion (cod_cliente, lat, lng) VALUES (?, ?, ?)',
      [codCliente, lat, lng],
    );
  }

  async crearUsuario(
    idPersona: number,
    username: string,
    hashedPassword: string,
    idTipoUsuario: number
  ): Promise<void> {
    await this.connection.query(
      'INSERT INTO usuario (id, username, password, id_tipousuario) VALUES (?, ?, ?, ?)',
      [idPersona, username, hashedPassword, idTipoUsuario],
    );
  }

  async findClienteByCodigo(codigo: number): Promise<any> {
    try {
      const [rows] = await this.connection.query(
        'SELECT persona.*, ubicacion.* FROM cliente JOIN persona ON cliente.id_persona = persona.id JOIN ubicacion ON ubicacion.cod_cliente=cliente.codigo WHERE cliente.codigo = ?',
        [codigo],
      );
      return rows[0];
    } catch (error) {
      console.error('Error al buscar cliente por código:', error);
      throw new Error('Error al buscar cliente');
    }
  }

  async findClienteByNombreUsuario(nombre: string): Promise<any> {
    try {
      const [rows] = await this.connection.query(
        `SELECT 
          persona.*, 
          ubicacion.*, 
          cliente.* 
        FROM cliente 
        JOIN persona 
        ON 
          cliente.id_persona = persona.id 
        JOIN ubicacion 
        ON 
          ubicacion.cod_cliente=cliente.codigo 
        JOIN usuario 
        ON
          usuario.id = persona.id
        WHERE 
          usuario.username = ?`,
        [nombre],
      );
      return rows[0];
    } catch (error) {
      console.error('Error al buscar cliente por código:', error);
      throw new Error('Error al buscar cliente');
    }
  }
}
