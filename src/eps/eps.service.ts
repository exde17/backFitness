import { Injectable } from '@nestjs/common';
import { CreateEpDto } from './dto/create-ep.dto';
import { UpdateEpDto } from './dto/update-ep.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Eps } from './entities/ep.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpsService {
  constructor(
    @InjectRepository(Eps)
    private readonly epRepository: Repository<Eps>,
  ) {}
  create(createEpDto: CreateEpDto) {
    return 'This action adds a new ep';
  }

  async findAll() {
    try {
      return await this.epRepository.find({
        where:{
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar ep';
      
    }
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
