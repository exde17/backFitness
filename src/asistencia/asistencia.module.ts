import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Asistencia } from './entities/asistencia.entity';
import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { Parque } from 'src/parque/entities/parque.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Asistencia, DatosGenerale, Actividade, Parque, User]),
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
})
export class AsistenciaModule {}
