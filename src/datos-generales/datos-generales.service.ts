import { Injectable } from '@nestjs/common';
import { CreateDatosGeneraleDto } from './dto/create-datos-generale.dto';
import { UpdateDatosGeneraleDto } from './dto/update-datos-generale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosGenerale } from './entities/datos-generale.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatosGeneralesService {
  constructor(
    @InjectRepository(DatosGenerale)
    private readonly datosGeneraleRepository: Repository<DatosGenerale>,
  ) {}
  async create(createDatosGeneraleDto: CreateDatosGeneraleDto) {
    try {
      // console.log(createDatosGeneraleDto);
      const datosGenerale = this.datosGeneraleRepository.create({
        ...createDatosGeneraleDto,
      });
      await this.datosGeneraleRepository.save(datosGenerale);
      return 'Datos generales creados';
      
    } catch (error) {
      console.log(error);
      return 'Error al crear los datos generales';
      
    }
  }

  // async findAll() {
  //   try {
  //     return await this.datosGeneraleRepository.find();
      
  //   } catch (error) {
  //     console.log(error);
  //     return 'Error al obtener los datos generales';
      
  //   }
  // }

  
  async findAll(documentNumber?: string) {
    try {
      if (documentNumber) {
        // Buscar con coincidencia parcial usando ILike
        return await this.datosGeneraleRepository.find({
          where: {
            documentNumber: ILike(`%${documentNumber}%`),
          },
        });
      }
      
      // Si no se proporciona documentNumber, devolver todos los registros
      return await this.datosGeneraleRepository.find();
      
    } catch (error) {
      console.log(error);
      return 'Error al obtener los datos generales';
    }
  }


  async findOne(user: User) {
    try {
      return await this.datosGeneraleRepository.findOne({
        where: {
          user: {
            id: user.id,}
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al obtener los datos generales';
      
    }
  }

  async update(user:User, updateDatosGeneraleDto: UpdateDatosGeneraleDto) {
    try {
      // console.log(user);
      // console.log(updateDatosGeneraleDto);
      await this.datosGeneraleRepository.update({
        user: {
          id: user.id,
        }
      }, {
        ...updateDatosGeneraleDto
      });
      return 'Datos generales actualizados';
      
    } catch (error) {
      console.log(error);
      return 'Error al actualizar los datos generales';
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} datosGenerale`;
  }
}
