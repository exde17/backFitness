import { Module } from '@nestjs/common';
import { EtniaService } from './etnia.service';
import { EtniaController } from './etnia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etnia } from './entities/etnia.entity';

@Module({
  controllers: [EtniaController],
  providers: [EtniaService],
  imports: [TypeOrmModule.forFeature([Etnia])],
})
export class EtniaModule {}
