import { Module } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CaracterizacionController } from './caracterizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';

@Module({
  controllers: [CaracterizacionController],
  providers: [CaracterizacionService],
  imports: [TypeOrmModule.forFeature([Caracterizacion])],
})
export class CaracterizacionModule {}
