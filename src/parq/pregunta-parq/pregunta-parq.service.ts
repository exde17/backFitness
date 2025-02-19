import { Injectable } from '@nestjs/common';
import { CreatePreguntaParqDto } from './dto/create-pregunta-parq.dto';
import { UpdatePreguntaParqDto } from './dto/update-pregunta-parq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PreguntaParq } from './entities/pregunta-parq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreguntaParqService {
  constructor(
    @InjectRepository(PreguntaParq)
    private preguntaParqRepository: Repository<PreguntaParq>,
  ) {}
  async create(createPreguntaParqDto: CreatePreguntaParqDto) {
    try {
      const preguntaParq = this.preguntaParqRepository.create(createPreguntaParqDto);
      await this.preguntaParqRepository.save(preguntaParq);
      return 'PreguntaParq creada';
    } catch (error) {
      
    }
  }

  async findAll() {
    try {
      return await this.preguntaParqRepository.find({
        order: {
          item: 'ASC'
        }
      });
    } catch (error) {
      console.log(error);
      return error;
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} preguntaParq`;
  }

  update(id: number, updatePreguntaParqDto: UpdatePreguntaParqDto) {
    return `This action updates a #${id} preguntaParq`;
  }

  remove(id: number) {
    return `This action removes a #${id} preguntaParq`;
  }
}
