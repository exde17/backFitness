import { Injectable } from '@nestjs/common';
import { CreateRespuestaParqDto } from './dto/create-respuesta-parq.dto';
import { UpdateRespuestaParqDto } from './dto/update-respuesta-parq.dto';

@Injectable()
export class RespuestaParqService {
  create(createRespuestaParqDto: CreateRespuestaParqDto) {
    return 'This action adds a new respuestaParq';
  }

  findAll() {
    return `This action returns all respuestaParq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} respuestaParq`;
  }

  update(id: number, updateRespuestaParqDto: UpdateRespuestaParqDto) {
    return `This action updates a #${id} respuestaParq`;
  }

  remove(id: number) {
    return `This action removes a #${id} respuestaParq`;
  }
}
