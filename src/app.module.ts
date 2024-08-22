import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { ServicioModule } from './servicio/servicio.module';
import { VentaModule } from './venta/venta.module';
import { ReportesModule } from './reportes/reportes.module';


@Module({
  imports: [DatabaseModule, AuthModule, ClienteModule, ServicioModule, VentaModule, ReportesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
