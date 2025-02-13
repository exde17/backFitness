import { Module } from '@nestjs/common';
import { TipoPreguntaService } from './tipo-pregunta.service';
import { TipoPreguntaController } from './tipo-pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPregunta } from './entities/tipo-pregunta.entity';

@Module({
  controllers: [TipoPreguntaController],
  providers: [TipoPreguntaService],
  imports: [TypeOrmModule.forFeature([TipoPregunta])],
})
export class TipoPreguntaModule {}
