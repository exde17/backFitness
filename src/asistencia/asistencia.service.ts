import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
  ){}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    try {
      // verifico si existe alguna asistencia con el mismo usuario y la misma actividad
      // const asistenciaExistente = await this.asistenciaRepository.findOne({
      //   where: {
      //     user: createAsistenciaDto.user,
      //     actividad: createAsistenciaDto.actividad,
      //   }
      // });

      // if(asistenciaExistente){
      //   return 'Ya existe una asistencia para esta actividad';
      // }
      const asistencia = this.asistenciaRepository.create({
        ...createAsistenciaDto,
        fecha: new Date(),
      });

      await this.asistenciaRepository.save(asistencia);
      return 'asistencia creada con exito';
    } catch (error) {
      console.log(error);
      return 'Error al crear la asistencia';
      
    }
  }

  findAll() {
    return `This action returns all asistencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}
