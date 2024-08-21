import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.authRepository.findUserByUsername(username);
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error al validar usuario:', error);
      throw new Error('Error al validar usuario');
    }
  }
}
