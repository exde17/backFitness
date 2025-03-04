import { Injectable } from '@nestjs/common';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barrio } from './entities/barrio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BarrioService {
  constructor(
    @InjectRepository(Barrio)
    private readonly barrioRepository: Repository<Barrio>
  ){
  }
  async create(createBarrioDto: CreateBarrioDto) {
    try {
      const barrio = this.barrioRepository.create(createBarrioDto);
      await this.barrioRepository.save(barrio);

      return 'Barrio creado';
    } catch (error) {
      console.log(error);
      return 'Error al crear barrio';
      
    }
  }

  async findAll() {
    try {
      return await this.barrioRepository.find({
        where:{
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar barrios';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} barrio`;
  }

  async update(id: string, updateBarrioDto: UpdateBarrioDto) {
    try {
      await this.barrioRepository.update(id, updateBarrioDto);
      return 'Barrio actualizado';
    } catch (error) {
      console.log(error);
      return 'Error al actualizar barrio';
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} barrio`;
  }

  //actualizar estado
  async updateEstado(id: string) {  
    try {
      const barrio = await this.barrioRepository.findOne({
        where:{
          id
        }
      });
      barrio.estado = !barrio.estado;
      await this.barrioRepository.save(barrio);
      return 'Estado actualizado';
    } catch (error) {
      console.log(error);
      return 'Error al actualizar estado';
    }
  }
}
