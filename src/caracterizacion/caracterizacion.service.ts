import { Injectable } from '@nestjs/common';
import { CreateCaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import e from 'express';

@Injectable()
export class CaracterizacionService {
  constructor(
    @InjectRepository(Caracterizacion)
    private caracterizacionRepository: Repository<Caracterizacion>,
  ) {}
  async create(createCaracterizacionDto: CreateCaracterizacionDto) {
    try {
      const caracterizacion = this.caracterizacionRepository.create({
        ...createCaracterizacionDto, 
        terminada: true,
      });
      await this.caracterizacionRepository.save(caracterizacion);
      return 'Caracterizacion creada';
    } catch (error) {
      console.log(error);
      return error;
      
    }
  }

  findAll() {
    return `This action returns all caracterizacion`;
  }

  async findOne(id: string) {
    try {
      return await this.caracterizacionRepository.findOneOrFail({
        // relations: ['user'],
        where: { 
          user: {id},
          terminada: true},
      });
    } catch (error) {
      console.log(error);
      return error;
      
    }
  }

  // cambiar estado de la caracterizacion
  async updateEstado(id: string) {
    try {
      const caracterizacion = await this.caracterizacionRepository.find({
        relations: ['user'],
        where: { 
          user: {id},
          terminada: true
      },})

      caracterizacion[0].terminada = false;
      await this.caracterizacionRepository.save(caracterizacion[0]);
      return 'accion realizada';
    } catch (error) {
      console.log(error);
      return error;
      
    }
  }

  //traer todas las caracterizaciones de un usuario
  async findAllByUser(user: User) {
    try {
      return await this.caracterizacionRepository.find({
        where: { user: {id: user.id}},
      });
    } catch (error) {
      console.log(error);
      return error; 
    }
  }

  update(id: number, updateCaracterizacionDto: UpdateCaracterizacionDto) {
    return `This action updates a #${id} caracterizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} caracterizacion`;
  }
}
