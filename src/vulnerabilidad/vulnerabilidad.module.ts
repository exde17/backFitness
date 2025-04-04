import { Module } from '@nestjs/common';
import { VulnerabilidadService } from './vulnerabilidad.service';
import { VulnerabilidadController } from './vulnerabilidad.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vulnerabilidad } from './entities/vulnerabilidad.entity';

@Module({
  controllers: [VulnerabilidadController],
  providers: [VulnerabilidadService],
  imports: [ConfigModule, TypeOrmModule.forFeature ([Vulnerabilidad])],
})
export class VulnerabilidadModule {}
