import { Injectable } from '@nestjs/common';
import { CreateDiscapacidadDto } from './dto/create-discapacidad.dto';
import { UpdateDiscapacidadDto } from './dto/update-discapacidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discapacidad } from './entities/discapacidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscapacidadService {
  constructor(
    @InjectRepository(Discapacidad)
    private readonly discapacidadRepository: Repository<Discapacidad>,
  ) {}
  create(createDiscapacidadDto: CreateDiscapacidadDto) {
    return 'This action adds a new discapacidad';
  }

  async findAll() {
    try {
      return await this.discapacidadRepository.find({
        where:{
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar discapacidad';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} discapacidad`;
  }

  update(id: number, updateDiscapacidadDto: UpdateDiscapacidadDto) {
    return `This action updates a #${id} discapacidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} discapacidad`;
  }
}
