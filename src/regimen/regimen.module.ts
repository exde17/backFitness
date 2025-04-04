import { Module } from '@nestjs/common';
import { RegimenService } from './regimen.service';
import { RegimenController } from './regimen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regiman } from './entities/regiman.entity';

@Module({
  controllers: [RegimenController],
  providers: [RegimenService],
  imports: [TypeOrmModule.forFeature([Regiman])], // Add your Regimen entity here
})
export class RegimenModule {}
