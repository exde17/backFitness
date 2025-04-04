import { Injectable } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ){}
  create(createGeneroDto: CreateGeneroDto) {
    return 'This action adds a new genero';
  }

  async findAll() {
    try {
      return this.generoRepository.find({
        where: {
          estado: true
        }
      });
      
      
    } catch (error) {
      console.log(error);
      return 'Error al listar genero';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} genero`;
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return `This action updates a #${id} genero`;
  }

  remove(id: number) {
    return `This action removes a #${id} genero`;
  }
}
