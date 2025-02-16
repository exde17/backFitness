import { Module } from '@nestjs/common';
import { RespuestaCaracterizacionService } from './respuesta-caracterizacion.service';
import { RespuestaCaracterizacionController } from './respuesta-caracterizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaCaracterizacion } from './entities/respuesta-caracterizacion.entity';

@Module({
  controllers: [RespuestaCaracterizacionController],
  providers: [RespuestaCaracterizacionService],
  imports: [TypeOrmModule.forFeature([RespuestaCaracterizacion])],
})
export class RespuestaCaracterizacionModule {}
