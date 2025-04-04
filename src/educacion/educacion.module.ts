import { Module } from '@nestjs/common';
import { EducacionService } from './educacion.service';
import { EducacionController } from './educacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Educacion } from './entities/educacion.entity';

@Module({
  controllers: [EducacionController],
  providers: [EducacionService],
  imports: [TypeOrmModule.forFeature([Educacion])],
})
export class EducacionModule {}
