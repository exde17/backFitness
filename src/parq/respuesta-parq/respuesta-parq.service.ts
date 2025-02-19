import { Injectable } from '@nestjs/common';
import { CreateRespuestaParqDto } from './dto/create-respuesta-parq.dto';
import { UpdateRespuestaParqDto } from './dto/update-respuesta-parq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RespuestaParq } from './entities/respuesta-parq.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RespuestaParqService {
  @InjectRepository(RespuestaParq)
  private readonly respuestaParqRepository: Repository<RespuestaParq>;
  async create(createRespuestaParqDto: CreateRespuestaParqDto, user: User) {
    // const { preguntaParq, respuestaParq } = createRespuestaParqDto;
    try {
      const respuestaParq = this.respuestaParqRepository.create({
        preguntaParq: createRespuestaParqDto.preguntaParq,
        respuestaParq: createRespuestaParqDto.respuestaParq,
        user,
      });
      await this.respuestaParqRepository.save(respuestaParq);
      return 'RespuestaParq creada';
    } catch (error) {
      console.log(error);
      return error;

    }
  }

  findAll() {
    return `This action returns all respuestaParq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} respuestaParq`;
  }

  update(id: number, updateRespuestaParqDto: UpdateRespuestaParqDto) {
    return `This action updates a #${id} respuestaParq`;
  }

  remove(id: number) {
    return `This action removes a #${id} respuestaParq`;
  }
}
