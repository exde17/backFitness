import { Injectable } from '@nestjs/common';
import { CreateEtniaDto } from './dto/create-etnia.dto';
import { UpdateEtniaDto } from './dto/update-etnia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Etnia } from './entities/etnia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EtniaService {
  constructor(
    @InjectRepository(Etnia)
    private readonly etniaRepository: Repository<Etnia>,
  ) {}
  create(createEtniaDto: CreateEtniaDto) {
    return 'This action adds a new etnia';
  }

  async findAll() {
    try {
      return await this.etniaRepository.find({
        where:{
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar etnia';
      
    }
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
