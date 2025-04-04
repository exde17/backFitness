import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';

@Module({
  controllers: [GeneroController],
  providers: [GeneroService],
  imports: [TypeOrmModule.forFeature([Genero])],
})
export class GeneroModule {}
