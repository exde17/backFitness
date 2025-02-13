import { Injectable } from '@nestjs/common';
import { CreatePreguntaParqDto } from './dto/create-pregunta-parq.dto';
import { UpdatePreguntaParqDto } from './dto/update-pregunta-parq.dto';

@Injectable()
export class PreguntaParqService {
  create(createPreguntaParqDto: CreatePreguntaParqDto) {
    return 'This action adds a new preguntaParq';
  }

  findAll() {
    return `This action returns all preguntaParq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preguntaParq`;
  }

  update(id: number, updatePreguntaParqDto: UpdatePreguntaParqDto) {
    return `This action updates a #${id} preguntaParq`;
  }

  remove(id: number) {
    return `This action removes a #${id} preguntaParq`;
  }
}
