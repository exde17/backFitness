import { Module } from '@nestjs/common';
import { RespuestaParqService } from './respuesta-parq.service';
import { RespuestaParqController } from './respuesta-parq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaParq } from './entities/respuesta-parq.entity';

@Module({
  controllers: [RespuestaParqController],
  providers: [RespuestaParqService],
  imports: [TypeOrmModule.forFeature([RespuestaParq])],
})
export class RespuestaParqModule {}
