import { Injectable } from '@nestjs/common';
import { CreateParqueDto } from './dto/create-parque.dto';
import { UpdateParqueDto } from './dto/update-parque.dto';

@Injectable()
export class ParqueService {
  create(createParqueDto: CreateParqueDto) {
    return 'This action adds a new parque';
  }

  findAll() {
    return `This action returns all parque`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parque`;
  }

  update(id: number, updateParqueDto: UpdateParqueDto) {
    return `This action updates a #${id} parque`;
  }

  remove(id: number) {
    return `This action removes a #${id} parque`;
  }
}
