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

  async verificarAsistenciaExistente(createAsistenciaDto: CreateAsistenciaDto): Promise<boolean> {
    try {
      console.log('Verificando asistencia existente con:', {
        documento: createAsistenciaDto.documento,
        actividadId: createAsistenciaDto.actividad.id
      });

      // Asegurarse de que la actividad.id sea un string válido
      const actividadId = typeof createAsistenciaDto.actividad === 'string' 
        ? createAsistenciaDto.actividad 
        : createAsistenciaDto.actividad.id;

      // Usando QueryBuilder para mayor claridad y control
      const asistenciaExistente = await this.asistenciaRepository
        .createQueryBuilder('asistencia')
        .innerJoinAndSelect('asistencia.actividad', 'actividad')
        .where('asistencia.documento = :documento', { documento: createAsistenciaDto.documento })
        .andWhere('actividad.id = :actividadId', { actividadId })
        .getOne();

      console.log('Resultado de la búsqueda:', asistenciaExistente);
      
      return !!asistenciaExistente;
    } catch (error) {
      console.error('Error al verificar asistencia existente:', error);
      return false;
    }
  }

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    try {
      // Verificar si ya existe una asistencia para este documento y esta actividad
      const existeAsistencia = await this.verificarAsistenciaExistente(createAsistenciaDto);
      
      if(existeAsistencia){
        return 'Ya existe una asistencia para esta actividad';
      }

      // Si no existe, crear la nueva asistencia
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
  
      // Obtener los nombres de los monitores
      const monitores = await Promise.all(
        actividades.map(async (actividad) => {
          const monitorDatos = await this.datosGeneraleRepository.findOne({
            where: {
              user: { id: actividad.user.id },
            },
          });
          return {
            actividadId: actividad.id,
            nombre: monitorDatos ? monitorDatos.name : 'Nombre no disponible',
          };
        })
      );
  
      return {
        asistencias: asistencias.map((asistencia) => {
          const actividad = actividades.find(
            (actividad) => actividad.id === asistencia.actividad.id,
          );
          const monitor = monitores.find(
            (monitor) => monitor.actividadId === actividad.id,
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
                nombre: monitor.nombre, // Incluye el nombre del monitor
              },
            },
          };
        }),
        actividades: actividades.map((actividad) => {
          const monitor = monitores.find(
            (monitor) => monitor.actividadId === actividad.id,
          );
          return {
            ...actividad,
            tipoActividad: {
              nombre: actividad.tipoActividad.nombre,
            },
            parque: {
              nombre: actividad.parque.nombre, // Incluye el nombre del parque
            },
            monitor: {
              nombre: monitor.nombre, // Incluye el nombre del monitor
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

  async findOne(id: string) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }

  // traer asistencias por id de actividad y traer el numero de asistencias que en este caso es el numero de registeros
  async findByActividad(id: string) {
    try {
      const asistencias = await this.asistenciaRepository.find({
        relations: ['actividad'],
        where: {
          actividad: { id },
        },
      });

      return {
        numAsitencia: asistencias.length
      }
       
    }
    catch (error) {
      console.log(error);
      return 'Error al obtener numero de asistencias';
    }
  }

}
