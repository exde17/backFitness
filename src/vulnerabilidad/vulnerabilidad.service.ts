import { Injectable } from '@nestjs/common';
import { CreateVulnerabilidadDto } from './dto/create-vulnerabilidad.dto';
import { UpdateVulnerabilidadDto } from './dto/update-vulnerabilidad.dto';

@Injectable()
export class VulnerabilidadService {
  create(createVulnerabilidadDto: CreateVulnerabilidadDto) {
    return 'This action adds a new vulnerabilidad';
  }

  findAll() {
    return `This action returns all vulnerabilidad`;
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
