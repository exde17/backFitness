import { Module } from '@nestjs/common';
import { DatosGeneralesService } from './datos-generales.service';
import { DatosGeneralesController } from './datos-generales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosGenerale } from './entities/datos-generale.entity';

@Module({
  controllers: [DatosGeneralesController],
  providers: [DatosGeneralesService],
  imports: [TypeOrmModule.forFeature([DatosGenerale])],
})
export class DatosGeneralesModule {}
