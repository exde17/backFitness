import { Module } from '@nestjs/common';
import { OpcionPreguntaService } from './opcion-pregunta.service';
import { OpcionPreguntaController } from './opcion-pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionPregunta } from './entities/opcion-pregunta.entity';

@Module({
  controllers: [OpcionPreguntaController],
  providers: [OpcionPreguntaService],
  imports: [TypeOrmModule.forFeature([OpcionPregunta])],
})
export class OpcionPreguntaModule {}
