// import { Injectable } from '@nestjs/common';
// import { CreateCalificacionDto } from './dto/create-calificacion.dto';
// import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { And, Repository } from 'typeorm';
// import { Calificacion } from './entities/calificacion.entity';
// import { User } from 'src/user/entities/user.entity';
// import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
// import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';

// @Injectable()
// export class CalificacionService {
//   constructor(
//     @InjectRepository(Calificacion)
//     private readonly calificacionRepository: Repository<Calificacion>,
//     @InjectRepository(Asistencia)
//     private readonly asistenciaRepository: Repository<Asistencia>,
//     @InjectRepository(DatosGenerale)
//     private readonly datosGeneraleRepository: Repository<DatosGenerale>,

//   ) { }
//   async create(user: User, createCalificacionDto: CreateCalificacionDto) {
//     try {
//       // busco el documento del usuario
//       const userDatos = await this.datosGeneraleRepository.findOne({
//         where: {
//           user: { id: user.id },
//         },
//       });
//       if (!userDatos) {
//         return 'No se encontro el documento del usuario';
//       }

//       // Actualizo la asistencia
//         const asistencia = await this.asistenciaRepository.findOne({
//           where: {
//             documento: userDatos.documentNumber,
//             actividad: { id: createCalificacionDto.actividad.id },
//           },
//         });
//         if (asistencia) {
//           asistencia.calificado = true;
//           await this.asistenciaRepository.save(asistencia);

//           const calificacion = this.calificacionRepository.create({
//             ...createCalificacionDto,
//             usuario: {id:user.id},
//           });
//           await this.calificacionRepository.save(calificacion);

//           return 'Calificacion creada con exito';
//         } else {
//           return 'No se encontro la asistencia';
//         }


//       } catch (error) {
//         console.log(error);
//         return 'Error al crear la calificacion';

//       }
    
//   }

//   async findAll(user) {
//     try {
//       const calificaciones = await this.calificacionRepository.find({
//         where: { usuario: { id: user.id } },
//         relations: ['usuario', 'actividad'],
//       });
//       return calificaciones;

//     } catch (error) {
//       console.log(error);
//       return 'Error al obtener las calificaciones';

//     }
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} calificacion`;
//   }

//   update(id: number, updateCalificacionDto: UpdateCalificacionDto) {
//     return `This action updates a #${id} calificacion`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} calificacion`;
//   }
// }


import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Calificacion } from './entities/calificacion.entity';
import { User } from 'src/user/entities/user.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';

@Injectable()
export class CalificacionService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly calificacionRepository: Repository<Calificacion>,
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(DatosGenerale)
    private readonly datosGeneraleRepository: Repository<DatosGenerale>,
    private readonly dataSource: DataSource,
  ) { }
  async create(user: User, createCalificacionDto: CreateCalificacionDto): Promise<string> {
    // Iniciamos una transacción para garantizar atomicidad
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Buscar el documento del usuario
      const userDatos = await this.datosGeneraleRepository.findOne({
        where: {
          user: { id: user.id },
        },
      });

      if (!userDatos) {
        throw new NotFoundException('No se encontró el documento del usuario');
      }

      // Verificar que el documento existe
      console.log('Documento del usuario:', userDatos.documentNumber);
      console.log('ID de actividad:', createCalificacionDto.actividad.id);

      // 2. Buscar la asistencia directamente con SQL nativo para evitar problemas con las relaciones
      const asistencias = await this.asistenciaRepository.query(
        `SELECT * FROM asistencia WHERE documento = $1 AND "actividadId" = $2`,
        [userDatos.documentNumber, createCalificacionDto.actividad.id]
      );

      if (!asistencias || asistencias.length === 0) {
        throw new NotFoundException('No se encontró la asistencia');
      }

      const asistencia = asistencias[0];
      console.log('Asistencia encontrada:', asistencia);

      // 3. Actualizar la asistencia
      await this.asistenciaRepository.query(
        `UPDATE asistencia SET calificado = true WHERE id = $1`,
        [asistencia.id]
      );

      // 4. Crear la calificación
      const calificacion = this.calificacionRepository.create({
        ...createCalificacionDto,
        usuario: { id: user.id },
      });
      await queryRunner.manager.save(calificacion);

      // Confirmar la transacción
      await queryRunner.commitTransaction();
      
      return 'Calificación creada con éxito';
    } catch (error) {
      // Revertir cambios en caso de error
      await queryRunner.rollbackTransaction();
      
      console.error('Error en create calificación:', error);
      
      if (error instanceof NotFoundException) {
        return error.message;
      }
      
      return 'Error al crear la calificación: ' + error.message;
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  async findAll(user: User) {
    try {
      const calificaciones = await this.calificacionRepository.find({
        where: { usuario: { id: user.id } },
        relations: ['usuario', 'actividad'],
      });
      return calificaciones;
    } catch (error) {
      console.error('Error al obtener calificaciones:', error);
      throw new InternalServerErrorException('Error al obtener las calificaciones');
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
