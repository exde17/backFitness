import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';

@Module({
  controllers: [EventoController],
  providers: [EventoService],
  imports: [TypeOrmModule.forFeature([Evento])],
})
export class EventoModule {}
