import { PartialType } from '@nestjs/mapped-types';
import { CreateOpcionPreguntaDto } from './create-opcion-pregunta.dto';

export class UpdateOpcionPreguntaDto extends PartialType(CreateOpcionPreguntaDto) {}
