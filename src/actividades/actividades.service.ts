import { Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between } from 'typeorm';
import * as moment from 'moment-timezone';
import { Raw } from 'typeorm';

@Injectable()
export class ActividadesService {
  @InjectRepository(Actividade)
  private readonly actividadeRepository: Repository<Actividade>;

  async create(createActividadeDto: CreateActividadeDto, user: User) {
    try {
      const actividade = this.actividadeRepository.create({
        ...createActividadeDto,
        user
      });
      await this.actividadeRepository.save(actividade);

      return 'Actividad creada con exito';
    } catch (error) {
      console.log(error);
      return 'Error al crear la actividad';
    }
  }

  // crear actividad por el administrador
  async createAdmin(createActividadeDto: CreateActividadeDto) {
    try {
      const actividade = this.actividadeRepository.create(createActividadeDto);
      await this.actividadeRepository.save(actividade);

      return 'Actividad creada con exito';
    } catch (error) {
      console.log(error);
      return 'Error al crear la actividad';
    }
  }

  async findDia() {
    try {
      // Obtener la fecha de hoy en Colombia (UTC-5)
      const todayInColombia = moment().tz('America/Bogota').format('YYYY-MM-DD');
      
      console.log(`Buscando actividades con fecha: ${todayInColombia}`);
      
      const actividades = await this.actividadeRepository.find({
        relations: ['user.datosGenerales', 'parque', 'tipoActividad'],
        where: {
          fecha: Raw((alias) => `CAST(${alias} AS TEXT) = :today`, { today: todayInColombia }),
          // estado: true,
        },
      });
      
      return actividades;
    } catch (error) {
      console.log(error);
      return 'Error al obtener las actividades';
    }
  }

  // actividades por semana por monitor 
  async findMonitor(user: User) {
    try {
      // Obtener la fecha de hoy en Colombia (UTC-5)
      const todayInColombia = moment().tz('America/Bogota').format('YYYY-MM-DD');
      const startOfWeek = new Date(moment(todayInColombia).startOf('week').format('YYYY-MM-DD'));
      const endOfWeek = new Date(moment(todayInColombia).endOf('week').format('YYYY-MM-DD'));
      console.log(`Buscando actividades entre: ${startOfWeek} y ${endOfWeek}`);
      const actividades = await this.actividadeRepository.find({
        relations: ['user.datosGenerales', 'parque', 'tipoActividad'],
        where: {
          fecha: Between(startOfWeek, endOfWeek),
          user: {
            id: user.id
          },
          // estado: true
        },
      });
      return actividades;
    } catch (error) {
      console.log(error);
      return 'Error al obtener las actividades';
    }
  }

  // actividades por rango de fechas
  async findByDateRange(fechaInicio: string, fechaFin: string) {
    try {
      // Convertir las fechas a formato YYYY-MM-DD
      const startDate = moment(fechaInicio).format('YYYY-MM-DD');
      const endDate = moment(fechaFin).format('YYYY-MM-DD');
      
      console.log(`Buscando actividades entre: ${startDate} y ${endDate}`);
      
      const actividades = await this.actividadeRepository.find({
        relations: ['user.datosGenerales', 'parque', 'tipoActividad'],
        where: {
          fecha: Between(
            new Date(startDate), 
            new Date(endDate)
          ),
        },
        order: {
          fecha: 'ASC',
          hora: 'ASC'
        }
      });
      
      return actividades;
    } catch (error) {
      console.log(error);
      return 'Error al obtener las actividades por rango de fechas';
    }
  }

  // actividades por rango de fechas y usuario monitor
  async findByDateRangeAndMonitor(fechaInicio: string, fechaFin: string, user: User) {
    try {
      // Convertir las fechas a formato YYYY-MM-DD
      const startDate = moment(fechaInicio).format('YYYY-MM-DD');
      const endDate = moment(fechaFin).format('YYYY-MM-DD');
      
      console.log(`Buscando actividades entre: ${startDate} y ${endDate} para el monitor con ID: ${user.id}`);
      
      const actividades = await this.actividadeRepository.find({
        relations: ['user.datosGenerales', 'parque', 'tipoActividad'],
        where: {
          fecha: Between(
            new Date(startDate), 
            new Date(endDate)
          ),
          user: {
            id: user.id
          }
        },
        order: {
          fecha: 'ASC',
          hora: 'ASC'
        }
      });
      
      return actividades;
    } catch (error) {
      console.log(error);
      return 'Error al obtener las actividades por rango de fechas y monitor';
    }
  }

  async findAll() {
    try {
      return await this.actividadeRepository.find({
        relations: ['user', 'parque'],
        where: {
          estado: true
        }
      });

    } catch (error) {
      console.log(error);
      return 'Error al obtener las actividades';

    }
  }

  async findOne(id: string) {
    try {
      return await this.actividadeRepository.findOne({
        relations: ['user', 'parque'],
        where: {
          id,
          estado: true
        }
      });
    } catch (error) {
      console.log(error);
      return 'Error al obtener la actividad';
    }
  }

  async update(id: string, updateActividadeDto: UpdateActividadeDto) {
    try {
      await this.actividadeRepository.update(id, updateActividadeDto);
      return 'Actividad actualizada';

    } catch (error) {
      console.log(error);
      return 'Error al actualizar la actividad';

    }
  }

  // cancelar actividad
  async updateCancelada(id: string, motivoCancelado: string) {
    try {
      const actividad = await this.actividadeRepository.findOne({
        where: {
          id
        }
      });
      actividad.motivoCancelado = motivoCancelado;
      actividad.estado = false;
      await this.actividadeRepository.save(actividad);
      return 'Actividad cancelada';
    } catch (error) {
      console.log(error);
      return 'Error al cancelar la actividad';
    }
  }

  // cambiar estado de la actividad
  async updateStado(id: string) {
    try {
      const actividad = await this.actividadeRepository.findOne({
        where: {
          id
        }
      });
      actividad.estado = !actividad.estado;
      await this.actividadeRepository.save(actividad);
      return 'Estado de la actividad actualizado';

    } catch (error) {
      console.log(error);
      return 'Error al actualizar el estado de la actividad';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }
}
