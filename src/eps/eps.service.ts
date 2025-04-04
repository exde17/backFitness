import { Injectable } from '@nestjs/common';
import { CreateEpDto } from './dto/create-ep.dto';
import { UpdateEpDto } from './dto/update-ep.dto';

@Injectable()
export class EpsService {
  create(createEpDto: CreateEpDto) {
    return 'This action adds a new ep';
  }

  findAll() {
    return `This action returns all eps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ep`;
  }

  update(id: number, updateEpDto: UpdateEpDto) {
    return `This action updates a #${id} ep`;
  }

  remove(id: number) {
    return `This action removes a #${id} ep`;
  }
}
