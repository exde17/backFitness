import { Injectable } from '@nestjs/common';
import { CreateCaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';

@Injectable()
export class CaracterizacionService {
  create(createCaracterizacionDto: CreateCaracterizacionDto) {
    return 'This action adds a new caracterizacion';
  }

  findAll() {
    return `This action returns all caracterizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caracterizacion`;
  }

  update(id: number, updateCaracterizacionDto: UpdateCaracterizacionDto) {
    return `This action updates a #${id} caracterizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} caracterizacion`;
  }
}
