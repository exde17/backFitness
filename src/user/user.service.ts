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

  async login(loginUserDto: LoginUserDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); // 🔥 Inicia la transacción
  
    try {
      let caract = true;
      let parq = true;
      const { email, password } = loginUserDto;
  
      // 📌 Buscar usuario en la base de datos dentro de la transacción
      const user = await queryRunner.manager.findOne(User, {
        where: { email },
        select: ['email', 'password', 'id'],
      });
  
      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }
  
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
  
      // 📌 Consultar caracterización dentro de la transacción
      const caracterizacion = await queryRunner.manager.findOne(Caracterizacion, {
        where: { 
          user: { id: user.id },
          terminada: true,
         },
      });
  
      if (!caracterizacion || !caracterizacion.terminada) {
        caract = false;
      }
  
      // 📌 Consultar PAR-Q dentro de la transacción
      const parqUser = await queryRunner.manager.findOne(Parq, {
        where: { user: { id: user.id } },
      });
  
      if (!parqUser) {
        parq = false;
      }
  
      // 🔥 Confirmar la transacción si todo está correcto
      await queryRunner.commitTransaction();
      await queryRunner.release();
  
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
        caracterizacion: caract,
        parq: parq,
        password: undefined,
      };
  
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 🔥 Revertir cambios si hay error
      await queryRunner.release();
  
      throw error;
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
}
