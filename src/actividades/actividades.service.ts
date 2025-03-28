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
      // Obtener la fecha de hoy en formato YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0]; // "2025-03-09"
  
      console.log(`Buscando actividades con fecha: ${today}`);
  
      const actividades = await this.actividadeRepository.find({
        relations: ['user.datosGenerales', 'parque', 'tipoActividad'],
        where: {
          fecha: Raw((alias) => `CAST(${alias} AS TEXT) = :today`, { today }),
          // estado: true,
        },
      });
  
      return actividades;
    } catch (error) {
      console.log(error);
      return 'Error al obtener las actividades';
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
