// database.module.ts
import { Module } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const pool = await mysql.createPool({
          host: '127.0.0.1',
          user: 'usuario1',
          password: 'passusuario1',
          database: 'sistemaropaclean',
        });
        console.log('Conexión a la base de datos establecida.');
        return pool;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}