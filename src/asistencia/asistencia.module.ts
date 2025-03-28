import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Asistencia } from './entities/asistencia.entity';

@Module({
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Asistencia]),
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
