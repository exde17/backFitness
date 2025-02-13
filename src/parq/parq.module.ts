import { Module } from '@nestjs/common';
import { ParqService } from './parq.service';
import { ParqController } from './parq.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parq } from './entities/parq.entity';
import { PreguntaParqModule } from './pregunta-parq/pregunta-parq.module';
import { RespuestaParqModule } from './respuesta-parq/respuesta-parq.module';

@Module({
  controllers: [ParqController],
  providers: [ParqService],
  imports: [TypeOrmModule.forFeature([Parq]), PreguntaParqModule, RespuestaParqModule],
})
export class ParqModule {}
