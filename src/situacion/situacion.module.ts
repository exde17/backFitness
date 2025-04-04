import { Module } from '@nestjs/common';
import { SituacionService } from './situacion.service';
import { SituacionController } from './situacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Situacion } from './entities/situacion.entity';

@Module({
  controllers: [SituacionController],
  providers: [SituacionService],
  imports: [TypeOrmModule.forFeature([Situacion])],
})
export class SituacionModule {}
