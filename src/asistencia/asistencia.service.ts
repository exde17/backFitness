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
import { 
  GenderStatistics, 
  BarrioGenderStatistics, 
  ZonaGenderStatistics,
  GenderStatisticsResponse
} from './interfaces/gender-statistics.interface';

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

  /**
   * Calcula el promedio de asistencias por género
   * @returns Estadísticas de asistencia por género
   */
  async getAttendanceAverageByGender(): Promise<GenderStatisticsResponse> {
    try {
      // Primero, obtener el total de asistencias para verificar
      const totalAsistencias = await this.asistenciaRepository.count();
      // console.log(`Total de asistencias en la base de datos: ${totalAsistencias}`);

      // Obtener todos los géneros únicos de la base de datos
      const gendersResult = await this.datosGeneraleRepository
        .createQueryBuilder('datosGenerales')
        .select('DISTINCT datosGenerales.gender', 'gender')
        .where('datosGenerales.gender IS NOT NULL')
        .getRawMany();
      
      const uniqueGenders = gendersResult.map(item => item.gender);
      // console.log('Géneros únicos encontrados:', uniqueGenders);
      
      // Obtener todos los barrios únicos de la base de datos
      const barriosResult = await this.datosGeneraleRepository
        .createQueryBuilder('datosGenerales')
        .select('DISTINCT datosGenerales.barrio', 'barrio')
        .where('datosGenerales.barrio IS NOT NULL')
        .getRawMany();
      
      const uniqueBarrios = barriosResult.map(item => item.barrio);
      // console.log('Barrios únicos encontrados:', uniqueBarrios);
      
      // Obtener todas las zonas únicas de la base de datos
      const zonasResult = await this.datosGeneraleRepository
        .createQueryBuilder('datosGenerales')
        .select('DISTINCT datosGenerales.zona', 'zona')
        .where('datosGenerales.zona IS NOT NULL')
        .getRawMany();
      
      const uniqueZonas = zonasResult.map(item => item.zona);
      // console.log('Zonas únicas encontradas:', uniqueZonas);

      // Obtener todas las asistencias con sus documentos
      const asistencias = await this.asistenciaRepository.find();
      // console.log(`Asistencias recuperadas: ${asistencias.length}`);

      // Obtener todos los datos generales para mapear documentos a géneros, barrios y zonas
      const datosGenerales = await this.datosGeneraleRepository.find();
      // console.log(`Datos generales recuperados: ${datosGenerales.length}`);

      // Crear un mapa de documento a datos generales para búsqueda rápida
      const documentoMap = new Map<string, DatosGenerale>();
      datosGenerales.forEach(dato => {
        documentoMap.set(dato.documentNumber, dato);
      });

      // Procesar manualmente las asistencias para crear los datos de estadísticas
      const attendanceData = [];
      
      for (const asistencia of asistencias) {
        const documento = asistencia.documento;
        const datosGenerale = documentoMap.get(documento);
        
        if (datosGenerale) {
          attendanceData.push({
            gender: datosGenerale.gender || 'No especificado',
            barrio: datosGenerale.barrio || 'No especificado',
            zona: datosGenerale.zona || 'No especificado',
            attendanceCount: 1
          });
        } else {
          console.log(`No se encontraron datos generales para el documento: ${documento}`);
          attendanceData.push({
            gender: 'No especificado',
            barrio: 'No especificado',
            zona: 'No especificado',
            attendanceCount: 1
          });
        }
      }

      console.log(`Datos de asistencia procesados: ${attendanceData.length}`);
      console.log('Muestra de datos procesados:', attendanceData.slice(0, 3));

      // Calcular estadísticas generales por género
      const generalStats = this.calculateGeneralStatistics(attendanceData, uniqueGenders);
      
      // Calcular estadísticas por barrio
      const barrioStats = this.calculateBarrioStatistics(attendanceData, uniqueGenders, uniqueBarrios);
      
      // Calcular estadísticas por zona (rural/urbana)
      const zonaStats = this.calculateZonaStatistics(attendanceData, uniqueGenders, uniqueZonas);

      return {
        general: generalStats,
        byBarrio: barrioStats,
        byZona: zonaStats,
      };
    } catch (error) {
      console.log('Error al obtener estadísticas de asistencia por género:', error);
      throw new Error('Error al obtener estadísticas de asistencia por género');
    }
  }

  /**
   * Calcula estadísticas generales de asistencia por género
   */
  private calculateGeneralStatistics(data: any[], uniqueGenders: string[]): GenderStatistics[] {
    // Crear un mapa para contar asistencias por género
    const genderCountMap = new Map<string, number>();
    
    // Inicializar con todos los géneros
    uniqueGenders.forEach(gender => {
      genderCountMap.set(gender, 0);
    });
    
    // Asegurarse de que 'No especificado' esté en el mapa
    if (!genderCountMap.has('No especificado')) {
      genderCountMap.set('No especificado', 0);
    }
    
    // Contar asistencias por género
    data.forEach(item => {
      const gender = item.gender;
      const currentCount = genderCountMap.get(gender) || 0;
      genderCountMap.set(gender, currentCount + 1);
    });
    
    // Convertir a formato de estadísticas
    return Array.from(genderCountMap.entries()).map(([gender, count]) => ({
      gender,
      count,
      average: count // En este caso, el promedio es igual al conteo ya que cada asistencia cuenta como 1
    }));
  }

  /**
   * Calcula estadísticas de asistencia por género y barrio
   */
  private calculateBarrioStatistics(
    data: any[], 
    uniqueGenders: string[], 
    uniqueBarrios: string[]
  ): BarrioGenderStatistics[] {
    // Crear un mapa para agrupar por barrio
    const barrioMap = new Map<string, Map<string, number>>();
    
    // Inicializar con todos los barrios
    uniqueBarrios.forEach(barrio => {
      const genderMap = new Map<string, number>();
      uniqueGenders.forEach(gender => {
        genderMap.set(gender, 0);
      });
      // Asegurarse de que 'No especificado' esté en el mapa
      if (!genderMap.has('No especificado')) {
        genderMap.set('No especificado', 0);
      }
      barrioMap.set(barrio, genderMap);
    });
    
    // Asegurarse de que 'No especificado' esté en el mapa de barrios
    if (!barrioMap.has('No especificado')) {
      const genderMap = new Map<string, number>();
      uniqueGenders.forEach(gender => {
        genderMap.set(gender, 0);
      });
      genderMap.set('No especificado', 0);
      barrioMap.set('No especificado', genderMap);
    }
    
    // Contar asistencias por barrio y género
    data.forEach(item => {
      const barrio = item.barrio;
      const gender = item.gender;
      
      if (!barrioMap.has(barrio)) {
        const genderMap = new Map<string, number>();
        uniqueGenders.forEach(g => {
          genderMap.set(g, 0);
        });
        genderMap.set('No especificado', 0);
        barrioMap.set(barrio, genderMap);
      }
      
      const genderMap = barrioMap.get(barrio);
      const currentCount = genderMap.get(gender) || 0;
      genderMap.set(gender, currentCount + 1);
    });
    
    // Convertir a formato de estadísticas
    return Array.from(barrioMap.entries()).map(([barrio, genderMap]) => ({
      barrio,
      statistics: Array.from(genderMap.entries()).map(([gender, count]) => ({
        gender,
        count,
        average: count // En este caso, el promedio es igual al conteo ya que cada asistencia cuenta como 1
      }))
    }));
  }

  /**
   * Calcula estadísticas de asistencia por género y zona (rural/urbana)
   */
  private calculateZonaStatistics(
    data: any[], 
    uniqueGenders: string[], 
    uniqueZonas: string[]
  ): ZonaGenderStatistics[] {
    // Crear un mapa para agrupar por zona
    const zonaMap = new Map<string, Map<string, number>>();
    
    // Inicializar con todas las zonas
    uniqueZonas.forEach(zona => {
      const genderMap = new Map<string, number>();
      uniqueGenders.forEach(gender => {
        genderMap.set(gender, 0);
      });
      // Asegurarse de que 'No especificado' esté en el mapa
      if (!genderMap.has('No especificado')) {
        genderMap.set('No especificado', 0);
      }
      zonaMap.set(zona, genderMap);
    });
    
    // Asegurarse de que 'No especificado' esté en el mapa de zonas
    if (!zonaMap.has('No especificado')) {
      const genderMap = new Map<string, number>();
      uniqueGenders.forEach(gender => {
        genderMap.set(gender, 0);
      });
      genderMap.set('No especificado', 0);
      zonaMap.set('No especificado', genderMap);
    }
    
    // Contar asistencias por zona y género
    data.forEach(item => {
      const zona = item.zona;
      const gender = item.gender;
      
      if (!zonaMap.has(zona)) {
        const genderMap = new Map<string, number>();
        uniqueGenders.forEach(g => {
          genderMap.set(g, 0);
        });
        genderMap.set('No especificado', 0);
        zonaMap.set(zona, genderMap);
      }
      
      const genderMap = zonaMap.get(zona);
      const currentCount = genderMap.get(gender) || 0;
      genderMap.set(gender, currentCount + 1);
    });
    
    // Convertir a formato de estadísticas
    return Array.from(zonaMap.entries()).map(([zona, genderMap]) => ({
      zona,
      statistics: Array.from(genderMap.entries()).map(([gender, count]) => ({
        gender,
        count,
        average: count // En este caso, el promedio es igual al conteo ya que cada asistencia cuenta como 1
      }))
    }));
  }
}
