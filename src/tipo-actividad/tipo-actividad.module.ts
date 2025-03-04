import { Module } from '@nestjs/common';
import { TipoActividadService } from './tipo-actividad.service';
import { TipoActividadController } from './tipo-actividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoActividad } from './entities/tipo-actividad.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TipoActividadController],
  providers: [TipoActividadService],
  imports: [ConfigModule,TypeOrmModule.forFeature([TipoActividad]),
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
export class TipoActividadModule {}
