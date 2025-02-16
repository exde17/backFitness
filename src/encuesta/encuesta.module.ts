import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';

@Module({
  controllers: [EncuestaController],
  providers: [EncuestaService],
  imports: [TypeOrmModule.forFeature([Encuesta])],
})
export class EncuestaModule {}
