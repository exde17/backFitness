import { Module } from '@nestjs/common';
import { EpsService } from './eps.service';
import { EpsController } from './eps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eps } from './entities/ep.entity';

@Module({
  controllers: [EpsController],
  providers: [EpsService],
  imports:[TypeOrmModule.forFeature([Eps])]
})
export class EpsModule {}
