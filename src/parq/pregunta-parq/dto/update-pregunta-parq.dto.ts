import { PartialType } from '@nestjs/mapped-types';
import { CreatePreguntaParqDto } from './create-pregunta-parq.dto';

export class UpdatePreguntaParqDto extends PartialType(CreatePreguntaParqDto) {}
