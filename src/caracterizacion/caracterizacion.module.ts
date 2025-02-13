import { Module } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CaracterizacionController } from './caracterizacion.controller';

@Module({
  controllers: [CaracterizacionController],
  providers: [CaracterizacionService]
})
export class CaracterizacionModule {}
