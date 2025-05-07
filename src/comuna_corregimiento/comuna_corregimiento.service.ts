import { HttpException, Injectable } from '@nestjs/common';
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

  // async findAll() {
  //   try {
  //     return await this.comunaCorregimientoRepository.find({
  //       where:{
  //         estado: true
  //       }
  //     });
      
  //   } catch (error) {
  //     console.log(error);
  //     return 'Error al listar comunaCorregimiento';
      
  //   }
  // }

  async findAll(nombre?: string) {
    try {
      const queryBuilder = this.comunaCorregimientoRepository.createQueryBuilder('comunaCorregimiento')
        .leftJoinAndSelect('comunaCorregimiento.barrios', 'barrios');
      
      // Si se proporciona un nombre, filtramos por coincidencia insensible a mayúsculas/minúsculas
      if (nombre) {
        queryBuilder.where('LOWER(comunaCorregimiento.nombre) LIKE LOWER(:nombre)', { 
          nombre: `%${nombre.trim()}%` 
        });
      }
      
      const comunasCorregimientos = await queryBuilder.getMany();
      
      return {
        ok: true,
        comunasCorregimientos,
        count: comunasCorregimientos.length
      };
    } catch (error) {
      console.error('Error al obtener comunas/corregimientos:', error);
      throw new HttpException(error.message || 'Error al obtener comunas/corregimientos', 500);
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
