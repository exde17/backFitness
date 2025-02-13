import { Module } from '@nestjs/common';
import { PreguntaParqService } from './pregunta-parq.service';
import { PreguntaParqController } from './pregunta-parq.controller';
import { TypeORMError } from 'typeorm';
import { PreguntaParq } from './entities/pregunta-parq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PreguntaParqController],
  providers: [PreguntaParqService],
  imports: [TypeOrmModule.forFeature([PreguntaParq])],
})
export class PreguntaParqModule {}
