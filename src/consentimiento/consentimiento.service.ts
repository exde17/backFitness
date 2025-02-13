import { Injectable } from '@nestjs/common';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { UpdateConsentimientoDto } from './dto/update-consentimiento.dto';

@Injectable()
export class ConsentimientoService {
  create(createConsentimientoDto: CreateConsentimientoDto) {
    return 'This action adds a new consentimiento';
  }

  findAll() {
    return `This action returns all consentimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consentimiento`;
  }

  update(id: number, updateConsentimientoDto: UpdateConsentimientoDto) {
    return `This action updates a #${id} consentimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} consentimiento`;
  }
}
