import { Injectable } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calificacion } from './entities/calificacion.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CalificacionService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly calificacionRepository: Repository<Calificacion>,
  ) {}
  async create(user: User, createCalificacionDto: CreateCalificacionDto) {
    try {
      const calificacion = this.calificacionRepository.create({
        ...createCalificacionDto,
        usuario: {id:user.id},
      });
      await this.calificacionRepository.save(calificacion);
      return 'Calificacion creada con exito';
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
