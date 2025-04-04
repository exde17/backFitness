import { Injectable } from '@nestjs/common';
import { CreateVulnerabilidadDto } from './dto/create-vulnerabilidad.dto';
import { UpdateVulnerabilidadDto } from './dto/update-vulnerabilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vulnerabilidad } from './entities/vulnerabilidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VulnerabilidadService {
  constructor(
    @InjectRepository(Vulnerabilidad)
    private readonly vulnerabilidadRepository: Repository<Vulnerabilidad>,
  ) {}
  create(createVulnerabilidadDto: CreateVulnerabilidadDto) {
    return 'This action adds a new vulnerabilidad';
  }

  findAll() {
    try {
      return this.vulnerabilidadRepository.find({
        where: {
          estado: true
        }
      });

      
    } catch (error) {
      console.log(error);
      return 'Error al listar vulnerabilidad';
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} vulnerabilidad`;
  }

  update(id: number, updateVulnerabilidadDto: UpdateVulnerabilidadDto) {
    return `This action updates a #${id} vulnerabilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} vulnerabilidad`;
  }
}
