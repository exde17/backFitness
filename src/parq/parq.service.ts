import { Injectable } from '@nestjs/common';
import { CreateParqDto } from './dto/create-parq.dto';
import { UpdateParqDto } from './dto/update-parq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parq } from './entities/parq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParqService {
  @InjectRepository(Parq)
  private parqRepository: Repository<Parq>;
  create(createParqDto: CreateParqDto) {
    return 'This action adds a new parq';
  }

  // LISTA DE USUARIOS APROBADOS
  async findAllAprobados() {
    try {
      let data = []
      const rest = await this.parqRepository.find({ 
        relations: ['user.datosGenerales'],
        where: { aprobado: true } 
      });

      rest.forEach((item) => {
        data.push({
          id: item.user.id,
          nombre: item.user.datosGenerales[0].name,
          documentType: item.user.datosGenerales[0].documentType,
          documentNumber: item.user.datosGenerales[0].documentNumber,
          phoneNumber: item.user.datosGenerales[0].phoneNumber,
          birthDate: item.user.datosGenerales[0].birthDate,
          address: item.user.datosGenerales[0].address,
          barrio: item.user.datosGenerales[0].barrio,
          comunaCorregimiento: item.user.datosGenerales[0].comunaCorregimiento,
          aprobado: item.aprobado,
          etnia: item.user.datosGenerales[0].etnia,
          genero: item.user.datosGenerales[0].gender,
          discapacidad: item.user.datosGenerales[0].discapacidad,
          poblacionVulnerable: item.user.datosGenerales[0].poblacionVulnerable,
          nivelEducativo: item.user.datosGenerales[0].nivelEducativo,
          ocupacion: item.user.datosGenerales[0].ocupacion,
          regimenSalud: item.user.datosGenerales[0].regimenSalud,
          eps: item.user.datosGenerales[0].eps,
          grupoSanquineo: item.user.datosGenerales[0].grupoSanquineo,
          contactoEmergencia: item.user.datosGenerales[0].contactoEmergencia,
          telefonoContacto: item.user.datosGenerales[0].telefonoContacto,
        });
      });

      return data;

    } catch (error) {
      console.log(error);
      return error;
      
    }
    
  }

  findAll() {
    return `This action returns all parq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parq`;
  }

  update(id: number, updateParqDto: UpdateParqDto) {
    return `This action updates a #${id} parq`;
  }

  remove(id: number) {
    return `This action removes a #${id} parq`;
  }
}
