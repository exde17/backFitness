import { Module } from '@nestjs/common';
import { CarnetService } from './carnet.service';
import { CarnetController } from './carnet.controller';

@Module({
  controllers: [CarnetController],
  providers: [CarnetService]
})
export class CarnetModule {}
