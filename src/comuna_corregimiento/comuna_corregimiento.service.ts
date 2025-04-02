import { Injectable } from '@nestjs/common';
import { CreateComunaCorregimientoDto } from './dto/create-comuna_corregimiento.dto';
import { UpdateComunaCorregimientoDto } from './dto/update-comuna_corregimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComunaCorregimiento } from './entities/comuna_corregimiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComunaCorregimientoService {
  constructor(
    @InjectRepository(ComunaCorregimiento)
    private readonly comunaCorregimientoRepository: Repository<ComunaCorregimiento>,
  ) {}
  async create(createComunaCorregimientoDto: CreateComunaCorregimientoDto) {
    try {
      const comunaCorregimiento = this.comunaCorregimientoRepository.create(createComunaCorregimientoDto);
      await this.comunaCorregimientoRepository.save(comunaCorregimiento);

      return 'ComunaCorregimiento creado';
      
    } catch (error) {
      console.log(error);
      return 'Error al crear comunaCorregimiento';
      
    }
  }

  async findAll() {
    try {
      return await this.comunaCorregimientoRepository.find({
        where:{
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar comunaCorregimiento';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comunaCorregimiento`;
  }

  update(id: number, updateComunaCorregimientoDto: UpdateComunaCorregimientoDto) {
    return `This action updates a #${id} comunaCorregimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} comunaCorregimiento`;
  }
}
