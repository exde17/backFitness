import { PartialType } from '@nestjs/mapped-types';
import { CreateRespuestaParqDto } from './create-respuesta-parq.dto';

export class UpdateRespuestaParqDto extends PartialType(CreateRespuestaParqDto) {}
