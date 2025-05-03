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

  /**
   * Calcula el promedio de calificaciones por actividad
   * @returns Array con los promedios de calificación por actividad
   */
  async getPromediosPorActividad() {
    try {
      // Utilizamos QueryBuilder para crear una consulta que calcule el promedio
      const promedios = await this.calificacionRepository
        .createQueryBuilder('calificacion')
        .select('actividad.id', 'actividadId')
        .addSelect('actividad.descripcion', 'descripcionActividad')
        .addSelect('actividad.fecha', 'fechaActividad')
        .addSelect('ROUND(AVG(calificacion.calificacion)::numeric, 2)', 'promedio')
        .addSelect('COUNT(calificacion.id)', 'totalCalificaciones')
        .innerJoin('calificacion.actividad', 'actividad')
        .where('calificacion.estado = :estado', { estado: true })
        .groupBy('actividad.id')
        .addGroupBy('actividad.descripcion')
        .addGroupBy('actividad.fecha')
        .orderBy('actividad.fecha', 'DESC')
        .getRawMany();

      return {
        message: 'Promedios calculados correctamente',
        data: promedios
      };
    } catch (error) {
      console.log('Error al calcular promedios:', error);
      return {
        message: 'Error al calcular los promedios de calificaciones',
        error: error.message
      };
    }
  }

  /**
   * Calcula el promedio de calificaciones para una actividad específica
   * @param actividadId ID de la actividad
   * @returns Promedio de calificaciones para la actividad
   */
  async getPromedioPorActividad(actividadId: string) {
    try {
      const promedio = await this.calificacionRepository
        .createQueryBuilder('calificacion')
        .select('actividad.id', 'actividadId')
        .addSelect('actividad.descripcion', 'descripcionActividad')
        .addSelect('ROUND(AVG(calificacion.calificacion)::numeric, 2)', 'promedio')
        .addSelect('COUNT(calificacion.id)', 'totalCalificaciones')
        .innerJoin('calificacion.actividad', 'actividad')
        .where('calificacion.estado = :estado', { estado: true })
        .andWhere('actividad.id = :actividadId', { actividadId })
        .groupBy('actividad.id')
        .addGroupBy('actividad.descripcion')
        .getRawOne();

      if (!promedio) {
        return {
          message: 'No se encontraron calificaciones para esta actividad',
          data: null
        };
      }

      return {
        message: 'Promedio calculado correctamente',
        data: promedio
      };
    } catch (error) {
      console.log('Error al calcular promedio de actividad:', error);
      return {
        message: 'Error al calcular el promedio de calificaciones',
        error: error.message
      };
    }
  }

  /**
   * Obtiene todas las calificaciones de una actividad específica con detalles del usuario
   * @param actividadId ID de la actividad
   * @returns Lista de calificaciones con detalles del usuario
   */
  async getCalificacionesPorActividad(actividadId: string) {
    try {
      const calificaciones = await this.calificacionRepository
        .createQueryBuilder('calificacion')
        // .select('calificacion.id', 'id')
        .addSelect('calificacion.calificacion', 'calificacion')
        .addSelect('calificacion.comentario', 'comentario')
        .addSelect('calificacion.fechaCreacion', 'fecha')
        // .addSelect('usuario.id', 'usuarioId')
        .addSelect('usuario.email', 'email')
        // .addSelect('usuario.usuario', 'nombreUsuario')
        .addSelect('datos.name', 'nombre')
        .innerJoin('calificacion.usuario', 'usuario')
        .innerJoin('calificacion.actividad', 'actividad')
        .leftJoin('usuario.datosGenerales', 'datos')
        .where('actividad.id = :actividadId', { actividadId })
        .andWhere('calificacion.estado = :estado', { estado: true })
        .orderBy('calificacion.fechaCreacion', 'DESC')
        .getRawMany();

      if (calificaciones.length === 0) {
        return {
          message: 'No se encontraron calificaciones para esta actividad',
          data: []
        };
      }

      // Formatear los datos para una mejor presentación
      const calificacionesFormateadas = calificaciones.map(cal => ({
        id: cal.id,
        calificacion: cal.calificacion,
        comentario: cal.comentario,
        fecha: cal.fecha,
        usuario: {
          id: cal.usuarioId,
          email: cal.email,
          usuario: cal.nombreUsuario,
          nombre: cal.nombre || 'Usuario sin nombre'
        }
      }));

      return {
        message: 'Calificaciones obtenidas correctamente',
        data: calificacionesFormateadas
      };
    } catch (error) {
      console.log('Error al obtener calificaciones por actividad:', error);
      return {
        message: 'Error al obtener las calificaciones de la actividad',
        error: error.message
      };
    }
  }

  /**
   * Obtiene las calificaciones del último mes de las actividades del monitor logueado
   * @param userId ID del usuario monitor
   * @returns Calificaciones del último mes con su promedio
   */
  async getCalificacionesUltimoMesMonitor(userId: string) {
    try {
      // Calculamos la fecha de hace un mes
      const fechaUnMesAtras = new Date();
      fechaUnMesAtras.setMonth(fechaUnMesAtras.getMonth() - 1);

      // Obtenemos las actividades del monitor
      const calificaciones = await this.calificacionRepository
        .createQueryBuilder('calificacion')
        .select('calificacion.id', 'id')
        .addSelect('calificacion.calificacion', 'calificacion')
        .addSelect('calificacion.comentario', 'comentario')
        .addSelect('calificacion.fechaCreacion', 'fecha')
        .addSelect('actividad.id', 'actividadId')
        .addSelect('actividad.descripcion', 'descripcionActividad')
        .addSelect('actividad.fecha', 'fechaActividad')
        .addSelect('usuario.id', 'usuarioId')
        .addSelect('usuario.email', 'email')
        .addSelect('usuario.usuario', 'nombreUsuario')
        .addSelect('datos.name', 'nombre')
        .innerJoin('calificacion.actividad', 'actividad')
        .innerJoin('actividad.user', 'monitor')
        .innerJoin('calificacion.usuario', 'usuario')
        .leftJoin('usuario.datosGenerales', 'datos')
        .where('monitor.id = :userId', { userId })
        .andWhere('calificacion.fechaCreacion >= :fechaUnMesAtras', { fechaUnMesAtras })
        .andWhere('calificacion.estado = :estado', { estado: true })
        .orderBy('calificacion.fechaCreacion', 'DESC')
        .getRawMany();

      if (calificaciones.length === 0) {
        return {
          message: 'No se encontraron calificaciones en el último mes',
          data: {
            calificaciones: [],
            promedio: 0,
            totalCalificaciones: 0,
            actividadesCalificadas: 0
          }
        };
      }

      // Calculamos el promedio general de todas las calificaciones
      const totalCalificaciones = calificaciones.length;
      const sumaCalificaciones = calificaciones.reduce(
        (sum, cal) => sum + parseFloat(cal.calificacion), 
        0
      );
      const promedio = parseFloat((sumaCalificaciones / totalCalificaciones).toFixed(2));

      // Agrupamos las calificaciones por actividad para estadísticas
      const actividadesMap = new Map();
      calificaciones.forEach(cal => {
        if (!actividadesMap.has(cal.actividadId)) {
          actividadesMap.set(cal.actividadId, {
            id: cal.actividadId,
            descripcion: cal.descripcionActividad,
            fecha: cal.fechaActividad,
            calificaciones: [],
            promedio: 0
          });
        }
        actividadesMap.get(cal.actividadId).calificaciones.push(parseFloat(cal.calificacion));
      });

      // Calculamos el promedio por actividad
      const actividadesResumen = Array.from(actividadesMap.values()).map(act => {
        const sumaAct = act.calificaciones.reduce((sum, cal) => sum + cal, 0);
        const promedioAct = parseFloat((sumaAct / act.calificaciones.length).toFixed(2));
        return {
          id: act.id,
          descripcion: act.descripcion,
          fecha: act.fecha,
          totalCalificaciones: act.calificaciones.length,
          promedio: promedioAct
        };
      });

      // Formateamos los datos para una mejor presentación
      const calificacionesFormateadas = calificaciones.map(cal => ({
        id: cal.id,
        calificacion: cal.calificacion,
        comentario: cal.comentario,
        fecha: cal.fecha,
        actividad: {
          id: cal.actividadId,
          descripcion: cal.descripcionActividad,
          fecha: cal.fechaActividad
        },
        usuario: {
          id: cal.usuarioId,
          email: cal.email,
          usuario: cal.nombreUsuario,
          nombre: cal.nombre || 'Usuario sin nombre'
        }
      }));

      return {
        message: 'Calificaciones del último mes obtenidas correctamente',
        data: {
          // calificaciones: calificacionesFormateadas,
          promedio,
          totalCalificaciones,
          actividadesCalificadas: actividadesMap.size,
          resumenActividades: actividadesResumen
        }
      };
    } catch (error) {
      console.log('Error al obtener calificaciones del último mes:', error);
      return {
        message: 'Error al obtener las calificaciones del último mes',
        error: error.message
      };
    }
  }
}
