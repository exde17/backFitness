import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtStrategy } from './strategies/jwt.strategy';
import { DatosGenerale } from '../datos-generales/entities/datos-generale.entity';
import { Parq } from 'src/parq/entities/parq.entity';
import { Caracterizacion } from 'src/caracterizacion/entities/caracterizacion.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, jwtStrategy],
  imports: 
  [
    ConfigModule,  
    TypeOrmModule.forFeature([User,DatosGenerale, Parq, Caracterizacion]), 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log(configService.get('JWT_SECRET'));
        return{
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
        }
        
      },
    }),

],
  exports: [TypeOrmModule, jwtStrategy, PassportModule, JwtModule],
})
export class UserModule {}
