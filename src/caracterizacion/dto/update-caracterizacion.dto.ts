import { PartialType } from '@nestjs/mapped-types';
import { CreateCaracterizacionDto } from './create-caracterizacion.dto';

export class UpdateCaracterizacionDto extends PartialType(CreateCaracterizacionDto) {}
