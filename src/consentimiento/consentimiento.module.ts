import { Module } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';
import { ConsentimientoController } from './consentimiento.controller';

@Module({
  controllers: [ConsentimientoController],
  providers: [ConsentimientoService]
})
export class ConsentimientoModule {}
