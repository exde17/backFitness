import { Injectable } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calificacion } from './entities/calificacion.entity';
import { User } from 'src/user/entities/user.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';

@Injectable()
export class CalificacionService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly calificacionRepository: Repository<Calificacion>,
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(DatosGenerale)
    private readonly datosGeneraleRepository: Repository<DatosGenerale>,
    
  ) {}
  async create(user: User, createCalificacionDto: CreateCalificacionDto) {
    try {
      // busco el documento del usuario
      const userDatos = await this.datosGeneraleRepository.findOne({
        where: {
          user: { id: user.id },
        },
      });
      if (!userDatos) {
        return 'No se encontro el documento del usuario';
      }

      // Actualizo la asistencia
      const asistencia = await this.asistenciaRepository.findOne({
        where: {
          documento: userDatos.documentNumber,
          actividad: { id: createCalificacionDto.actividad.id },
        },
      });
      if (asistencia) {
        asistencia.calificado = true;
        await this.asistenciaRepository.save(asistencia);

        const calificacion = this.calificacionRepository.create({
          ...createCalificacionDto,
          usuario: {id:user.id},
        });
        await this.calificacionRepository.save(calificacion);
  
        return 'Calificacion creada con exito';
      } else {
        return 'No se encontro la asistencia';
      }

      
    } catch (error) {
      console.log(error);
      return 'Error al crear la calificacion';
      
    }
  }

  async findAll(user) {
    try {
      const calificaciones = await this.calificacionRepository.find({
        where: { usuario: { id: user.id } },
        relations: ['usuario', 'actividad'],
      });
      return calificaciones;
      
    } catch (error) {
      console.log(error);
      return 'Error al obtener las calificaciones';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} calificacion`;
  }

  update(id: number, updateCalificacionDto: UpdateCalificacionDto) {
    return `This action updates a #${id} calificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} calificacion`;
  }
}
