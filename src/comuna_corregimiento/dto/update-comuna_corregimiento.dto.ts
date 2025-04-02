import { PartialType } from '@nestjs/mapped-types';
import { CreateComunaCorregimientoDto } from './create-comuna_corregimiento.dto';

export class UpdateComunaCorregimientoDto extends PartialType(CreateComunaCorregimientoDto) {}
