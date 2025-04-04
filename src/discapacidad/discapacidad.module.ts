import { Module } from '@nestjs/common';
import { DiscapacidadService } from './discapacidad.service';
import { DiscapacidadController } from './discapacidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discapacidad } from './entities/discapacidad.entity';

@Module({
  controllers: [DiscapacidadController],
  providers: [DiscapacidadService],
  imports: [TypeOrmModule.forFeature([Discapacidad])],
})
export class DiscapacidadModule {}
