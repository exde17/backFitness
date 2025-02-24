import { Injectable } from '@nestjs/common';
import { CreateRespuestaParqDto } from './dto/create-respuesta-parq.dto';
import { UpdateRespuestaParqDto } from './dto/update-respuesta-parq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RespuestaParq } from './entities/respuesta-parq.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Parq } from '../entities/parq.entity';

@Injectable()
export class RespuestaParqService {
  @InjectRepository(RespuestaParq)
  private readonly respuestaParqRepository: Repository<RespuestaParq>;
  @InjectRepository(Parq)
  private readonly parqRepository: Repository<Parq>;

  async create(createRespuestaParqDto: CreateRespuestaParqDto, user: User) {
    // const { preguntaParq, respuestaParq } = createRespuestaParqDto;
    try {
      const respuestaParq = this.respuestaParqRepository.create({
        preguntaParq: createRespuestaParqDto.preguntaParq,
        respuestaParq: createRespuestaParqDto.respuestaParq,
        terminada: true,
        user,
      });
      await this.respuestaParqRepository.save(respuestaParq);
      return 'RespuestaParq creada';
    } catch (error) {
      console.log(error);
      return error;

    }
  }

  async findRespuestasParqByUser(user: User) {
    try {
      const ver = await this.respuestaParqRepository.find({
        where: {
          user: {id: user.id},
          respuestaParq: true
        },
      });

      console.log('el ver: ',ver);

      if (ver.length > 2) {
        const parq = this.parqRepository.create({
          aprobado: false,
          user,
        });
        await this.parqRepository.save(parq);
        return {
          message: 'Su solicitud está siendo procesada. Su inscripción será evaluada por un médico para garantizar su salud y seguridad antes de ser confirmada.',
          status: false
        };
      }
      else {
        const parq = this.parqRepository.create({
          aprobado: true,
          user,
        });
        await this.parqRepository.save(parq);
        return {
          message: 'Pasar a Consentimiento informado',
          status: true
        };
      }
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
