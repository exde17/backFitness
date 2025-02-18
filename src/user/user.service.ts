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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(DatosGenerale) private readonly datosGeneraleRepository: Repository<DatosGenerale>,
    private readonly dataSource: DataSource,
  ) {}

  // async create(createUserDto: CreateUserDto) {
  //   try {
  //     const { password, ...userData } = createUserDto;

  //     const user = this.userRepository.create({
  //       ...userData,
  //       password: await bcrypt.hashSync(password, 10),
  //     });

  //     await this.userRepository.save(user);

  //     //guardo en datos generales
  //     const datosGenerale = this.datosGeneraleRepository.create({
  //       user: user,
  //       name: createUserDto.name,
  //       documentType: createUserDto.documentType,
  //       documentNumber: createUserDto.documentNumber,
  //       phoneNumber: createUserDto.phoneNumber,
  //       birthDate: createUserDto.birthDate,
  //       address: createUserDto.address,
  //       barrio: createUserDto.barrio,
  //       comunaCorregimiento: createUserDto.comunaCorregimiento,
  //       etnia: createUserDto.etnia,
  //       discapacidad: createUserDto.discapacidad,
  //       gender: createUserDto.gender,
  //       poblacionVulnerable: createUserDto.poblacionVulnerable,
  //       nivelEducativo: createUserDto.nivelEducativo,
  //       ocupacion: createUserDto.ocupacion,
  //       regimenSalud: createUserDto.regimenSalud,
  //       eps: createUserDto.eps,
  //       grupoSanquineo: createUserDto.grupoSanquineo,
  //       contactoEmergencia: createUserDto.contactoEmergencia,
  //       telefonoContacto: createUserDto.telefonoContacto,
  //     });

  //     await this.datosGeneraleRepository.save(datosGenerale);

  //     return {
  //       ...user,
  //       token: this.getJwtToken({ 
  //         // email: user.email,
  //         id: user.id, 
  //       }),
  //       password: undefined,
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }

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
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({ 
        where: { email },
        select: ['email', 'password', 'id'],
       });

       if (!user){
          throw new UnauthorizedException('Invalid imail');
       }

        const isPasswordValid = await bcrypt.compareSync(password, user.password);

        if (!isPasswordValid){
          throw new UnauthorizedException('Invalid password');
        }

        return {
          ...user,
          token: this.getJwtToken({ 
            // email: user.email,
            id: user.id,
          }),
          password: undefined,
        }

    } catch (error) {

      return error;
      
    }
  }

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
