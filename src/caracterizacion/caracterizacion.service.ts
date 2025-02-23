import { Injectable } from '@nestjs/common';
import { CreateCaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CaracterizacionService {
  constructor(
    @InjectRepository(Caracterizacion)
    private caracterizacionRepository: Repository<Caracterizacion>,
  ) {}
  async create(createCaracterizacionDto: CreateCaracterizacionDto, user: User) {
    try {
      const caracterizacion = this.caracterizacionRepository.create({
        ...createCaracterizacionDto, 
        terminada: true,
        user
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
        where: { user: {id} },
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
