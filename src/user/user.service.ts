import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { Repository,QueryRunner, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';
import { Caracterizacion } from 'src/caracterizacion/entities/caracterizacion.entity';
import { Parq } from 'src/parq/entities/parq.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(DatosGenerale) private readonly datosGeneraleRepository: Repository<DatosGenerale>,
    private readonly dataSource: DataSource,
    @InjectRepository(Caracterizacion)
    private readonly caracterizacionRepository: Repository<Caracterizacion>,
    @InjectRepository(Parq)
    private readonly parqRepository: Repository<Parq>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    // Iniciar la transacción
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { password, ...userData } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      // Guardar usuario en la transacción
      const savedUser = await queryRunner.manager.save(user);

      // Crear datos generales
      const datosGenerale = this.datosGeneraleRepository.create({
        user: savedUser, // Relacionando con el usuario creado
        name: createUserDto.name,
        documentType: createUserDto.documentType,
        documentNumber: createUserDto.documentNumber,
        phoneNumber: createUserDto.phoneNumber,
        birthDate: createUserDto.birthDate,
        address: createUserDto.address,
        barrio: createUserDto.barrio,
        comunaCorregimiento: createUserDto.comunaCorregimiento,
        etnia: createUserDto.etnia,
        discapacidad: createUserDto.discapacidad,
        gender: createUserDto.gender,
        poblacionVulnerable: createUserDto.poblacionVulnerable,
        nivelEducativo: createUserDto.nivelEducativo,
        ocupacion: createUserDto.ocupacion,
        regimenSalud: createUserDto.regimenSalud,
        eps: createUserDto.eps,
        grupoSanquineo: createUserDto.grupoSanquineo,
        contactoEmergencia: createUserDto.contactoEmergencia,
        telefonoContacto: createUserDto.telefonoContacto,
        zona: createUserDto.zona,
      });

      // Guardar datos generales en la transacción
      await queryRunner.manager.save(datosGenerale);

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      return {
        ...savedUser,
        token: this.getJwtToken({ id: savedUser.id }),
        password: undefined, // No devolver la contraseña
      };
    } catch (error) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw new Error(`Error al crear usuario: ${error.message}`);
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  // cambiar contraseña
  async changePassword(id: string, newPassword: string) {
    console.log('contraseña: ', newPassword);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
      });
      if (!user) {
        throw new UnauthorizedException('usuario no encontrado');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return { message: 'cambio de contraseña exitoso' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error al cambiar contraseña: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
  

  async login(loginUserDto: LoginUserDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    let transactionStarted = false;
    
    try {
      let caract = true;
      let parq = true;
      let parqAprovado = false;
      const { email, password } = loginUserDto;
      
      // Conectar primero
      await queryRunner.connect();
      
      // Iniciar la transacción y marcar como iniciada
      await queryRunner.startTransaction();
      transactionStarted = true;
    
      // Buscar usuario en la base de datos dentro de la transacción
      const user = await queryRunner.manager.findOne(User, {
        relations: ['datosGenerales'],
        where: { email },
        select: ['email', 'password', 'id', 'role', 'datosGenerales'],
      });
    
      if (!user) {
        throw new UnauthorizedException('el correo no existe');
      }
    
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('contraseña incorrecta');
      }
    
      // Consultar caracterización dentro de la transacción
      const caracterizacion = await queryRunner.manager.findOne(Caracterizacion, {
        where: { 
          user: { id: user.id },
          terminada: true,
         },
      });
    
      if (!caracterizacion || !caracterizacion.terminada) {
        caract = false;
      }
    
      // Consultar PAR-Q dentro de la transacción
      const parqUser = await queryRunner.manager.findOne(Parq, {
        where: { user: { id: user.id } },
      });

      if(parqUser && parqUser.aprobado){
        parqAprovado = true;
      }
    
      if (!parqUser) {
        parq = false;
      }
    
      // Confirmar la transacción si todo está correcto
      await queryRunner.commitTransaction();
      
      // Verificar si datosGenerales existe y tiene elementos antes de acceder a sus propiedades
      const userName = user.datosGenerales && user.datosGenerales.length > 0 
        ? (user.datosGenerales[0].name || 'Sin nombre')
        : 'Sin nombre';
      
      const userPhone = user.datosGenerales && user.datosGenerales.length > 0 
        ? (user.datosGenerales[0].phoneNumber || 'Sin telefono')
        : 'Sin telefono';
      
      const userDocumento = user.datosGenerales && user.datosGenerales.length > 0 
        ? user.datosGenerales[0].documentNumber 
        : '';
    
      return {
        id: user.id,
        email: user.email,
        name: userName,
        phoneNumber: userPhone,
        documento: userDocumento,
        token: this.getJwtToken({ id: user.id }),
        caracterizacion: caract,
        role: user.role,
        parq: parq,
        parqAprovado: parqAprovado,
        password: undefined,
      };
    
    } catch (error) {
      // Solo hacer rollback si la transacción se inició
      if (transactionStarted) {
        await queryRunner.rollbackTransaction();
      }
      
      throw error;
    } finally {
      // Siempre liberar el queryRunner
      if (queryRunner && !queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }
  // async login(loginUserDto: LoginUserDto) {
  //   try {
  //     let caract = true;
  //     let parq= true;
  //     const { email, password } = loginUserDto;

  //     const user = await this.userRepository.findOne({ 
  //       where: { email },
  //       select: ['email', 'password', 'id'],
  //      });

  //      if (!user){
  //         throw new UnauthorizedException('Invalid imail');
  //      }

  //       const isPasswordValid = await bcrypt.compareSync(password, user.password);

  //       if (!isPasswordValid){
  //         throw new UnauthorizedException('Invalid password');
  //       }

  //       // consulto que la caractirizacion este completa o si existe
  //       const caracterizacion = await this.caracterizacionRepository.findOne({
  //         where: { user: {id: user.id} },
  //       }); 

  //       if (!caracterizacion || !caracterizacion.terminada){
  //         caract = false;
  //       }

  //       // consulto que el parq este completo o si existe
  //       const parqUser = await this.parqRepository.findOne({
  //         where: { user: {id: user.id} },
  //       });

  //       if (!parqUser.aprobado){
  //         parq = false;
  //       }

  //       return {
  //         ...user,
  //         token: this.getJwtToken({ 
  //           // email: user.email,
  //           id: user.id,
  //         }),
  //         'caracterizacion': caract,
  //         'parq': parq,
  //         password: undefined,
  //       }

  //   } catch (error) {

  //     return error;
      
  //   }
  // }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // traer los usuarios con rol monitor
  async findMonitores(){
    try {
      const monitores = await this.userRepository.find({
        
        where: {
          isActive: true,
        },
        relations: ['datosGenerales'],
      });

      const monitoresFiltrados = monitores.filter((monitor) => monitor.role.includes('monitor'));
      return monitoresFiltrados;
    } catch (error) {
      console.log(error);
      return 'Error al obtener los monitores';
    }
  }

  // crear monitor
  async createMonitor(createMonitorDto: CreateMonitorDto) {
    let rol: string
    if(createMonitorDto.rol.includes('monitor')){
      rol = 'monitor'
    }else if(createMonitorDto.rol.includes('medico')){
      rol = 'medico'
    }else{
      // devuelvo un error
      throw new HttpException('El rol no es valido', 400);
    }
    const queryRunner = this.dataSource.createQueryRunner();  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { password, ...userData } = createMonitorDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
        role: [rol], 
      });
      const savedUser = await queryRunner.manager.save(user);
      const datosGenerale = this.datosGeneraleRepository.create({
      });
      await queryRunner.manager.save(datosGenerale);
      await queryRunner.commitTransaction();
      return {
        ...savedUser,
        token: this.getJwtToken({ id: savedUser.id }),
        password: undefined,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error al crear monitor: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

}
