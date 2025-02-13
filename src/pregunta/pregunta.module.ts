import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './entities/pregunta.entity';

@Module({
  controllers: [PreguntaController],
  providers: [PreguntaService],
  imports: [TypeOrmModule.forFeature([Pregunta])],
})
export class PreguntaModule {}
