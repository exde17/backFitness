import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { In, Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { Parque } from 'src/parque/entities/parque.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(DatosGenerale)
    private readonly datosGeneraleRepository: Repository<DatosGenerale>,
    @InjectRepository(Actividade) 
    private readonly actividadeRepository: Repository<Actividade>,
    @InjectRepository(Parque)
    private readonly parqueRepository: Repository<Parque>,  
  ){}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    try {
      // verifico si existe alguna asistencia con el mismo usuario y la misma actividad
      const asistenciaExistente = await this.asistenciaRepository.findOne({
        relations: [ 'actividad'],
        where: {
          // user: {id:createAsistenciaDto.user.id},
          documento: createAsistenciaDto.documento,
          actividad: {id: createAsistenciaDto.actividad.id},
        }
      });

      if(asistenciaExistente){
        return 'Ya existe una asistencia para esta actividad';
      }
      const asistencia = this.asistenciaRepository.create({
        ...createAsistenciaDto,
        fecha: new Date(),
      });

      await this.asistenciaRepository.save(asistencia);
      return 'asistencia creada con exito';
    } catch (error) {
      console.log(error);
      return 'Error al crear la asistencia';
      
    }
  }

  // async findAllNoCalificadas(user: User) {
  //   try {
  //     // busco el documento del usuario
  //     const userDatos = await this.datosGeneraleRepository.findOne({
  //       where: {
  //         user: { id: user.id },
  //       },
  //       relations: ['user'],
  //     });
  //     if (!userDatos) {
  //       return 'No se encontro el documento del usuario';
  //     }
      
  //     const asistencias = await this.asistenciaRepository.find({
  //       relations: ['actividad'],
  //       where: {
  //         documento: userDatos.documentNumber,
  //         calificado: false,
  //       },
  //     });
  
  //     // buscar nombre tipo actividad y parque
  //     const actividades = await this.actividadeRepository.find({
  //       relations: ['tipoActividad', 'parque'], // Incluye la relación con parque
  //       where: {
  //         id: In(asistencias.map((asistencia) => asistencia.actividad.id)),
  //       },
  //     });
  
  //     return {
  //       asistencias: asistencias.map((asistencia) => {
  //         const actividad = actividades.find(
  //           (actividad) => actividad.id === asistencia.actividad.id,
  //         );
  //         return {
  //           ...asistencia,
  //           actividad: {
  //             ...actividad,
  //             tipoActividad: {
  //               nombre: actividad.tipoActividad.nombre,
  //             },
  //             parque: {
  //               nombre: actividad.parque.nombre, // Incluye el nombre del parque
  //             },
  //           },
  //         };
  //       }),
  //       actividades: actividades.map((actividad) => {
  //         return {
  //           ...actividad,
  //           tipoActividad: {
  //             nombre: actividad.tipoActividad.nombre,
  //           },
  //           parque: {
  //             nombre: actividad.parque.nombre, // Incluye el nombre del parque
  //           },
  //         };
  //       }),
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return 'Error al obtener las asistencias';
  //   }
  // }

  async findAllNoCalificadas(user: User) {
    try {
      // busco el documento del usuario
      const userDatos = await this.datosGeneraleRepository.findOne({
        where: {
          user: { id: user.id },
        },
        relations: ['user'],
      });
      if (!userDatos) {
        return 'No se encontro el documento del usuario';
      }
      
      const asistencias = await this.asistenciaRepository.find({
        relations: ['actividad'],
        where: {
          documento: userDatos.documentNumber,
          calificado: false,
        },
      });
  
      // buscar nombre tipo actividad, parque y monitor
      const actividades = await this.actividadeRepository.find({
        relations: ['tipoActividad', 'parque', 'user'], // Incluye la relación con user
        where: {
          id: In(asistencias.map((asistencia) => asistencia.actividad.id)),
        },
      });
  
      return {
        asistencias: asistencias.map((asistencia) => {
          const actividad = actividades.find(
            (actividad) => actividad.id === asistencia.actividad.id,
          );
          return {
            ...asistencia,
            actividad: {
              ...actividad,
              tipoActividad: {
                nombre: actividad.tipoActividad.nombre,
              },
              parque: {
                nombre: actividad.parque.nombre, // Incluye el nombre del parque
              },
              monitor: {
                nombre: actividad.user.email, // Incluye el nombre del monitor (puedes cambiar a otra propiedad si es necesario)
              },
            },
          };
        }),
        actividades: actividades.map((actividad) => {
          return {
            ...actividad,
            tipoActividad: {
              nombre: actividad.tipoActividad.nombre,
            },
            parque: {
              nombre: actividad.parque.nombre, // Incluye el nombre del parque
            },
            monitor: {
              nombre: actividad.user.datosGenerales[0].name, // Incluye el nombre del monitor (puedes cambiar a otra propiedad si es necesario)
            },
          };
        }),
      };
    } catch (error) {
      console.log(error);
      return 'Error al obtener las asistencias';
    }
  }

  findAll() {
    return `This action returns all asistencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}
