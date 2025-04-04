import { PartialType } from '@nestjs/mapped-types';
import { CreateSituacionDto } from './create-situacion.dto';

export class UpdateSituacionDto extends PartialType(CreateSituacionDto) {}
