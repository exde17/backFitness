import { PartialType } from '@nestjs/mapped-types';
import { CreateParqDto } from './create-parq.dto';

export class UpdateParqDto extends PartialType(CreateParqDto) {}
