import { PartialType } from '@nestjs/mapped-types';
import { CreateConsentimientoDto } from './create-consentimiento.dto';

export class UpdateConsentimientoDto extends PartialType(CreateConsentimientoDto) {}
