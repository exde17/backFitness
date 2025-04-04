import { Injectable } from '@nestjs/common';
import { CreateEducacionDto } from './dto/create-educacion.dto';
import { UpdateEducacionDto } from './dto/update-educacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Educacion } from './entities/educacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EducacionService {
  constructor(
    @InjectRepository(Educacion)
    private readonly educacionRepository: Repository<Educacion>,
  ) {}
  create(createEducacionDto: CreateEducacionDto) {
    return 'This action adds a new educacion';
  }

  async findAll() {
    try {
      return await this.educacionRepository.find({
        where: {
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar educacion';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} educacion`;
  }

  update(id: number, updateEducacionDto: UpdateEducacionDto) {
    return `This action updates a #${id} educacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} educacion`;
  }
}
