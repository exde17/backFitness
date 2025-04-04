import { Injectable } from '@nestjs/common';
import { CreateSituacionDto } from './dto/create-situacion.dto';
import { UpdateSituacionDto } from './dto/update-situacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Situacion } from './entities/situacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SituacionService {
  constructor(
    @InjectRepository(Situacion)
    private readonly situacionRepository: Repository<Situacion>,
  ) {}
  create(createSituacionDto: CreateSituacionDto) {
    return 'This action adds a new situacion';
  }

  async findAll() {
    try {
      return await this.situacionRepository.find({
        where: {
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar situacion';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} situacion`;
  }

  update(id: number, updateSituacionDto: UpdateSituacionDto) {
    return `This action updates a #${id} situacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} situacion`;
  }
}
