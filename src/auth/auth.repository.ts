import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Pool,
  ) {}

  async findUserByUsername(username: string): Promise<any> {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM usuario WHERE username = ?',
        [username],
      );
      return rows[0];
    } catch (error) {
      console.error('Error al buscar usuario por nombre de usuario:', error);
      throw new Error('Error al buscar usuario');
    }
  }
}
