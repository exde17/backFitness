import { Injectable } from '@nestjs/common';
import { CreateParqueDto } from './dto/create-parque.dto';
import { UpdateParqueDto } from './dto/update-parque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parque } from './entities/parque.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParqueService {
  constructor(
    @InjectRepository(Parque)
    private parqueRepository: Repository<Parque>,
  ){}
  async create(createParqueDto: CreateParqueDto) {
    try {
      const parque = this.parqueRepository.create(createParqueDto);
      await this.parqueRepository.save(parque);
      return 'Parque creado';
      
    } catch (error) {
      console.log(error);
      return 'Error al crear el parque';
      
    }
  }

  async findAll() {
    try {
      return await this.parqueRepository.find({
        where: {estado: true},
        relations: ['barrio']

      });
      
    } catch (error) {
      console.log(error);
      return 'Error al obtener los parques';
      
    }
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
