import { Injectable } from '@nestjs/common';
import { CreateTipoActividadDto } from './dto/create-tipo-actividad.dto';
import { UpdateTipoActividadDto } from './dto/update-tipo-actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoActividad } from './entities/tipo-actividad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoActividadService {
  constructor(
    @InjectRepository(TipoActividad)
    private tipoActividadRepository: Repository<TipoActividad>,
  ){}
  async create(createTipoActividadDto: CreateTipoActividadDto) {
    try {
      const tipoActividad = this.tipoActividadRepository.create(createTipoActividadDto);
      await this.tipoActividadRepository.save(tipoActividad);
      return 'Tipo de actividad creado';
      
    } catch (error) {
      console.log(error);
      return 'Error al crear el tipo de actividad';
      
    }
  }

  async findAll() {
    try {
      return await this.tipoActividadRepository.find({
        where: {estado: true},
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al obtener los tipos de actividad';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoActividad`;
  }

  async update(id: string, updateTipoActividadDto: UpdateTipoActividadDto) {
    try {
      const tipoActividad = await this.tipoActividadRepository.findOne({
        where: {id}
      });
      this.tipoActividadRepository.merge(tipoActividad, updateTipoActividadDto);
      return await this.tipoActividadRepository.save(tipoActividad);
      
    } catch (error) {
      console.log(error);
      return 'Error al actualizar el tipo de actividad';
      
    }
  }

  // cambiar estado
  async updateStado(id: string) {
    try {
      const tipoActividad = await this.tipoActividadRepository.findOne({
        where: {id}
      });
      tipoActividad.estado = !tipoActividad.estado;
      return await this.tipoActividadRepository.save(tipoActividad);
    } catch (error) {
      console.log(error);
      return 'Error al cambiar el estado del tipo de actividad';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} tipoActividad`;
  }
}
