import { Injectable } from '@nestjs/common';
import { CreateRespuestaCaracterizacionDto } from './dto/create-respuesta-caracterizacion.dto';
import { UpdateRespuestaCaracterizacionDto } from './dto/update-respuesta-caracterizacion.dto';

@Injectable()
export class RespuestaCaracterizacionService {
  create(createRespuestaCaracterizacionDto: CreateRespuestaCaracterizacionDto) {
    return 'This action adds a new respuestaCaracterizacion';
  }

  findAll() {
    return `This action returns all respuestaCaracterizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} respuestaCaracterizacion`;
  }

  update(id: number, updateRespuestaCaracterizacionDto: UpdateRespuestaCaracterizacionDto) {
    return `This action updates a #${id} respuestaCaracterizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} respuestaCaracterizacion`;
  }
}
