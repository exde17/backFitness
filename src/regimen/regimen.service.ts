import { Injectable } from '@nestjs/common';
import { CreateRegimanDto } from './dto/create-regiman.dto';
import { UpdateRegimanDto } from './dto/update-regiman.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regiman } from './entities/regiman.entity';

@Injectable()
export class RegimenService {
  constructor(
    @InjectRepository(Regiman)
    private readonly regimenRepository: Repository<Regiman>,
  ) {}
  create(createRegimanDto: CreateRegimanDto) {
    return 'This action adds a new regiman';
  }

  async findAll() {
    try {
      return await this.regimenRepository.find({
        where: {
          estado: true
        }
      });
      
    } catch (error) {
      console.log(error);
      return 'Error al listar regimen';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} regiman`;
  }

  update(id: number, updateRegimanDto: UpdateRegimanDto) {
    return `This action updates a #${id} regiman`;
  }

  remove(id: number) {
    return `This action removes a #${id} regiman`;
  }
}
