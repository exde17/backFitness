import { Injectable } from '@nestjs/common';
import { CreateParqDto } from './dto/create-parq.dto';
import { UpdateParqDto } from './dto/update-parq.dto';

@Injectable()
export class ParqService {
  create(createParqDto: CreateParqDto) {
    return 'This action adds a new parq';
  }

  findAll() {
    return `This action returns all parq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parq`;
  }

  update(id: number, updateParqDto: UpdateParqDto) {
    return `This action updates a #${id} parq`;
  }

  remove(id: number) {
    return `This action removes a #${id} parq`;
  }
}
