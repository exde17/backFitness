import { Injectable } from '@nestjs/common';
import { CreateSituacionDto } from './dto/create-situacion.dto';
import { UpdateSituacionDto } from './dto/update-situacion.dto';

@Injectable()
export class SituacionService {
  create(createSituacionDto: CreateSituacionDto) {
    return 'This action adds a new situacion';
  }

  findAll() {
    return `This action returns all situacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} situacion`;
  }

  update(id: number, updateSituacionDto: UpdateSituacionDto) {
    return `This action updates a #${id} situacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} situacion`;
  }
}
