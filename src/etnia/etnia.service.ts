import { Injectable } from '@nestjs/common';
import { CreateEtniaDto } from './dto/create-etnia.dto';
import { UpdateEtniaDto } from './dto/update-etnia.dto';

@Injectable()
export class EtniaService {
  create(createEtniaDto: CreateEtniaDto) {
    return 'This action adds a new etnia';
  }

  findAll() {
    return `This action returns all etnia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} etnia`;
  }

  update(id: number, updateEtniaDto: UpdateEtniaDto) {
    return `This action updates a #${id} etnia`;
  }

  remove(id: number) {
    return `This action removes a #${id} etnia`;
  }
}
