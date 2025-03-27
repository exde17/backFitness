import { Injectable } from '@nestjs/common';
import { CreateParqDto } from './dto/create-parq.dto';
import { UpdateParqDto } from './dto/update-parq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parq } from './entities/parq.entity';
import { ILike, In, Like, Not, Repository } from 'typeorm';
import { RespuestaParq } from './respuesta-parq/entities/respuesta-parq.entity';

@Injectable()
export class ParqService {
  @InjectRepository(Parq)
  private readonly parqRepository: Repository<Parq>;
  @InjectRepository(RespuestaParq)
  private readonly respuestaParqRepository: Repository<RespuestaParq>;
  create(createParqDto: CreateParqDto) {
    return 'This action adds a new parq';
  }

  // LISTA DE USUARIOS APROBADOS

async findAllAprobados(name?: string, documentNumber?: string) {
    try {
        let data = [];
        const queryOptions: any = {
            relations: ['user.datosGenerales'],
            where: { aprobado: true }
        };

        if (name) {
            queryOptions.where.user = queryOptions.where.user || {};
            queryOptions.where.user.datosGenerales = queryOptions.where.user.datosGenerales || {};
            queryOptions.where.user.datosGenerales.name = ILike(`%${name}%`);
        }

        if (documentNumber) {
            queryOptions.where.user = queryOptions.where.user || {};
            queryOptions.where.user.datosGenerales = queryOptions.where.user.datosGenerales || {};
            queryOptions.where.user.datosGenerales.documentNumber = ILike(`%${documentNumber}%`);
        }
        // console.log('name:', name);
        // console.log('documentNumber:', documentNumber);

        

        const rest = await this.parqRepository.find(queryOptions);
        // console.log('Usuarios enviados desde el servidor:', rest);

        rest.forEach((item) => {
            data.push({
                id: item.user.id,
                nombre: item.user.datosGenerales[0]?.name ?? 'vacio',
                documentType: item.user.datosGenerales[0]?.documentType ?? 'vacio',
                documentNumber: item.user.datosGenerales[0]?.documentNumber ?? 'vacio',
                phoneNumber: item.user.datosGenerales[0]?.phoneNumber ?? 'vacio',
                birthDate: item.user.datosGenerales[0]?.birthDate ?? 'vacio',
                address: item.user.datosGenerales[0]?.address ?? 'vacio',
                barrio: item.user.datosGenerales[0]?.barrio ?? 'vacio',
                comunaCorregimiento: item.user.datosGenerales[0]?.comunaCorregimiento ?? 'vacio',
                aprobado: item.aprobado,
                etnia: item.user.datosGenerales[0]?.etnia ?? 'vacio',
                genero: item.user.datosGenerales[0]?.gender ?? 'vacio',
                discapacidad: item.user.datosGenerales[0]?.discapacidad ?? 'vacio',
                poblacionVulnerable: item.user.datosGenerales[0]?.poblacionVulnerable ?? 'vacio',
                nivelEducativo: item.user.datosGenerales[0]?.nivelEducativo ?? 'vacio',
                ocupacion: item.user.datosGenerales[0]?.ocupacion ?? 'vacio',
                regimenSalud: item.user.datosGenerales[0]?.regimenSalud ?? 'vacio',
                eps: item.user.datosGenerales[0]?.eps ?? 'vacio',
                grupoSanquineo: item.user.datosGenerales[0]?.grupoSanquineo ?? 'vacio',
                contactoEmergencia: item.user.datosGenerales[0]?.contactoEmergencia ?? 'vacio',
                telefonoContacto: item.user.datosGenerales[0]?.telefonoContacto ?? 'vacio',
            });
        });

        // Si no hay filtros, limitar a 5 registros y ordenar por nombre
        if (typeof name === 'undefined' && typeof documentNumber === 'undefined') {
          data = []
      }

        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// lista de usuarios no aprobados
// async findAllNoAprobados() {
//   try {
//     let data = [];
//     const queryOptions: any = {
//         relations: ['user.datosGenerales'],
//         where: { aprobado: false }
//     };

//     const rest = await this.parqRepository.find(queryOptions);
//     // console.log('Usuarios enviados desde el servidor:', rest);
//     console.log('Usuarios enviados desde el servidor:', rest);

//     rest.forEach(async (item) => {
//       const respuestaParq = await this.respuestaParqRepository.find({
//         relations: ['preguntaParq'],
//         where: { user: {id: item.user.id} }
//       });
//       console.log('respuestaParq:', respuestaParq);
//         data.push({
//             id: item.user.id,
//             nombre: item.user.datosGenerales[0]?.name ?? 'vacio',
//             documentType: item.user.datosGenerales[0]?.documentType ?? 'vacio',
//             documentNumber: item.user.datosGenerales[0]?.documentNumber ?? 'vacio',
//             phoneNumber: item.user.datosGenerales[0]?.phoneNumber ?? 'vacio',
//             birthDate: item.user.datosGenerales[0]?.birthDate ?? 'vacio',
//             address: item.user.datosGenerales[0]?.address ?? 'vacio',
//             barrio: item.user.datosGenerales[0]?.barrio ?? 'vacio',
//             comunaCorregimiento: item.user.datosGenerales[0]?.comunaCorregimiento ?? 'vacio',
//             aprobado: item.aprobado,
//             etnia: item.user.datosGenerales[0]?.etnia ?? 'vacio',
//             genero: item.user.datosGenerales[0].gender ?? 'vacio',
//             discapacidad: item.user.datosGenerales[0]?.discapacidad ?? 'vacio',
//             // preguntas y respuestas pqrq
//             preguntas: respuestaParq.map((item) => {
//               return {
//                 id: item.preguntaParq.id,
//                 pregunta: item.preguntaParq,
//                 // respuesta: item.respuestaParq
//               }
//             }),
//         });}); 

//     return data;
    
//   } catch (error) {
//     console.log(error);
//     return error;
    
//   }
// }

async findAllNoAprobados() {
  try {
    const data = [];
    const queryOptions: any = {
      relations: ['user.datosGenerales'],
      where: { aprobado: false }
    };

    const rest = await this.parqRepository.find(queryOptions);
    // console.log('Usuarios enviados desde el servidor:', rest);

    for (const item of rest) {
      const respuestaParq = await this.respuestaParqRepository.find({
        relations: ['preguntaParq'],
        where: { user: { id: item.user.id } }
      });
      // console.log('respuestaParq:', respuestaParq);

      data.push({
        id: item.user.id,
        nombre: item.user.datosGenerales[0]?.name ?? 'vacio',
        documentType: item.user.datosGenerales[0]?.documentType ?? 'vacio',
        documentNumber: item.user.datosGenerales[0]?.documentNumber ?? 'vacio',
        phoneNumber: item.user.datosGenerales[0]?.phoneNumber ?? 'vacio',
        birthDate: item.user.datosGenerales[0]?.birthDate ?? 'vacio',
        address: item.user.datosGenerales[0]?.address ?? 'vacio',
        barrio: item.user.datosGenerales[0]?.barrio ?? 'vacio',
        comunaCorregimiento: item.user.datosGenerales[0]?.comunaCorregimiento ?? 'vacio',
        aprobado: item.aprobado,
        etnia: item.user.datosGenerales[0]?.etnia ?? 'vacio',
        genero: item.user.datosGenerales[0]?.gender ?? 'vacio',
        discapacidad: item.user.datosGenerales[0]?.discapacidad ?? 'vacio',
        preguntas: respuestaParq.map((resp) => ({
          id: resp.preguntaParq.id,
          pregunta: resp.preguntaParq,
          respuesta: resp.respuestaParq
        }))
      });
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
}


//cambiar estado de aprobado
async updateAprobado(id: string) {
  try {
      const user = await this.parqRepository.findOne({ where: { user: {id} } });
      user.aprobado = !user.aprobado;
      await this.parqRepository.save(user);
      return user;
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
