import { Injectable } from '@nestjs/common';
import { CreateOpcionPreguntaDto } from './dto/create-opcion-pregunta.dto';
import { UpdateOpcionPreguntaDto } from './dto/update-opcion-pregunta.dto';

@Injectable()
export class OpcionPreguntaService {
  create(createOpcionPreguntaDto: CreateOpcionPreguntaDto) {
    return 'This action adds a new opcionPregunta';
  }

  findAll() {
    return `This action returns all opcionPregunta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opcionPregunta`;
  }

  update(id: number, updateOpcionPreguntaDto: UpdateOpcionPreguntaDto) {
    return `This action updates a #${id} opcionPregunta`;
  }

  remove(id: number) {
    return `This action removes a #${id} opcionPregunta`;
  }
}
