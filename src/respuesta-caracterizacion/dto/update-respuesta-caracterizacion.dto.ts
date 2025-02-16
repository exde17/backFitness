import { PartialType } from '@nestjs/mapped-types';
import { CreateRespuestaCaracterizacionDto } from './create-respuesta-caracterizacion.dto';

export class UpdateRespuestaCaracterizacionDto extends PartialType(CreateRespuestaCaracterizacionDto) {}
