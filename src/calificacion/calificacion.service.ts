// import { Injectable, ConflictException } from '@nestjs/common';
// import { CreateCalificacionDto } from './dto/create-calificacion.dto';
// import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DataSource } from 'typeorm';
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
//     private readonly dataSource: DataSource,
//   ) { }
//   async create(user: User, createCalificacionDto: CreateCalificacionDto) {
//     // Iniciamos una transacción para garantizar atomicidad
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       // 1. Buscar el documento del usuario
//       const userDatos = await this.datosGeneraleRepository.findOne({
//         where: {
//           user: { id: user.id },
//         },
//       });
      
//       if (!userDatos) {
//         return 'No se encontró el documento del usuario';
//       }

//       // 2. Verificar si ya existe una calificación para esta actividad y usuario
//       const existingCalificacion = await this.calificacionRepository.findOne({
//         where: {
//           usuario: { id: user.id },
//           actividad: { id: createCalificacionDto.actividad.id },
//         },
//       });

//       if (existingCalificacion) {
//         return 'Ya existe una calificación para esta actividad';
//       }

//       // 3. Buscar la asistencia
//       const asistencia = await this.asistenciaRepository.findOne({
//         where: {
//           documento: userDatos.documentNumber,
//           actividad: { id: createCalificacionDto.actividad.id },
//         },
//       });

//       if (!asistencia) {
//         return 'No se encontró la asistencia';
//       }

//       // 4. Verificar si la asistencia ya está calificada
//       if (asistencia.calificado) {
//         return 'Esta asistencia ya ha sido calificada';
//       }

//       // 5. Actualizar explícitamente el estado de la asistencia usando queryRunner
//       // para asegurar que se ejecute dentro de la transacción
//       await queryRunner.manager.update(
//         Asistencia,
//         { id: asistencia.id },
//         { calificado: true }
//       );
      
//       // 6. Crear la calificación
//       const calificacion = this.calificacionRepository.create({
//         ...createCalificacionDto,
//         usuario: { id: user.id },
//       });
      
//       await queryRunner.manager.save(calificacion);
      
//       // Confirmar la transacción
//       await queryRunner.commitTransaction();
      
//       return 'Calificación creada con éxito';
//     } catch (error) {
//       // Revertir cambios en caso de error
//       await queryRunner.rollbackTransaction();
      
//       console.log('Error en create calificación:', error);
      
//       // Verificar si es un error de restricción de base de datos
//       if (error.code === '23505') { // Código para violación de restricción única en PostgreSQL
//         return 'Ya existe una calificación para esta actividad';
//       }
      
//       return 'Error al crear la calificación: ' + error.message;
//     } finally {
//       // Liberar el queryRunner
//       await queryRunner.release();
//     }
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

import { Injectable } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  ) { }
  async create(user: User, createCalificacionDto: CreateCalificacionDto) {
    try {
      // Busco el documento del usuario
      const userDatos = await this.datosGeneraleRepository.findOne({
        where: {
          user: { id: user.id },
        },
      });
      
      if (!userDatos) {
        return 'No se encontró el documento del usuario';
      }

      console.log('Documento del usuario:', userDatos.documentNumber);
      
      // Verificar el formato de la actividad
      let actividadId;
      
      // Si la actividad es un string (ID directo), lo usamos directamente
      if (typeof createCalificacionDto.actividad === 'string') {
        actividadId = createCalificacionDto.actividad;
        console.log('Actividad es un string ID:', actividadId);
      } 
      // Si la actividad es un objeto con propiedad id, usamos esa propiedad
      else if (createCalificacionDto.actividad && createCalificacionDto.actividad.id) {
        actividadId = createCalificacionDto.actividad.id;
        console.log('Actividad es un objeto con ID:', actividadId);
      }
      // Si no podemos determinar el ID, retornamos error
      else {
        console.log('Formato de actividad no reconocido:', createCalificacionDto.actividad);
        return 'Formato de actividad no válido';
      }

      // Buscar la asistencia usando QueryBuilder para tener más control
      const asistencia = await this.asistenciaRepository
        .createQueryBuilder('asistencia')
        .innerJoinAndSelect('asistencia.actividad', 'actividad')
        .where('asistencia.documento = :documento', { documento: userDatos.documentNumber })
        .andWhere('actividad.id = :actividadId', { actividadId })
        .getOne();

      if (!asistencia) {
        console.log('No se encontró asistencia para documento:', userDatos.documentNumber, 'y actividad:', actividadId);
        return 'No se encontró la asistencia';
      }

      console.log('Asistencia encontrada:', asistencia.id);

      // Actualizar la asistencia
      asistencia.calificado = true;
      await this.asistenciaRepository.save(asistencia);
      console.log('Asistencia actualizada con calificado = true');

      // Crear la calificación
      const calificacion = this.calificacionRepository.create({
        calificacion: createCalificacionDto.calificacion,
        usuario: { id: user.id },
        actividad: { id: actividadId },
        comentario: createCalificacionDto.comentario,
      });
      
      await this.calificacionRepository.save(calificacion);
      console.log('Calificación creada con éxito');

      return 'Calificación creada con éxito';
    } catch (error) {
      console.log('Error en create calificación:', error);
      return 'Error al crear la calificación: ' + error.message;
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
