import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosGeneraleDto } from './create-datos-generale.dto';

export class UpdateDatosGeneraleDto extends PartialType(CreateDatosGeneraleDto) {}
