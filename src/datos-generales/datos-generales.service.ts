import { Injectable } from '@nestjs/common';
import { CreateDatosGeneraleDto } from './dto/create-datos-generale.dto';
import { UpdateDatosGeneraleDto } from './dto/update-datos-generale.dto';

@Injectable()
export class DatosGeneralesService {
  create(createDatosGeneraleDto: CreateDatosGeneraleDto) {
    return 'This action adds a new datosGenerale';
  }

  findAll() {
    return `This action returns all datosGenerales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosGenerale`;
  }

  update(id: number, updateDatosGeneraleDto: UpdateDatosGeneraleDto) {
    return `This action updates a #${id} datosGenerale`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosGenerale`;
  }
}
