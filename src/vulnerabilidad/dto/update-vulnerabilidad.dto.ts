import { PartialType } from '@nestjs/mapped-types';
import { CreateVulnerabilidadDto } from './create-vulnerabilidad.dto';

export class UpdateVulnerabilidadDto extends PartialType(CreateVulnerabilidadDto) {}
