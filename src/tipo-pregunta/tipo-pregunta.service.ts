import { Injectable } from '@nestjs/common';
import { CreateTipoPreguntaDto } from './dto/create-tipo-pregunta.dto';
import { UpdateTipoPreguntaDto } from './dto/update-tipo-pregunta.dto';

@Injectable()
export class TipoPreguntaService {
  create(createTipoPreguntaDto: CreateTipoPreguntaDto) {
    return 'This action adds a new tipoPregunta';
  }

  findAll() {
    return `This action returns all tipoPregunta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoPregunta`;
  }

  update(id: number, updateTipoPreguntaDto: UpdateTipoPreguntaDto) {
    return `This action updates a #${id} tipoPregunta`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoPregunta`;
  }
}
