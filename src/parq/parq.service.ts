import { Injectable } from '@nestjs/common';
import { CreateParqDto } from './dto/create-parq.dto';
import { UpdateParqDto } from './dto/update-parq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parq } from './entities/parq.entity';
import { In, Not, Repository } from 'typeorm';

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
        where: { 
          aprobado: true,
          // user: { role: Not(In(['monitor', 'superadmin'])) } // Excluir monitores y superadmin
         } 
      });
      console.log('Usuarios enviados desde el servidor:', rest);

      rest.forEach((item) => {
        data.push({
          id: item.user.id,
          nombre: item.user.datosGenerales[0]?.name??'vacio',
          documentType: item.user.datosGenerales[0]?.documentType??'vacio',
          documentNumber: item.user.datosGenerales[0]?.documentNumber??'vacio',
          phoneNumber: item.user.datosGenerales[0]?.phoneNumber??'vacio',
          birthDate: item.user.datosGenerales[0]?.birthDate??'vacio',
          address: item.user.datosGenerales[0]?.address??'vacio',
          barrio: item.user.datosGenerales[0]?.barrio??'vacio',
          comunaCorregimiento: item.user.datosGenerales[0]?.comunaCorregimiento??'vacio',
          aprobado: item.aprobado,
          etnia: item.user.datosGenerales[0]?.etnia??'vacio',
          genero: item.user.datosGenerales[0]?.gender??'vacio',
          discapacidad: item.user.datosGenerales[0]?.discapacidad??'vacio',
          poblacionVulnerable: item.user.datosGenerales[0]?.poblacionVulnerable??'vacio',
          nivelEducativo: item.user.datosGenerales[0]?.nivelEducativo??'vacio',
          ocupacion: item.user.datosGenerales[0]?.ocupacion??'vacio',
          regimenSalud: item.user.datosGenerales[0]?.regimenSalud??'vacio',
          eps: item.user.datosGenerales[0]?.eps??'vacio',
          grupoSanquineo: item.user.datosGenerales[0]?.grupoSanquineo??'vacio',
          contactoEmergencia: item.user.datosGenerales[0]?.contactoEmergencia??'vacio',
          telefonoContacto: item.user.datosGenerales[0]?.telefonoContacto??'vacio',
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
